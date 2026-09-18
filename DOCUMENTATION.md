# Documentation Technique — Le Mot Juste Au Point

> Site vitrine professionnel pour Helena Rigaud, correctrice freelance certifiée  
> Stack : HTML5 · CSS3 · JavaScript Vanilla · Clerk JS v5 · Firebase Firestore v10 · Netlify Forms · AOS Library

---

## Sommaire

1. [Présentation du projet](#1-présentation-du-projet)
2. [Architecture générale](#2-architecture-générale)
3. [Stack technique et justifications](#3-stack-technique-et-justifications)
4. [Structure des fichiers](#4-structure-des-fichiers)
5. [Design System](#5-design-system)
6. [Bandeau Promotionnel Défilant](#6-bandeau-promotionnel-défilant)
7. [Animations au défilement (AOS)](#7-animations-au-défilement-aos)
8. [Typographie](#8-typographie)
9. [Navigation — Menu Burger Accessible](#9-navigation--menu-burger-accessible)
10. [Authentification — Clerk JS v5](#10-authentification--clerk-js-v5)
11. [Base de données — Firebase Firestore](#11-base-de-données--firebase-firestore)
12. [Système d'avis clients](#12-système-davis-clients)
13. [Formulaire de contact & Netlify Forms](#13-formulaire-de-contact--netlify-forms)
14. [Offre de Services & Grille Tarifaire](#14-offre-de-services--grille-tarifaire)
15. [Pages légales et conformité RGPD](#15-pages-légales-et-conformité-rgpd)
16. [SEO On-page & Métadonnées](#16-seo-on-page--métadonnées)
17. [Sécurité & En-têtes HTTP (`_headers`)](#17-sécurité--en-têtes-http-_headers)
18. [Accessibilité (WCAG)](#18-accessibilité-wcag)
19. [Performance & Stratégie de Cache](#19-performance--stratégie-de-cache)
20. [Iconographie](#20-iconographie)
21. [Déploiement et roadmap de mise en ligne](#21-déploiement-et-roadmap-de-mise-en-ligne)

---

## 1. Présentation du projet

**Le Mot Juste Au Point** est un site vitrine conçu et développé pour **Helena Rigaud**, correctrice professionnelle indépendante certifiée par l'**EFLC** (École Française des Lecteurs et Correcteurs) et préparant le Certificat Voltaire. L'objectif du site est quadruple :

- **Présenter l'offre de services** (relecture d'épreuves, correction standard/approfondie, bêta-lecture narrative) avec leurs descriptions complètes et leur méthode d'intervention en suivi des modifications (Word / Google Docs) ;
- **Afficher une grille tarifaire claire et transparente** basée sur le nombre de Signes Espaces Comprises (SEC) ;
- **Asseoir la crédibilité professionnelle** via la mise en avant des certifications officielles et d'une philosophie axée sur la bienveillance et la valorisation du style de l'auteur ;
- **Générer des conversions commerciales** grâce à un formulaire de devis interactif connecté à Netlify Forms et à un système d'avis clients authentifiés par Clerk et stockés sur Firebase Firestore.

La cible éditoriale s'articule autour de trois profils : les **auteurs en auto-édition**, les **étudiants** (thèses, mémoires universitaires), et les **entreprises & médias** (communication web, rapports institutionnels).

---

## 2. Architecture générale

Le projet adopte une architecture **MPA (Multi-Page Application) statique**, optimisée pour le déploiement sur la plateforme **Netlify**. Ce choix délibéré répond à plusieurs contraintes clés :

| Contrainte | Solution retenue | Justification |
|---|---|---|
| Zéro serveur back-end dédié | HTML statique + Services tiers (Serverless) | Coût d'hébergement nul, robustesse maximale, surface d'attaque réduite |
| Référencement naturel (SEO) | Pages HTML autonomes par thématique | Chaque URL possède ses propres balises Open Graph, meta descriptions et mots-clés |
| Maintenabilité | Vanilla JavaScript (No-Build) | Aucune étape de compilation (Webpack/Vite), aucune dette de dépendances lourdes |
| Performance de chargement | DOM immédiatement servi par le CDN | First Contentful Paint quasi-instantané, fluidité maximale sur mobile |

---

## 3. Stack technique et justifications

### HTML5 / CSS3 / JavaScript Vanilla

Le choix du **Vanilla JavaScript** (ES6+) garantit une exécution ultra-rapide et un contrôle total du cycle de vie du DOM :
- Interactions légères (menu latéral, sélecteur d'étoiles, synchronisation des modales) ;
- Absence de bundler grâce à l'utilisation native des modules ES (`import ... from "..."`) et des imports dynamiques.

### Clerk JS v5 (Authentification as-a-Service)

**Clerk** assure la gestion complète de l'authentification des utilisateurs :
- **Intégration CDN** : script universel chargé avec `defer` dans `<head>` ;
- **Localisation française native** : traduction dynamique via `@clerk/localizations` chargé à la volée depuis `esm.sh` ;
- **Sécurité gérée** : tokens JWT, sessions sécurisées, protection CSRF, modales de connexion/inscription (`openSignIn`) et de gestion du profil (`openUserProfile`) prêtes à l'emploi.

### Firebase Firestore v10 (Base de données NoSQL temps réel)

**Cloud Firestore** (Firebase SDK v10) gère la persistance des avis clients :
- **SDK CDN ES Module** : import direct depuis `gstatic.com` sans gestion de build ;
- **Lecture publique / Écriture contrôlée** : consultation libre des avis par tous les visiteurs pour la preuve sociale, soumission conditionnée à la connexion active d'un utilisateur Clerk.

### Netlify Forms & Header Management

- **Gestion des formulaires sans back-end** : traitement natif des soumissions de devis via l'attribut `data-netlify="true"` et traitement asynchrone (AJAX) dans `forms.js` ;
- **Fichier `_headers`** : politique de sécurité stricte (CSP différenciée, HSTS, X-Frame-Options, Cache-Control long terme).

### AOS (Animate On Scroll v2.3.4)

- **Micro-animations d'apparition** au défilement (`fade-up`, `zoom-in`, `fade-right`, etc.) configurées pour s'exécuter une seule fois (`once: true`) avec un décalage harmonieux (`offset: 60`).

---

## 4. Structure des fichiers

```
Le mot juste au point project/
│
├── _headers                # Configuration Netlify (HSTS, CSP par page, règles de cache)
├── index.html              # Page d'accueil (bannière promo, biographie, cibles, contact Netlify)
├── services-tarifs.html    # Formules tarifaires complètes (L'Éclaireur, L'Essentiel, etc.)
├── a-propos.html           # Certifications officielles (EFLC, préparation Voltaire)
├── avis.html               # Espace avis clients (lecture publique + formulaire Firestore)
├── mentions-legales.html   # Mentions légales complètes (SIRET, micro-entreprise, LCEN 2004)
├── politique-de-conf.html  # Politique de confidentialité conforme RGPD
├── cgu.html                # Conditions Générales d'Utilisation du site
├── cgv.html                # Conditions Générales de Vente (tarifs, acompte 30%, délais)
├── README.txt              # Synthèse rapide du projet
├── DOCUMENTATION.md        # Documentation technique de référence
│
└── assets/
    ├── css/
    │   ├── style.css       # Reset CSS, déclaration @font-face, variables globales
    │   ├── menu.css        # Layout persistant : header fixe, bouton burger, volet latéral
    │   ├── pages.css       # Styles graphiques des sections (héros, cartes, contact, légal, avis)
    │   └── promo-banner.css # Banderole promotionnelle défilante infinie (CSS Keyframes)
    │
    ├── js/
    │   ├── main.js         # Menu burger, sélecteur d'étoiles interactif, initialisation AOS
    │   ├── clerk-api.js    # Init Clerk JS v5, localisation FR, gestion du header connecté
    │   ├── firebase-api.js # Init Firebase v10 + exposition globale des méthodes Firestore
    │   ├── avis.js         # Chargement, rendu dynamique et enregistrement des avis Firestore
    │   └── forms.js        # Gestionnaire de soumission AJAX pour Netlify Forms (avec fallback local)
    │
    ├── fonts/
    │   ├── Great_Vibes/    # Police calligraphique auto-hébergée (titres, accents)
    │   └── Open_Sans/      # Police sans-serif auto-hébergée (corps de texte, lisibilité)
    │
    └── img/
        ├── logo01.png      # Favicon et logo alternatif
        ├── logo02.png      # Logo principal affiché sur la page d'accueil
        ├── logo.png        # Déclinaison du logo
        ├── logo lmjap.jpg  # Visuel logo haute définition
        ├── icons/          # Icônes illustratives PNG (Flaticon)
        ├── logos/          # Répertoire réservé aux déclinaisons vectorielles
        └── photos/         # Répertoire réservé aux visuels photographiques
```

### Organisation modulaire des feuilles de style

| Fichier CSS | Rôle & Responsabilité |
|---|---|
| `style.css` | Fondations : reset universel (`box-sizing`), définition des polices `@font-face` avec `font-display: swap`, fond du `body`, compensation de base du header fixe. |
| `menu.css` | Navigation : positionnement fixe du header (`z-index: 100`), bouton burger en 3 lignes animé vers une croix, overlay semi-transparent, panneau coulissant latéral (`side-nav`). |
| `promo-banner.css` | Promotionnel : ruban supérieur fixe (`z-index: 101`), animation de défilement linéaire continu, masquage par dégradé latéral, décalage adaptatif du header via `body:has(.promo-band)`. |
| `pages.css` | Contenu & Composants : stylisation des sections de présentation, formulaires flottants, cartes de services/tarifs, grille d'avis et documents légaux. |

---

## 5. Design System

### Palette de couleurs

| Nom | Code HEX | Rôle graphique |
|---|---|---|
| **Rose principal** | `#d4789a` | Titres calligraphiques, boutons d'action, bordures actives, accents, icônes |
| **Marine profond** | `#29274C` | Corps de texte, titres secondaires, étiquettes de formulaires au repos |
| **Blanc rosé** | `#fdf6f6` | Arrière-plan global du site, fond du ruban promo et du panneau menu |
| **Blanc pur** | `#ffffff` | Arrière-plan des cartes (contact, tarifs, avis, certifications, documents légaux) |
| **Rose pâle** | `#f0e0e6` | Lignes de séparation discrètes, bordures d'inputs, badges tarifaires |
| **Gris doux** | `#a0a0b0` | Sous-titres, dates des avis, textes secondaires |

### Composant CTA — Bouton Principal

Le bouton d'action principal (`.contact-btn`) applique une identité soignée :
- Dégradé linéaire `135deg, #d4789a 0%, #e8a0bb 100%` ;
- Arrondi capsule `border-radius: 50px` ;
- Ombre colorée `box-shadow: 0 6px 24px rgba(212, 120, 154, 0.35)` ;
- Micro-interaction au survol : élévation `translateY(-3px)` et intensification de l'ombre (`0 10px 32px rgba(212, 120, 154, 0.45)`).

### Cartes (Cards) & Séparateurs

- **Cartes neumorphiques douces** : fond blanc pur `#ffffff`, coins arrondis (`20px` à `24px`), élévation par ombre douce teintée `rgba(212, 120, 154, 0.12)` ;
- **Séparateurs textuels (`.text-separator`)** : filet dégradé horizontal avec ornement central `✦` ;
- **Séparateurs de section (`.cards-separator`)** : mention calligraphique insérée au cœur de deux filets estompés.

---

## 6. Bandeau Promotionnel Défilant

Présente sur `index.html` et `services-tarifs.html`, la bande promotionnelle (`.promo-band`) affiche les offres en cours de façon dynamique et élégante.

### Caractéristiques techniques

1. **Défilement continu sans interruption** :
   - Le conteneur interne (`.promo-band__scroll`) contient deux groupes d'éléments strictement identiques (`.promo-band__group`), chacun dimensionné à `min-width: 100vw`.
   - L'animation CSS `@keyframes promoBandScroll` translate l'ensemble de `0` à `-50%` sur 45 secondes en boucle infinie (`linear infinite`). La transition d'un groupe à l'autre est parfaitement invisible.
2. **Micro-interaction UX** :
   - Au survol de la souris (`:hover`), l'animation passe en `animation-play-state: paused`, permettant à l'utilisateur de lire tranquillement une offre.
3. **Masque de fondu latéral** :
   - Utilisation de `mask-image` / `-webkit-mask-image` avec un dégradé linéaire transparent sur les 44 premiers et derniers pixels pour estomper l'entrée et la sortie des textes.
4. **Compensation automatique de la mise en page** :
   - La pseudo-classe CSS moderne `body:has(.promo-band)` ajuste automatiquement la position du header fixe (`top: 90px`) et le `padding-top` du document (`155px`), évitant tout chevauchement de contenu.

### Offres configurées

- **Offre étudiante** : `-15 %` sur tous les projets (sur justificatif, non cumulable) ;
- **Offre de lancement** : `-20 %` pour les 10 premiers clients (places limitées, non cumulable).

---

## 7. Animations au défilement (AOS)

Le site intègre la bibliothèque **AOS (Animate On Scroll v2.3.4)** pour dynamiser l'expérience utilisateur sans impacter les performances de rendu :

- **Configuration globale (`main.js`)** :
  ```javascript
  if (window.AOS) {
      AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
          offset: 60
      });
  }
  ```
- **Attributs appliqués** : `data-aos="fade-down"`, `data-aos="fade-up"`, `data-aos="zoom-in"`, `data-aos="fade-right"`, `data-aos="fade-left"`.
- **Rafraîchissement dynamique** : appel à `AOS.refresh()` dans `avis.js` dès que les avis Firestore sont injectés dans le DOM.

---

## 8. Typographie

Le système typographique repose sur deux familles de polices auto-hébergées, garantissant l'indépendance vis-à-vis des serveurs externes et la conformité RGPD :

### Great Vibes (Calligraphique)
- **Rôle** : Identité de marque, logo, titres `h1` et `h2`, badges et ornements de prix.
- **Raison d'être** : Évoque l'élégance du travail éditorial artisanal et la rigueur littéraire.

### Open Sans (Sans-serif)
- **Rôle** : Corps de texte, listes descriptives, champs de saisie, mentions légales, boutons.
- **Raison d'être** : Excellente lisibilité sur écrans retina et mobiles.

### Optimisation `font-display: swap`
Toutes les règles `@font-face` appliquent la directive `font-display: swap` pour éliminer le phénomène de texte invisible (FOIT) lors du chargement initial.

---

## 9. Navigation — Menu Burger Accessible

### Architecture HTML & ARIA

Le menu latéral repose sur une structure accessible répondant aux exigences WAI-ARIA :
- **Bouton déclencheur (`#burgerBtn`)** : gère l'état `aria-expanded="false|true"` et possède son label `aria-label="Ouvrir le menu"`.
- **Volet coulissant (`#sideNav`)** : gère l'attribut `aria-hidden="true|false"` et intègre le bouton de fermeture `#closeBtn`.
- **Fond d'occultation (`#navOverlay`)** : intercepte les clics hors navigation pour fermer le menu.

### Comportement JavaScript (`main.js`)

- **Verrouillage du scroll** : application de `document.body.style.overflow = 'hidden'` à l'ouverture pour empêcher tout défilement de fond indésirable.
- **Accessibilité clavier** : écoute globale de la touche **Échap** (`Escape`) pour refermer instantanément le menu.

---

## 10. Authentification — Clerk JS v5

### Intégration et Initialisation (`clerk-api.js`)

Clerk est instancié au chargement de la fenêtre :
1. Importation dynamique du dictionnaire français :
   ```javascript
   const { frFR } = await import('https://esm.sh/@clerk/localizations@2');
   await window.Clerk.load({ localization: frFR });
   ```
2. **Gestion adaptative de l'en-tête** :
   - **Visiteur non connecté** : le clic sur l'icône utilisateur déclenche l'ouverture de la boîte de connexion Clerk (`window.Clerk.openSignIn()`).
   - **Utilisateur connecté** : l'icône est remplacée par `"Bonjour, [Prénom]"`, un bouton de **Déconnexion** (`signOut()`) est injecté à côté, et le clic sur le nom ouvre le panneau de gestion du compte (`window.Clerk.openUserProfile()`).
3. **Contrôle d'accès à la rédaction d'avis** :
   - Si l'utilisateur est connecté, le message d'invitation `#avis-connexion-msg` est masqué et le formulaire `#avis-form` devient actif.

---

## 11. Base de données — Firebase Firestore

### Initialisation modulaire (`firebase-api.js`)

L'application utilise le SDK officiel Firebase v10 chargé en mode ES Module :
- Initialisation via `initializeApp(firebaseConfig)` et `getFirestore(app)`.
- **Pont de communication global** : exposition des méthodes sur l'objet `window` (`window.db`, `window.collection`, `window.addDoc`, `window.getDocs`) afin de permettre leur invocation sécurisée depuis les scripts classiques comme `avis.js`.

### Modèle de données — Collection `avis_clients`

Chaque document de la collection `avis_clients` respecte la structure suivante :

```json
{
  "nom": "Prénom de l'utilisateur (issu du profil Clerk)",
  "texte": "Texte du témoignage (500 caractères max)",
  "date": "DD/MM/YYYY (date locale française)",
  "note": 5,
  "etoiles": "⭐⭐⭐⭐⭐"
}
```

---

## 12. Système d'avis clients

Le composant d'avis présent sur `avis.html` allie consultation libre et dépôt authentifié :

### 1. Consultation publique (`avis.js`)
- Exécution de `chargerAvis()` qui interroge la collection Firestore `avis_clients`.
- Génération dynamique des cartes DOM (`creerCarteAvis`) avec initiales stylisées, note en étoiles dorées, texte et date de parution.
- Affichage d'un message bienveillant si aucun avis n'est encore enregistré.

### 2. Étoiles interactives (`main.js`)
- Gestion complète au survol (`mouseenter`), à la sortie (`mouseleave`), au clic (`click`) et au clavier (`Enter` / `Space`) avec attributs `role="radio"` et `tabindex="0"`.

### 3. Enregistrement sécurisé
- Validation du statut de connexion Clerk, de la présence d'un message non vide et d'une note comprise entre 1 et 5.
- Envoi asynchrone vers Firestore via `addDoc`.
- Ajout immédiat en première position du DOM via `reviewsList.prepend()` avec l'animation CSS fluide `.avis-card--new` (sans nécessité de recharger la page).

---

## 13. Formulaire de contact & Netlify Forms

Le formulaire de contact situé sur la page d'accueil (`index.html`) assure la collecte directe des demandes de devis :

### Interface & Floating Labels (CSS pur)
- Utilisation combinée de `:focus` et `:not(:placeholder-shown)` avec `placeholder=" "` pour animer l'élévation des étiquettes au-dessus du champ.
- Barre d'accentuation dynamique `.form-focus-bar` qui s'étend sous le champ actif.

### Intégration Netlify Forms & Handler AJAX (`forms.js`)
- Balisage HTML conforme Netlify : attribut `data-netlify="true"` et champ masqué `<input type="hidden" name="form-name" value="contact">`.
- **Intercepteur JavaScript (`forms.js`)** :
  - Empêche le rechargement de page (`e.preventDefault()`).
  - Envoie les données encodées en URL via `fetch('/', { method: 'POST', ... })`.
  - Prend en charge le code de redirection `opaqueredirect` propre au traitement Netlify.
  - Intègre un mode de simulation automatique lors des tests sur `localhost` ou `127.0.0.1`.

---

## 14. Offre de Services & Grille Tarifaire

La page `services-tarifs.html` détaille l'ensemble des formules proposées, calculées par tranche de **1 000 Signes Espaces Comprises (SEC)** :

### Les 4 Formules tarifaires

| Formule | Objectif | Prestations incluses | Tarif unitaire |
|---|---|---|---|
| **🧭 L'Éclaireur** | Bêta-lecture | Analyse du rythme, de l'intrigue, de la cohérence des personnages et de la structure narrative | **1,50 €** / 1 000 SEC |
| **🖊️ L'Essentiel** | Correction Standard | Orthographe, grammaire, syntaxe et règles de typographie | **3,00 €** / 1 000 SEC |
| **🎯 L'Exigeant** | Correction Approfondie | Correction standard + travail du style, élimination des lourdeurs et répétitions | **5,00 €** / 1 000 SEC |
| **🎓 Le Spécialiste** | Textes Complexes & Techniques | Correction approfondie pour écrits universitaires (thèses, mémoires) et documents professionnels à vocabulaire spécifique | **7,00 €** / 1 000 SEC |

### Modalités d'intervention & Options
- **Option Urgence (24h à 48h)** : majoration de `+25 % à +30 %` sur le montant total selon le volume et la faisabilité.
- **Suivi des modifications** : restitution sous Word (.docx) ou Google Docs avec corrections intégrées et suggestions en marge, validables en un clic par le client.
- **Régime fiscal** : TVA non applicable, article 293 B du CGI (Micro-entreprise).

---

## 15. Pages légales et conformité RGPD

Le site intègre les 4 pages réglementaires complètes, avec les coordonnées légales officielles :

### Identité légale de l'éditrice
- **Prestataire** : Helena Rigaud
- **Statut juridique** : Micro-entreprise
- **Adresse professionnelle** : 47 rue Vivienne, 75002 Paris, France
- **Contact e-mail** : `lemotjusteaupoint.hr@outlook.com`
- **Numéro SIRET** : `80485686200029`
- **TVA** : Non applicable (art. 293 B du Code Général des Impôts)

### Synthèse des documents juridiques

| Page | Cadre législatif | Contenu clé |
|---|---|---|
| `mentions-legales.html` | Loi LCEN n° 2004-575 | Identification de l'éditrice, de l'hébergeur et droits de propriété intellectuelle. |
| `politique-de-conf.html` | RGPD (UE) 2016/679 | Données collectées (nom, email, devis), finalités, droits d'accès, de rectification et d'effacement. |
| `cgu.html` | Recommandations CNIL | Règles d'utilisation du site, propriété des contenus et responsabilité. |
| `cgv.html` | Code de commerce (L. 441-6) | Conditions de vente : acompte de **30 %** à la commande, solde à la livraison, règlements par virement ou PayPal, délai de réclamation de 7 jours. |

---

## 16. SEO On-page & Métadonnées

Chaque page intègre un paramétrage SEO optimisé :

- **Balises Meta indispensables** : `charset="UTF-8"`, `viewport`, `description` unique et ciblée, `theme-color` (`#d4789a`), `referrer="strict-origin-when-cross-origin"`.
- **Protocole Open Graph** : `og:title`, `og:description`, `og:type="website"`, `og:locale="fr_FR"`.
- **Favicon & Identité** : `<link rel="icon" href="assets/img/logo01.png" type="image/png">`.
- **Structure sémantique Hn** : Un seul `<h1>` par page, complété de sous-titres `<h2>` et `<h3>` cohérents.

---

## 17. Sécurité & En-têtes HTTP (`_headers`)

Le fichier `_headers` situé à la racine du projet configure la sécurité HTTP déployée sur Netlify :

### 1. En-têtes globaux de sécurité
- `Strict-Transport-Security` : `max-age=63072000; includeSubDomains; preload` (HSTS actif sur 2 ans) ;
- `X-Content-Type-Options` : `nosniff` (protection contre le MIME-sniffing) ;
- `X-Frame-Options` : `SAMEORIGIN` (protection anti-clickjacking) ;
- `Referrer-Policy` : `strict-origin-when-cross-origin` ;
- `Permissions-Policy` : restriction d'accès aux capteurs (`geolocation=()`, `microphone=()`, `camera=()`, etc.).

### 2. Politiques CSP granulaires (Content Security Policy)
- **Pages avec Clerk & Firebase** (`index.html`, `services-tarifs.html`, `a-propos.html`, `avis.html`) : autorisent `clerk.accounts.dev`, `esm.sh`, `gstatic.com`, `googleapis.com`, et `cdnjs.cloudflare.com` (AOS).
- **Pages légales** (`mentions-legales.html`, `politique-de-conf.html`, `cgu.html`, `cgv.html`) : CSP ultra-stricte sans dépendances tierces inutiles (`frame-src 'none'`).

---

## 18. Accessibilité (WCAG)

Conforme aux directives WCAG 2.1 (Niveau AA) :
- **Attributs ARIA** complets sur les composants interactifs (`aria-expanded`, `aria-hidden`, `aria-label`, `role="region"`, `role="radio"`, `role="group"`) ;
- **Navigation au clavier** intégrale (boutons, liens, étoiles de notation avec support de `Space` et `Enter`) ;
- **Textes alternatifs (`alt`)** descriptifs sur toutes les images et icônes d'illustration ;
- **Contraste chromatique** rigoureusement calibré entre le texte marine `#29274C`, le rose `#d4789a` et le fond blanc rosé `#fdf6f6`.

---

## 19. Performance & Stratégie de Cache

- **Scripts différés** : attributs `defer` et `type="module"` sur l'ensemble des scripts JS pour éliminer tout blocage du rendu DOM.
- **Attributs de priorité** : `fetchpriority="high"` sur les icônes clés au-dessus de la ligne de flottaison et `loading="lazy"` sur les visuels secondaires.
- **Politique de mise en cache (`_headers`)** :
  - Fichiers CSS, JS et Polices : `Cache-Control: public, max-age=31536000, immutable` (mise en cache 1 an).
  - Images PNG/JPG : `Cache-Control: public, max-age=2592000` (mise en cache 30 jours).

---

## 20. Iconographie

- **Logos officiels** : `assets/img/logo01.png` (icône d'onglet/favicon) et `assets/img/logo02.png` (logo haute définition du header d'accueil).
- **Icônes illustratives (Flaticon)** : stockées au format PNG optimisé dans `assets/img/icons/`.
- **Réseaux sociaux** : icônes vectorielles SVG inline intégrées au footer (lien LinkedIn actif, Instagram et Facebook prêts pour activation).

---

## 21. Déploiement et roadmap de mise en ligne

### Bilan de l'état actuel du projet

Le projet est entièrement développé, testé et prêt pour l'exploitation en production :

| Fonctionnalité / Livrable | Statut | Détails |
|---|---|---|
| **Architecture multi-pages & Navigation** | ✅ Terminé | 8 pages HTML, menu burger animé, navigation responsive |
| **Bandeau promotionnel défilant** | ✅ Terminé | Défilement CSS infini, pause au survol, masquage dégradé |
| **Animations AOS** | ✅ Terminé | Intégration globale AOS sur toutes les pages |
| **Formulaire de contact** | ✅ Terminé | Câblé avec Netlify Forms et `forms.js` (AJAX + fallback) |
| **Grille tarifaire des services** | ✅ Terminé | 4 formules de 1,50 € à 7,00 € / 1 000 SEC + option urgence |
| **Système d'avis clients** | ✅ Terminé | Authentification Clerk + persistance temps réel Firestore |
| **Identité & Documents légaux** | ✅ Terminé | Données SIRET, micro-entreprise, adresse et CGV complètes |
| **Sécurité & En-têtes HTTP** | ✅ Terminé | Fichier `_headers` Netlify avec CSP et HSTS configurés |
| **Logos & Typographies** | ✅ Terminé | Polices auto-hébergées, logos et favicon intégrés |

### Étapes pour le passage en production définitive

1. **Publication sur Netlify** : lier le dépôt Git à Netlify pour déclencher le déploiement continu.
2. **Clés Clerk de production** : remplacer la clé de test `pk_test_...` par la clé de production `pk_live_...` dans les balises `<script>` de chaque page HTML.
3. **Règles de sécurité Firestore** : valider les règles de sécurité en console Firebase pour autoriser la lecture publique et restreindre l'écriture aux utilisateurs authentifiés.
4. **Nom de domaine personnalisé** : configurer les enregistrements DNS (CNAME / Alias) pointant vers l'instance Netlify.

---

*Documentation technique mise à jour — Projet Le Mot Juste Au Point*

