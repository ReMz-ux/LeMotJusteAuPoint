// Initialise Clerk, traduit l'UI en français et gère le header de compte
window.addEventListener('load', async () => {

    if (!window.Clerk) {
        console.error('Clerk : SDK non chargé — vérifiez les balises <script> dans <head>.');
        return;
    }

    const { frFR } = await import('https://esm.sh/@clerk/localizations@2');
    await window.Clerk.load({ localization: frFR });

    const accountBtn = document.querySelector('.header-account a');
    if (!accountBtn) return;

    if (window.Clerk.user) {
        accountBtn.textContent = 'Bonjour, ' + window.Clerk.user.firstName;

        const logoutBtn = document.createElement('button');
        logoutBtn.textContent = 'Déconnexion';
        logoutBtn.classList.add('contact-btn', 'logout-btn');
        logoutBtn.addEventListener('click', async () => {
            await window.Clerk.signOut();
            window.location.reload();
        });
        accountBtn.parentNode.appendChild(logoutBtn);

        accountBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.Clerk.openUserProfile();
        });
    } else {
        accountBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.Clerk.openSignIn();
        });
    }

    // Gestion de l'affichage du formulaire avis (page avis uniquement)
    const connexionMsg = document.getElementById('avis-connexion-msg');
    const avisForm = document.getElementById('avis-form');
    if (connexionMsg && avisForm) {
        if (window.Clerk.user) {
            connexionMsg.style.display = 'none';
            avisForm.style.display = 'flex';
            avisForm.style.flexDirection = 'column';
            avisForm.style.gap = '24px';
        } else {
            connexionMsg.style.display = 'block';
            avisForm.style.display = 'none';
        }
    }
});
