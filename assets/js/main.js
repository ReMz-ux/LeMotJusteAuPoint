//Déclaration des éléments du DOM
const burgerBtn = document.getElementById('burgerBtn');
const sideNav = document.getElementById('sideNav');
const navOverlay = document.getElementById('navOverlay');
const closeBtn = document.getElementById('closeBtn');

// Fonctions d'ouveture du menu
function openMenu() {
    sideNav.classList.add('is-open');
    navOverlay.classList.add('is-visible');
    burgerBtn.classList.add('is-open');
    burgerBtn.setAttribute('aria-expanded', 'true');
    sideNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // empêche le scroll de la page
}

// Fonctions de fermeture du menu
function closeMenu() {
    sideNav.classList.remove('is-open');
    navOverlay.classList.remove('is-visible');
    burgerBtn.classList.remove('is-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
    sideNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Événements d'ouverture et de fermeture du menu
burgerBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
navOverlay.addEventListener('click', closeMenu);

// Fermeture avec la touche Échap
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
});

/* =========================================
   PAGE AVIS — Étoiles interactives + Clerk
   ========================================= */
(function () {
    const avisForm = document.getElementById('avis-form');
    if (!avisForm) return; // on n'est pas sur la page avis

    const connexionMsg = document.getElementById('avis-connexion-msg');
    const signinBtn = document.getElementById('avis-signin-btn');
    const noteInput = document.getElementById('avis-note');
    const starInputs = document.querySelectorAll('.star-input');

    // Bouton "connecté(e)" dans le message → ouvre la modale Clerk
    if (signinBtn) {
        signinBtn.addEventListener('click', () => {
            if (window.Clerk) window.Clerk.openSignIn();
        });
    }

    // --- Étoiles interactives ---
    starInputs.forEach((star) => {
        star.addEventListener('mouseenter', () => highlightStars(+star.dataset.value));
        star.addEventListener('mouseleave', () => highlightStars(+noteInput.value));
        star.addEventListener('click', () => {
            noteInput.value = star.dataset.value;
            highlightStars(+star.dataset.value);
        });
        star.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                noteInput.value = star.dataset.value;
                highlightStars(+star.dataset.value);
            }
        });
    });

    function highlightStars(value) {
        starInputs.forEach((s) => {
            s.classList.toggle('active', +s.dataset.value <= value);
        });
    }

})();

if (window.AOS) {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 60
    });
}
