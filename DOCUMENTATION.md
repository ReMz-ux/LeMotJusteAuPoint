# Documentation Technique — Le Mot Juste Au Point

> Site vitrine professionnel pour Helena Rigaud, correctrice freelance certifiée  
> Stack : HTML5 · CSS3 · JavaScript Vanilla · Clerk · Firebase Firestore

---

## Sommaire

1. [Présentation du projet](#1-présentation-du-projet)
2. [Architecture générale](#2-architecture-générale)
3. [Stack technique et justifications](#3-stack-technique-et-justifications)
4. [Structure des fichiers](#4-structure-des-fichiers)
5. [Design System](#5-design-system)
6. [Typographie](#6-typographie)
7. [Navigation — Menu Burger Accessible](#7-navigation--menu-burger-accessible)
8. [Authentification — Clerk JS v5](#8-authentification--clerk-js-v5)
9. [Base de données — Firebase Firestore](#9-base-de-données--firebase-firestore)
10. [Système d'avis clients](#10-système-davis-clients)
11. [Formulaire de contact](#11-formulaire-de-contact)
12. [Pages légales et conformité RGPD](#12-pages-légales-et-conformité-rgpd)
13. [SEO On-page](#13-seo-on-page)
14. [Sécurité](#14-sécurité)
15. [Accessibilité (WCAG)](#15-accessibilité-wcag)
16. [Performance](#16-performance)
17. [Iconographie](#17-iconographie)
18. [Déploiement et roadmap](#18-déploiement-et-roadmap)

---

## 1. Présentation du projet

**Le Mot Juste Au Point** est un site vitrine commandé par **Helena Rigaud**, correctrice professionnelle indépendante certifiée Voltaire et Le Robert. L'objectif du site est triple :

- **Présenter les services** proposés (relecture, correction, alpha,bêta-lecture) avec leurs descriptions détaillées ;
- **Asseoir la crédibilité** de la prestataire via une page de certifications et de diplômes ;
- **Générer des contacts commerciaux** qualifiés grâce à un formulaire de devis et un système d'avis clients authentifiés.

La cible éditoriale s'articule autour de trois profils : les **auteurs en auto-édition**, les **étudiants** (thèses, mémoires), et les **entreprises & médias** (communication web, rapports).

---

## 2. Architecture générale

Le projet adopte une architecture **MPA (Multi-Page Application) statique**. Ce choix délibéré répond à plusieurs contraintes propres à ce contexte :

| Contrainte | Solution retenue | Justification |
|---|---|---|
| Pas de serveur back-end dédié | HTML statique | Hébergement minimal, coût nul ou quasi-nul |
| Référencement naturel (SEO) | Pages séparées par thème | Chaque URL cible un ensemble de mots-clés distinct |
| Maintenabilité | Pas de framework JS | Aucune dépendance à mettre à jour, zéro build |
| Temps de chargement | Pas de JS de rendu côté client | Le contenu est immédiatement présent dans le DOM |

L'architecture MPA est préférable à une SPA (Single-Page Application de type React/Vue) pour un site vitrine dont le contenu est essentiellement statique : elle élimine le surcoût du JavaScript de rendu, simplifie le référencement et réduit la dette technique sur le long terme.

---

## 3. Stack technique et justifications

### HTML5 / CSS3 / JavaScript Vanilla

Le choix du **Vanilla JavaScript** (sans framework) est justifié par la nature du projet : les interactions côté client se limitent à l'ouverture/fermeture du menu, à la gestion des étoiles interactives et à l'orchestration de deux API tierces. Introduire React, Vue ou Angular aurait représenté une complexité disproportionnée, un bundle de plusieurs centaines de Ko et une dette de montée de version.

### Clerk JS v5

**Clerk** est une solution d'authentification "as-a-service" (Authentication-as-a-Service). Elle a été choisie pour les raisons suivantes :

- **Déploiement immédiat** : intégration via une seule balise `<script>` sans serveur, sans base de données utilisateurs à gérer ;
- **Sécurité éprouvée** : gestion des tokens JWT, protection CSRF, sessions sécurisées entièrement déléguées à Clerk ;
- **UX soignée** : modales de connexion/inscription natives, gestion du profil utilisateur intégrée ;
- **Localisation française** : l'interface est traduite en français via le module `@clerk/localizations` chargé dynamiquement depuis `esm.sh`, évitant tout bundler ;
- **Gratuit** jusqu'à 10 000 MAU (Monthly Active Users), parfaitement adapté à l'échelle d'un site vitrine freelance.

### Firebase Firestore

**Cloud Firestore** (Firebase v10) a été retenu comme base de données pour le stockage des avis clients :

- **Base NoSQL temps réel** : flexibilité du schéma (chaque avis est un document JSON), idéale pour des données non relationnelles et peu structurées ;
- **SDK CDN** : chargé directement depuis `gstatic.com` via `import` ES Module — aucun bundler nécessaire ;
- **Gratuit** sur le plan Spark jusqu'à 50 000 lectures et 20 000 écritures par jour, largement suffisant pour ce volume ;
- **Lecture publique, écriture authentifiée** : les règles de sécurité Firestore peuvent être configurées pour permettre à tout visiteur de lire les avis, mais restreindre l'écriture aux utilisateurs Clerk connectés.

---

## 4. Structure des fichiers

```
Le mot juste au point project/
│
├── index.html              # Page d'accueil (hero, ciblage client, formulaire de contact)
├── services-tarifs.html    # Présentation des 3 services (relecture, correction, bêta-lecture)
├── a-propos.html           # Certifications & diplômes (Voltaire, Robert)
├── avis.html               # Avis clients — lecture publique + dépôt authentifié
├── mentions-legales.html   # Page légale obligatoire (Loi pour la Confiance numérique 2004)
├── politique-de-conf.html  # Politique de confidentialité conforme RGPD
├── cgu.html                # Conditions Générales d'Utilisation
├── cgv.html                # Conditions Générales de Vente
│
└── assets/
    ├── css/
    │   ├── style.css       # Reset, variables globales, typographie de base
    │   ├── menu.css        # Header fixe, bouton burger, menu latéral, overlay
    │   └── pages.css       # Styles spécifiques à chaque page (contact, services, avis, légal)
    │
    ├── js/
    │   ├── main.js         # Menu burger + logique d'authentification pour la page avis
    │   ├── clerk api.js    # Initialisation Clerk, localisation FR, gestion du header de compte
    │   ├── firebase-api.js # Initialisation Firebase + exposition globale des fonctions Firestore
    │   ├── avis.js         # Chargement des avis, construction des cartes, soumission du formulaire
    │   └── forms.js        # (En préparation — logique du formulaire de contact)
    │
    ├── fonts/
    │   ├── Great_Vibes/    # Police calligraphique (auto-hébergée)
    │   └── Open_Sans/      # Police sans-serif principale (auto-hébergée, variable + statique)
    │
    └── img/
        ├── icons/          # Icônes illustratives PNG (Flaticon)
        └── logos/          # Logo du site
```

### Séparation des CSS en 3 fichiers

Le CSS est volontairement découpé en trois couches de responsabilité :

| Fichier | Rôle |
|---|---|
| `style.css` | Couche de base : reset universel (`box-sizing`, `margin`, `padding`), définition des `@font-face`, couleur de fond du `body`, `padding-top` global pour compenser le header fixe |
| `menu.css` | Couche de layout persistant : header fixe (`position: fixed`), bouton burger animé, overlay semi-transparent, panneau de navigation latéral avec transition CSS |
| `pages.css` | Couche de contenu : tous les styles propres aux sections de contenu (héros, ciblage client, formulaire de contact, services, avis, certifications, pages légales, footer) |

Cette séparation permet de charger le fichier de menu en cache commun à toutes les pages sans polluer l'espace de noms CSS du contenu, et facilite la maintenance en localisant les styles par domaine fonctionnel.

---

## 5. Design System

### Palette de couleurs

| Variable | Valeur | Usage |
|---|---|---|
| Rose principal | `#d4789a` | Liens, titres, accents, bordures, dégradé du CTA |
| Marine profond | `#29274C` | Corps de texte, titres secondaires |
| Blanc rosé | `#fdf6f6` | Fond général, fond du header/menu |
| Blanc pur | `#ffffff` | Fond des cartes (contact, certifications, légal, avis) |
| Rose pâle | `#f0e0e6` | Bordures légères, séparateurs |
| Gris doux | `#a0a0b0` | Textes secondaires, sous-titres |

Cette palette bichrome rose/marine crée une identité visuelle à la fois **professionnelle** et **douce**, cohérente avec le positionnement d'une correctrice qui allie rigueur et bienveillance (slogan du site : *"L'art de sublimer vos écrits avec rigueur et bienveillance."*).

### Composant CTA — Bouton Principal

Le bouton d'appel à l'action repose sur :
- **Dégradé linéaire** `135deg` du rose principal vers un rose plus clair (`#e8a0bb`) ;
- **Border-radius 50px** pour un aspect pill/capsule, plus moderne et doux ;
- **Box-shadow colorée** (`rgba(212, 120, 154, 0.35)`) qui renforce la perception de profondeur sans être agressif ;
- **Micro-interaction au survol** : `translateY(-3px)` et intensification du shadow, donnant une sensation de "soulèvement" du bouton.

### Cartes (Cards)

Toutes les cartes du site (certifications, avis, pages légales, formulaire de contact) partagent le même langage visuel :
- `background: #ffffff` sur fond `#fdf6f6` pour créer une élévation perçue ;
- `border-radius: 20px` à `24px` (rayon élevé, style "neumorphic doux") ;
- `box-shadow: 0 8px 40px rgba(212, 120, 154, 0.12)` — ombre portée teintée de la couleur primaire pour une cohérence chromatique.

---

## 6. Typographie

Deux polices auto-hébergées constituent le système typographique :

### Great Vibes (Calligraphique)

- **Usage** : logo en header, tous les titres `h1`, `h2` de sections, titres des cartes, bouton CTA (via `.contact-title`, `.ciblage-titre`, `.certification-item h2`, etc.) ;
- **Origine** : Google Fonts, téléchargée et servie localement via `@font-face` ;
- **Justification** : Great Vibes est une police script élégante qui incarne le soin apporté aux textes, en accord avec le métier de correctrice. Elle apporte une chaleur artisanale qui différencie le site des templates génériques.

### Open Sans (Sans-serif)

- **Usage** : tous les corps de texte, labels, paragraphes, navigation ;
- **Origine** : Google Fonts, auto-hébergée avec la famille complète (Regular, Medium, SemiBold, Bold, Italic, versions Condensed et SemiCondensed) ;
- **Justification** : Open Sans est conçue pour une lisibilité maximale à l'écran, sur tous les supports. Sa neutralité contraste avec la cursivité de Great Vibes et assure une hiérarchie typographique claire.

### font-display: swap

Les deux `@font-face` utilisent `font-display: swap`. Cette directive d'optimisation de performance indique au navigateur d'afficher d'abord le texte avec la police système de secours, puis de permuter vers la police web une fois chargée — évitant ainsi le **FOIT** (Flash Of Invisible Text) qui dégrade l'expérience utilisateur et les métriques Core Web Vitals (LCP).

### Chargement depuis Google Fonts (Playball)

Un `<link>` vers Google Fonts est conservé pour la police Playball (déclarée dans le `<head>` mais non encore activée dans les styles). Les directives `preconnect` vers `fonts.googleapis.com` et `fonts.gstatic.com` sont présentes pour réduire la latence de connexion initiale.

---

## 7. Navigation — Menu Burger Accessible

### Architecture HTML

Le système de navigation repose sur trois éléments HTML distincts ayant chacun un rôle précis :

```
.burger-btn      → Bouton déclencheur (toujours visible)
.nav-overlay     → Fond semi-transparent (ferme le menu au clic)
.side-nav        → Panneau latéral glissant (280px de large)
```

### Comportement CSS

La navigation utilise exclusivement des **transitions CSS** pour les animations, sans librairie :

- **Menu fermé** : `transform: translateX(-100%)` — le panneau est hors du viewport, à gauche ;
- **Menu ouvert** : `transform: translateX(0)` — le panneau glisse dans le viewport via `transition: transform 0.35s ease` ;
- **Overlay** : initialement `display: none` (soustrait du flux), passe en `display: block; opacity: 1` via la classe `.is-visible` grâce à une transition d'opacité en `0.3s` ;
- **Animation burger → croix** : les 3 lignes (`<span class="burger-line">`) se transforment en `×` via des rotations CSS : `translateY(8px) rotate(45deg)` (ligne 1), `opacity: 0` (ligne 2), `translateY(-8px) rotate(-45deg)` (ligne 3).

### Gestion JavaScript (main.js)

```javascript
// Blocage du scroll au fond (anti-défilement de page derrière le menu)
document.body.style.overflow = 'hidden'; // à l'ouverture
document.body.style.overflow = '';       // à la fermeture
```

La fermeture est déclenchée par **trois vecteurs** :
1. Clic sur le bouton `×` (`.close-btn`) ;
2. Clic sur l'overlay (`.nav-overlay`) ;
3. Touche **Échap** (`keydown` → `e.key === 'Escape'`).

### Accessibilité ARIA

Le menu respecte les patterns ARIA recommandés par la spécification WAI-ARIA :

| Attribut | Valeur initiale | Valeur lors de l'ouverture |
|---|---|---|
| `aria-expanded` (burger) | `"false"` | `"true"` |
| `aria-hidden` (side-nav) | `"true"` | `"false"` |
| `aria-label` (burger) | `"Ouvrir le menu"` | — |
| `aria-label` (close) | `"Fermer le menu"` | — |

Ces attributs permettent aux lecteurs d'écran (NVDA, JAWS, VoiceOver) d'annoncer correctement l'état du menu et d'offrir une navigation équivalente aux utilisateurs non-voyants.

---

## 8. Authentification — Clerk JS v5

### Intégration No-Build

Clerk est intégré sans bundler via sa balise `<script>` CDN placée dans `<head>` avec l'attribut `defer` :

```html
<script defer crossorigin="anonymous"
    data-clerk-publishable-key="pk_test_..."
    src="https://select-dinosaur-39.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js"
    type="text/javascript">
</script>
```

La clé publiable (`data-clerk-publishable-key`) est une clé **publique** : sa présence dans le code source HTML est normale et sécurisée par design — elle identifie l'application Clerk mais ne donne accès à aucune donnée privée.

### Localisation en français

```javascript
const { frFR } = await import('https://esm.sh/@clerk/localizations@2');
await window.Clerk.load({ localization: frFR });
```

Le module de localisation est importé dynamiquement via `esm.sh`, une CDN qui expose les packages npm comme modules ES. Cette approche évite un bundler tout en bénéficiant du bon module npm officiel de Clerk.

### Gestion du header de compte (clerk api.js)

Le script `clerk api.js` orchestre l'affichage dans le header en fonction de l'état de session :

- **Non connecté** : le clic sur l'icône utilisateur ouvre la **modale de connexion** Clerk (`Clerk.openSignIn()`) ;
- **Connecté** : l'icône est remplacée par un message de bienvenue personnalisé (`"Bonjour, [prénom]"`), un bouton de déconnexion est injecté dynamiquement, et le clic sur le nom ouvre la **modale de profil** Clerk (`Clerk.openUserProfile()`).

### Protection de la page Avis

La vérification d'authentification sur la page avis est gérée dans `main.js` via une IIFE (Immediately Invoked Function Expression) :

```javascript
(function () {
    // Guard : on n'est pas sur la page avis → sortie anticipée
    const avisForm = document.getElementById('avis-form');
    if (!avisForm) return;

    async function initAvisAuth() {
        await window.Clerk.load();
        if (window.Clerk.user) {
            // Affiche le formulaire
        } else {
            // Affiche le message d'invitation à se connecter
        }
    }
    window.addEventListener('load', initAvisAuth);
})();
```

L'encapsulation en IIFE garantit qu'aucune variable n'est exposée dans la portée globale, évitant les conflits entre scripts.

---

## 9. Base de données — Firebase Firestore

### Initialisation via ES Module

Firebase v10 est chargé via son SDK CDN en utilisant la syntaxe d'import ES Module native :

```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
```

La balise `<script type="module">` est donc nécessaire pour le fichier `firebase-api.js`, ce qui explique son chargement avec `<script type="module" src="assets/js/firebase-api.js">`.

### Exposition globale des fonctions

Comme les modules ES sont scoped (isolés), les fonctions Firebase ne seraient pas accessibles aux autres scripts (`avis.js`) sans une exposition explicite via `window` :

```javascript
window.db = db;
window.collection = collection;
window.addDoc = addDoc;
window.getDocs = getDocs;
```

C'est un pattern de **pont entre modules** (`window` comme bus de communication entre scripts non-modulaires et modules ES), justifié par l'absence de bundler (Webpack/Vite) qui gérerait normalement les dépendances inter-fichiers.

### Schéma de la collection `avis_clients`

Chaque document Firestore stocké dans la collection `avis_clients` possède la structure suivante :

```json
{
  "nom": "Prénom de l'utilisateur (depuis Clerk)",
  "texte": "Contenu de l'avis (500 caractères max.)",
  "date": "DD/MM/YYYY (toLocaleDateString fr-FR)",
  "note": 4,
  "etoiles": "⭐⭐⭐⭐"
}
```

---

## 10. Système d'avis clients

C'est la fonctionnalité la plus complexe du projet, orchestrant trois technologies : Clerk (auth), Firebase (persistance) et JavaScript DOM (rendu dynamique).

### Lecture publique des avis (avis.js)

La fonction `chargerAvis()` récupère l'ensemble des documents de la collection et les rend dans le DOM :

```javascript
async function chargerAvis() {
    const snapshot = await window.getDocs(window.collection(window.db, "avis_clients"));
    snapshot.forEach(doc => {
        reviewsList.appendChild(creerCarteAvis(doc.data()));
    });
}
```

La lecture est **publique** (visible sans connexion), ce qui est essentiel pour la preuve sociale : un visiteur non connecté doit pouvoir consulter les témoignages.

### Génération dynamique des cartes

La fonction `creerCarteAvis(data, isNew)` construit entièrement chaque carte en JavaScript pur (`createElement`, `appendChild`), sans template HTML statique. Ce choix permet d'alimenter la liste aussi bien depuis Firebase que depuis une soumission en temps réel, en réutilisant la même fonction.

L'argument `isNew` déclenche l'ajout de la classe CSS `avis-card--new` qui permet d'animer l'apparition d'un nouvel avis après soumission, offrant un **feedback visuel immédiat**.

### Sélecteur d'étoiles interactif (main.js)

Le composant d'évaluation par étoiles est implémenté en HTML/CSS/JS pur :

- Les étoiles sont des `<span>` avec `role="radio"` et `aria-label="N étoile(s)"` pour l'accessibilité ;
- La valeur est stockée dans un `<input type="hidden" id="avis-note">` qui est transmis à Firebase lors de la soumission ;
- La fonction `highlightStars(value)` colore toutes les étoiles dont le `data-value` est inférieur ou égal à la valeur choisie, via la classe CSS `.active` ;
- Trois événements sont gérés : `mouseenter` (survol), `mouseleave` (retour à la valeur sélectionnée), `click` (sélection), et `keydown` (Enter/Espace pour l'accessibilité clavier).

### Soumission et validation (avis.js)

Avant l'envoi à Firestore, plusieurs validations côté client sont effectuées :
1. Vérification que l'utilisateur Clerk est bien connecté ;
2. Vérification que le champ texte est non vide (après `trim()`) ;
3. Vérification que la note est comprise entre 1 et 5.

En cas de succès, la carte est ajoutée en **tête de liste** (`reviewsList.prepend()`) sans rechargement de page, offrant un retour instantané.

---

## 11. Formulaire de contact

### Labels flottants (Floating Labels)

Le formulaire de contact sur la page d'accueil utilise le pattern **floating label** — une technique CSS moderne qui remplace les placeholders statiques par des labels animés :

```css
/* Label flottant quand focus ou rempli */
.form-group input:focus ~ label,
.form-group input:not(:placeholder-shown) ~ label {
    top: -8px;
    font-size: 0.75rem;
    color: #d4789a;
}
```

Le sélecteur `:not(:placeholder-shown)` (combiné à `placeholder=" "` dans le HTML) détecte que le champ contient du texte, déclenchant l'animation du label même sans focus. Cette approche est purement CSS, sans JavaScript.

**Avantages UX** : l'utilisateur voit toujours quel champ il remplit, même après avoir cliqué ailleurs — contrairement à un placeholder qui disparaît dès la saisie.

### Barre de focus animée

Un `<span class="form-focus-bar">` positionné en `absolute` en bas de chaque champ simule une ligne d'accentuation qui s'étend de `width: 0` à `width: 100%` lors du focus, via `transition: width 0.35s ease`. C'est un pattern Material Design adapté.

### Structure en grille

La rangée nom/email utilise `display: flex; gap: 24px` pour placer les deux champs côte à côte, s'adaptant nativement sur desktop. Un `flex: 1` sur chaque `.form-group` assure une distribution équitable de l'espace.

---

## 12. Pages légales et conformité RGPD

Le site intègre les **quatre documents légaux obligatoires** pour un site commercial français :

| Page | Base légale | Contenu couvert |
|---|---|---|
| `mentions-legales.html` | Art. 6 de la loi n° 2004-575 du 21 juin 2004 (LCEN) | Éditeur, hébergeur, propriété intellectuelle |
| `politique-de-conf.html` | RGPD (UE) 2016/679 | Données collectées, base légale, durée de conservation, droits des personnes |
| `cgu.html` | Recommandation CNIL | Conditions d'accès et d'utilisation du site |
| `cgv.html` | Art. L. 441-6 du Code de commerce | Conditions commerciales de vente des prestations |

### Mise en page des pages légales

Les pages légales utilisent une grille CSS à deux colonnes (`grid-template-columns: repeat(2, 1fr)`) pour structurer les articles dans des cartes visuelles. Le composant `legal-card--full` utilise `grid-column: 1 / -1` pour faire s'étirer un bloc sur toute la largeur — typiquement pour le bloc "Éditeur" ou "Responsable du traitement".

La liste `<dl>/<dt>/<dd>` est préférée aux tableaux pour les données structurées clé/valeur, conformément aux recommandations HTML5 sémantique.

---

## 13. SEO On-page

Chaque page du site implémente les bonnes pratiques SEO fondamentales :

### Meta tags

```html
<html lang="fr">                              <!-- Langue déclarée pour les moteurs -->
<meta charset="UTF-8">                        <!-- Encodage universel -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">  <!-- Responsive -->
<meta name="description" content="...">      <!-- Extrait dans les SERPs (160 car. max) -->
<meta name="referrer" content="strict-origin-when-cross-origin">  <!-- Contrôle Referer -->
```

Chaque page possède une `<meta name="description">` unique et ciblée sur les mots-clés de la page, essentielle pour le taux de clic (CTR) dans les résultats de recherche.

### Titres `<title>` uniques

Chaque page a un `<title>` distinct et descriptif, suivant le pattern `[Page] — Le Mot Juste Au Point`, qui apparaîtra dans l'onglet du navigateur et dans les SERPs.

### Hiérarchie des titres

Un seul `<h1>` par page, directement lié au thème principal de la page. Les `<h2>` structurent les sous-sections. Cette hiérarchie est fondamentale pour l'indexation sémantique des moteurs de recherche.

### Balises sémantiques HTML5

Le code utilise systématiquement les éléments sémantiques : `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<dl>`, offrant aux moteurs de recherche et aux lecteurs d'écran une structure de document claire et interprétable.

---

## 14. Sécurité

### Content Security Policy (CSP)

Les pages dynamiques (Clerk, Firebase) intègrent une en-tête CSP via `<meta http-equiv>` qui contrôle précisément les origines autorisées pour chaque type de ressource :

```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' https://select-dinosaur-39.clerk.accounts.dev 'unsafe-inline';
    style-src 'self' https://fonts.googleapis.com 'unsafe-inline';
    font-src 'self' https://fonts.gstatic.com data:;
    img-src 'self' data: https:;
    connect-src 'self' https://*.clerk.accounts.dev;
    frame-src 'self' https://*.clerk.accounts.dev;
    worker-src 'self' blob:;
">
```

La CSP est la principale défense contre les attaques **XSS (Cross-Site Scripting)**, une des vulnérabilités les plus répandues (OWASP Top 10 — A03:2021). Elle liste en liste blanche les domaines autorisés à exécuter du code, charger des styles, ou établir des connexions réseau.

**Note** : la directive `'unsafe-inline'` est présente pour les styles inline générés par Clerk et Firebase. Dans un environnement de production durci, des **nonces** CSP seraient préférables.

### Politique Referrer

```html
<meta name="referrer" content="strict-origin-when-cross-origin">
```

Cette directive contrôle la quantité d'informations envoyées dans l'en-tête `Referer` lors des navigations sortantes : seule l'origine (schéma + domaine + port) est transmise pour les requêtes cross-origin, sans le chemin complet — protégeant ainsi les données potentiellement sensibles dans les URLs.

### Gestion de l'authentification

La sécurité de l'authentification est entièrement déléguée à Clerk, qui implémente nativement :
- Protection CSRF ;
- Tokens JWT signés et à durée de vie limitée ;
- Stockage sécurisé des sessions ;
- Rate limiting sur les tentatives de connexion.

### Clés Firebase

Les clés Firebase présentes dans `firebase-api.js` sont des clés **côté client** (client-side API keys). Leur présence dans le code source est normale et documentée par Google. La protection des données repose sur les **règles de sécurité Firestore** configurées dans la console Firebase, et non sur la confidentialité des clés.

---

## 15. Accessibilité (WCAG)

Le projet intègre les pratiques d'accessibilité suivantes, conformément aux directives WCAG 2.1 (niveau AA) :

| Fonctionnalité | Implémentation |
|---|---|
| Menu burger | `aria-expanded`, `aria-hidden`, `aria-label` sur les boutons |
| Icône compte | `aria-label="Mon compte"` sur le lien sans texte visible |
| Étoiles interactives | `role="radio"`, `aria-label="N étoile(s)"`, `tabindex="0"`, support `Enter`/`Espace` |
| Icônes réseaux sociaux | `aria-label="Instagram"` / `"Facebook"` / `"LinkedIn"` sur les liens SVG |
| Images illustratives | Attribut `alt` descriptif sur toutes les `<img>` |
| Formulaires | Labels associés aux inputs via `for`/`id`, `novalidate` + validation JS |
| Navigation | `<nav>` avec `aria-label` distincts ("Liens légaux", "Navigation") |
| Langue | `lang="fr"` sur `<html>` pour la synthèse vocale |

---

## 16. Performance

### Chargement des scripts avec `defer`

Tous les scripts `<script>` portent l'attribut `defer`, ce qui signifie qu'ils sont **téléchargés en parallèle** du parsing HTML mais **exécutés après la construction complète du DOM**. Cela évite le blocage du rendu ("render-blocking") qui dégrade les métriques **FCP (First Contentful Paint)** et **LCP (Largest Contentful Paint)**.

### Préconnexion aux domaines tiers

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

Ces directives établissent les connexions DNS + TCP + TLS vers les serveurs Google Fonts en avance de phase, réduisant la latence des requêtes de polices.

### Polices auto-hébergées

Les polices Open Sans et Great Vibes sont servies localement (auto-hébergées) plutôt que depuis Google Fonts, éliminant une dépendance réseau pour les ressources les plus critiques (les polices bloquent le rendu si `font-display: block` est utilisé).

### `font-display: swap`

Prévient le FOIT et améliore le **CLS (Cumulative Layout Shift)**, une métrique Core Web Vitals affectant le classement Google.

### CSS modulaire

Le découpage en 3 fichiers CSS distincts permet au navigateur de les mettre en cache indépendamment. Si `menu.css` ne change jamais, il reste en cache même lors d'une mise à jour de `pages.css`.

---

## 17. Iconographie

### Icônes SVG inline (réseaux sociaux)

Les icônes des réseaux sociaux (Instagram, Facebook, LinkedIn) dans le footer sont des **SVG inline** : le code vectoriel est directement intégré dans le HTML. Avantages :
- Aucune requête HTTP supplémentaire ;
- Colorisation dynamique via `stroke: currentColor` (hérite de la couleur CSS du parent) ;
- Dimensionnement parfait à n'importe quelle résolution ;
- Accessible via `aria-label` sur le lien parent.

### Icônes illustratives PNG (Flaticon)

Les icônes de contenu (livre, plume, loupe, diplôme, étoile client...) sont des fichiers PNG issus de Flaticon. Ils apportent une cohérence visuelle flat design dans les sections de présentation, sans alourdir le code HTML.

---

## 18. Déploiement et roadmap

### État actuel

Le projet est en phase de **développement actif**. Les fonctionnalités suivantes sont pleinement opérationnelles :
- Navigation complète multi-pages ;
- Système d'authentification Clerk ;
- Système d'avis clients (lecture + soumission authentifiée) ;
- Pages de présentation (accueil, services, à propos) ;
- Ensemble des pages légales.

### En attente / À venir

| Fonctionnalité | Statut |
|---|---|
| Formulaire de contact (`forms.js`) | En préparation |
| Tarifs des services | En attente des informations client |
| Logo définitif | Dossier `logos/` vide — en cours |
| Photos | Dossier `photos/` vide — en cours |
| Réseaux sociaux | Liens `#` — URLs à renseigner |
| Informations légales (SIRET, adresse...) | Placeholders à compléter |
| Déploiement en production | À planifier (Netlify, Vercel ou hébergement mutualisé) |

### Environnement de déploiement recommandé

Le site étant 100% statique (aucun serveur back-end), il est compatible avec tout hébergement de fichiers statiques : **Netlify**, **Vercel**, **GitHub Pages**, ou un hébergement mutualisé classique (OVH, Ionos). Avant la mise en production, le passage des clés Clerk de `pk_test_` (mode test) à `pk_live_` (mode production) sera nécessaire.

---

*Documentation rédigée le 10 juin 2026 — Projet Le Mot Juste Au Point*
