========================================================
  LE MOT JUSTE AU POINT — Site vitrine professionnel
========================================================

Auteur du projet  : Rémi P.
Client            : Helena Rigaud, correctrice professionnelle certifiée
Date de création  : 2026
Statut            : En développement actif

--------------------------------------------------------
  DESCRIPTION
--------------------------------------------------------

Site vitrine commandé pour Helena Rigaud, correctrice freelance
certifiée Voltaire et Le Robert. Il présente ses services
(relecture, correction, bêta-lecture), affiche ses certifications
et permet à ses clients de déposer des avis authentifiés.

Trois cibles éditoriales : auteurs en auto-édition, étudiants
(thèses, mémoires) et entreprises / médias.

--------------------------------------------------------
  STACK TECHNIQUE
--------------------------------------------------------

- HTML5 / CSS3 / JavaScript Vanilla (sans framework)
- Clerk JS v5     → Authentification as-a-Service
- Firebase Firestore v10 → Base de données NoSQL (avis clients)
- Polices auto-hébergées : Great Vibes + Open Sans
- Architecture MPA statique (Multi-Page Application)

--------------------------------------------------------
  STRUCTURE DES FICHIERS
--------------------------------------------------------

index.html              Accueil (hero, ciblage client, contact)
services-tarifs.html    Présentation des 3 services
a-propos.html           Certifications & diplômes
avis.html               Avis clients (lecture publique + dépôt authentifié)
mentions-legales.html   Mentions légales (LCEN 2004)
politique-de-conf.html  Politique de confidentialité (RGPD)
cgu.html                Conditions Générales d'Utilisation
cgv.html                Conditions Générales de Vente

assets/css/
  style.css             Reset, typographie, variables globales
  menu.css              Header fixe, menu burger animé, overlay
  pages.css             Styles de contenu par page

assets/js/
  main.js               Menu burger accessible + étoiles interactives
  clerk api.js          Initialisation Clerk, localisation FR, header de compte
  firebase-api.js       Initialisation Firebase + exposition globale Firestore
  avis.js               Chargement, rendu et soumission des avis
  forms.js              (En préparation — formulaire de contact)

assets/fonts/           Polices auto-hébergées (Great Vibes, Open Sans)
assets/img/icons/       Icônes illustratives PNG (Flaticon)
assets/img/logos/       Logo du site (en cours)
assets/img/photos/      Photos (en cours)

DOCUMENTATION.md        Documentation technique complète du projet

--------------------------------------------------------
  FONCTIONNALITÉS IMPLÉMENTÉES
--------------------------------------------------------

[x] Navigation multi-pages complète
[x] Menu burger animé avec accessibilité ARIA complète
[x] Authentification via Clerk JS v5 (connexion, profil, déconnexion)
[x] Localisation française de l'interface Clerk
[x] Système d'avis clients (lecture publique + soumission authentifiée)
[x] Stockage des avis dans Firebase Firestore
[x] Sélecteur d'étoiles interactif (souris + clavier)
[x] Formulaire de contact avec labels flottants (CSS pur)
[x] Design system cohérent (palette rose/marine, cartes, CTA animé)
[x] Pages légales complètes (ML, RGPD, CGU, CGV)
[x] SEO on-page (meta description unique, titres, sémantique HTML5)
[x] Content Security Policy (CSP) contre les attaques XSS
[x] Polices auto-hébergées avec font-display: swap
[x] Accessibilité WCAG 2.1 niveau AA

--------------------------------------------------------
  EN ATTENTE / À VENIR
--------------------------------------------------------

[ ] Logique d'envoi du formulaire de contact (forms.js)
[ ] Tarifs des services (informations client à recevoir)
[ ] Logo définitif
[ ] Photos
[ ] URLs réseaux sociaux (Instagram, Facebook, LinkedIn)
[ ] Informations légales (SIRET, adresse, hébergeur)
[ ] Déploiement en production (Netlify / Vercel)
[ ] Passage des clés Clerk de mode test vers mode production

--------------------------------------------------------
  DOCUMENTATION TECHNIQUE
--------------------------------------------------------

La documentation technique complète est disponible dans le
fichier DOCUMENTATION.md à la racine du projet.

Elle détaille l'architecture, les choix technologiques et
leur justification, le design system, la sécurité et
l'accessibilité — rédigée à destination d'un portfolio.

--------------------------------------------------------
  NOTES DE DÉVELOPPEMENT
--------------------------------------------------------

- Les clés Firebase présentes dans firebase-api.js sont des
  clés publiques côté client (comportement normal et documenté
  par Google). La sécurité des données repose sur les règles
  Firestore configurées dans la console Firebase.

- La clé publique Clerk (pk_test_...) est actuellement en
  mode TEST. Elle devra être remplacée par une clé pk_live_
  avant toute mise en production.

- Le fichier "clerk api.js" contient un espace dans son nom
  (héritage du nommage initial). À renommer en "clerk-api.js"
  avant déploiement pour éviter des problèmes de résolution
  de chemin sur certains serveurs.

========================================================
  © 2026 — Le Mot Juste Au Point
========================================================

