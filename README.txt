========================================================
  LE MOT JUSTE AU POINT — Site vitrine professionnel
========================================================

Auteur du projet  : Rémi P.
Client            : Helena Rigaud, correctrice professionnelle certifiée EFLC
Date de création  : 2026
Statut            : Prêt pour la mise en ligne

--------------------------------------------------------
  DESCRIPTION
--------------------------------------------------------

Site vitrine commandé pour Helena Rigaud, correctrice freelance
certifiée par l'EFLC (École Française des Lecteurs et Correcteurs)
et préparant le Certificat Voltaire. Il présente ses services
(relecture, correction, bêta-lecture), détaille ses 4 formules tarifaires
et permet à ses clients de déposer des avis authentifiés.

Trois cibles éditoriales : auteurs en auto-édition, étudiants
(thèses, mémoires) et entreprises / médias.

--------------------------------------------------------
  STACK TECHNIQUE
--------------------------------------------------------

- HTML5 / CSS3 / JavaScript Vanilla (sans framework)
- Clerk JS v5            → Authentification as-a-Service
- Firebase Firestore v10 → Base de données NoSQL (avis clients)
- Netlify Forms          → Traitement des formulaires de contact (AJAX)
- AOS (v2.3.4)           → Animations fluides au défilement
- Polices auto-hébergées : Great Vibes + Open Sans
- Architecture MPA statique (Multi-Page Application)

--------------------------------------------------------
  STRUCTURE DES FICHIERS
--------------------------------------------------------

_headers                Configuration Netlify (HSTS, CSP par page, cache)
index.html              Accueil (bannière promo, hero, ciblage, contact)
services-tarifs.html    Présentation des services & grille tarifaire complète
a-propos.html           Certifications & diplômes (EFLC)
avis.html               Avis clients (lecture publique + dépôt authentifié)
mentions-legales.html   Mentions légales (SIRET, micro-entreprise, LCEN 2004)
politique-de-conf.html  Politique de confidentialité (RGPD)
cgu.html                Conditions Générales d'Utilisation
cgv.html                Conditions Générales de Vente (tarifs, acompte 30%)

assets/css/
  style.css             Reset, typographie, variables globales
  menu.css              Header fixe, menu burger animé, overlay
  pages.css             Styles de contenu par page
  promo-banner.css      Banderole promotionnelle animée (boucle sans fin)

assets/js/
  main.js               Menu burger accessible + étoiles interactives + AOS
  clerk-api.js          Initialisation Clerk, localisation FR, header de compte
  firebase-api.js       Initialisation Firebase + exposition globale Firestore
  avis.js               Chargement, rendu dynamique et soumission des avis
  forms.js              Gestionnaire d'envoi AJAX pour Netlify Forms

assets/fonts/           Polices auto-hébergées (Great Vibes, Open Sans)
assets/img/icons/       Icônes illustratives PNG (Flaticon)
assets/img/             Logos du site (logo01.png, logo02.png, logo.png)

DOCUMENTATION.md        Documentation technique complète du projet

--------------------------------------------------------
  FONCTIONNALITÉS IMPLÉMENTÉES
--------------------------------------------------------

[x] Navigation multi-pages complète responsive
[x] Menu burger animé avec accessibilité ARIA complète
[x] Bandeau promotionnel défilant infini en CSS (pause au survol)
[x] Animations fluides au scroll via AOS (Animate On Scroll)
[x] Authentification via Clerk JS v5 (connexion, profil, déconnexion)
[x] Localisation française de l'interface Clerk
[x] Système d'avis clients (lecture publique + soumission authentifiée)
[x] Stockage temps réel des avis dans Firebase Firestore
[x] Sélecteur d'étoiles interactif (souris + clavier)
[x] Formulaire de contact avec labels flottants (CSS pur)
[x] Traitement AJAX du formulaire de contact via Netlify Forms (forms.js)
[x] Grille tarifaire complète (4 formules de 1,50 € à 7,00 € / 1 000 SEC)
[x] Design system cohérent (palette rose/marine, cartes, CTA animé)
[x] Pages légales complètes et renseignées (SIRET, ML, RGPD, CGU, CGV)
[x] SEO on-page (Open Graph, meta description unique, titres, sémantique)
[x] En-têtes HTTP de sécurité et CSP via fichier _headers pour Netlify
[x] Polices auto-hébergées avec font-display: swap
[x] Accessibilité WCAG 2.1 niveau AA

--------------------------------------------------------
  DÉPLOIEMENT & MISE EN LIGNE
--------------------------------------------------------

[x] Configuration des en-têtes Netlify (_headers)
[ ] Lier le dépôt Git à Netlify pour le build continu
[ ] Remplacer la clé publique Clerk (pk_test_...) par pk_live_ en production
[ ] Vérifier les règles de sécurité Firestore en console Firebase
[ ] Configurer le nom de domaine personnalisé dans Netlify (DNS)

--------------------------------------------------------
  DOCUMENTATION TECHNIQUE
--------------------------------------------------------

La documentation technique complète est disponible dans le
fichier DOCUMENTATION.md à la racine du projet.

Elle détaille l'architecture, les choix technologiques et
leur justification, le design system, la sécurité et
l'accessibilité.

========================================================
  © 2026 — Le Mot Juste Au Point
========================================================

