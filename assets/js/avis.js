document.addEventListener('DOMContentLoaded', () => {

    const reviewsList = document.getElementById('reviews-list');
    if (!reviewsList) return; // on n'est pas sur la page avis

    // ── Construit une carte d'avis à partir des données ──────────────────────
    function creerCarteAvis(data, isNew = false) {
        const card = document.createElement('div');
        card.className = 'avis-card' + (isNew ? ' avis-card--new' : '');
        card.setAttribute('data-aos', 'fade-up');
        card.setAttribute('data-aos-duration', '600');

        // Étoiles
        const starsDiv = document.createElement('div');
        starsDiv.className = 'avis-stars';
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = 'star' + (i <= data.note ? ' filled' : '');
            star.textContent = '★';
            starsDiv.appendChild(star);
        }

        // Texte de l'avis
        const texteP = document.createElement('p');
        texteP.className = 'avis-texte';
        texteP.textContent = data.texte;

        // Auteur
        const auteurDiv = document.createElement('div');
        auteurDiv.className = 'avis-auteur';

        const initiales = document.createElement('div');
        initiales.className = 'avis-initiales';
        initiales.textContent = (data.nom || '?').charAt(0).toUpperCase();

        const infoDiv = document.createElement('div');
        const nomDiv = document.createElement('div');
        nomDiv.className = 'avis-nom';
        nomDiv.textContent = data.nom || 'Anonyme';
        const dateDiv = document.createElement('div');
        dateDiv.className = 'avis-date';
        dateDiv.textContent = data.date;
        infoDiv.appendChild(nomDiv);
        infoDiv.appendChild(dateDiv);

        auteurDiv.appendChild(initiales);
        auteurDiv.appendChild(infoDiv);

        card.appendChild(starsDiv);
        card.appendChild(texteP);
        card.appendChild(auteurDiv);

        return card;
    }

    // ── Charge et affiche tous les avis depuis Firebase (visible par tous) ───
    async function chargerAvis() {
        try {
            const snapshot = await window.getDocs(window.collection(window.db, "avis_clients"));
            reviewsList.innerHTML = '';

            if (snapshot.empty) {
                reviewsList.innerHTML = '<p class="avis-vide">Aucun commentaire pour le moment.</p>';
                return;
            }

            snapshot.forEach(doc => {
                reviewsList.appendChild(creerCarteAvis(doc.data()));
            });
            if (window.AOS) AOS.refresh();
        } catch (err) {
            console.error('Erreur chargement des avis :', err);
        }
    }

    chargerAvis();

    // ── Soumission du formulaire ──────────────────────────────────────────────
    const formAvis = document.getElementById('avis-form');
    if (!formAvis) return;

    formAvis.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!window.Clerk || !window.Clerk.user) {
            alert("Erreur : Vous devez être connecté pour publier un avis.");
            return;
        }

        const texteAvis = document.getElementById('avis-texte-input').value.trim();
        const prenomClient = window.Clerk.user.firstName;
        const noteChoisie = parseInt(document.getElementById('avis-note').value, 10);

        if (!texteAvis) {
            alert("Veuillez écrire votre avis.");
            return;
        }

        if (!noteChoisie || noteChoisie < 1 || noteChoisie > 5) {
            alert("Veuillez choisir une note en étoiles.");
            return;
        }

        const dateDuJour = new Date().toLocaleDateString('fr-FR');

        try {
            await window.addDoc(window.collection(window.db, "avis_clients"), {
                nom: prenomClient,
                texte: texteAvis,
                date: dateDuJour,
                etoiles: '⭐'.repeat(noteChoisie),
                note: noteChoisie
            });

            // Supprimer le message "aucun avis" s'il est affiché
            const msgVide = reviewsList.querySelector('.avis-vide');
            if (msgVide) msgVide.remove();

            // Ajouter la nouvelle carte en tête de liste avec l'animation
            const nouvelleCard = creerCarteAvis(
                { nom: prenomClient, texte: texteAvis, date: dateDuJour, note: noteChoisie },
                true
            );
            reviewsList.prepend(nouvelleCard);

            // Vider le formulaire
            document.getElementById('avis-texte-input').value = '';
            document.getElementById('avis-note').value = '0';
            document.querySelectorAll('.star-input').forEach(s => s.classList.remove('active'));

        } catch (erreur) {
            console.error("Erreur lors de l'envoi à Firebase : ", erreur);
            alert("Oups, une erreur est survenue. Veuillez réessayer.");
        }
    });
});