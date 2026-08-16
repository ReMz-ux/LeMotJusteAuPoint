document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // En local, Netlify ne tourne pas : on simule juste le succès
        if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
            alert('Votre message a bien été envoyé !');
            form.reset();
            return;
        }

        const data = new URLSearchParams(new FormData(form));

        try {
            const res = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: data.toString(),
                redirect: 'manual',
            });

            // Netlify retourne un 3xx après traitement du formulaire
            if (res.ok || res.type === 'opaqueredirect') {
                alert('Votre message a bien été envoyé !');
                form.reset();
            } else {
                alert("Une erreur est survenue. Veuillez réessayer.");
            }
        } catch {
            alert("Une erreur est survenue. Veuillez réessayer.");
        }
    });
});
