// Fonction pour récupérer et afficher les plantes
async function fetchPlantes() {
    try {
        const response = await fetch('http://localhost:3000/RecensementPlante/fetch_plantes.php'); // Pointage vers le serveur proxy
        if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);

        const data = await response.json();
        const plantesList = document.getElementById("plantes-list");
        plantesList.innerHTML = ""; // Réinitialiser la liste

        data.forEach(plante => {
            const li = document.createElement("li");
            li.innerHTML = `
                <h3><strong>${plante.nom}</strong></h3>
               <p style="float:right> ${plante.image_url ? `<img src="http://localhost:3000/RecensementPlante/${plante.image_url}" alt="${plante.nom}" width="100">` </p> : ''}
                <p><strong>Description :</strong><br>${plante.description.replace(/\n/g, '<br>')}</p>
                ${plante.effet ? `<p><strong>Autres informations :</strong><br>${plante.effet.replace(/\n/g, '<br>')}</p>` : ''}
            `;
            plantesList.appendChild(li);
        });

    } catch (error) {
        console.error('Erreur lors de la récupération des plantes :', error);
        alert("Une erreur s'est produite lors de la récupération des plantes. Voir la console pour plus de détails.");
    }
}

// Fonction pour ajouter une plante
async function addPlante(event) {
    event.preventDefault(); // Empêcher l'envoi du formulaire de manière classique

    // Validation des champs
    const planteNom = document.getElementById('planteNom').value.trim();
    const planteDesc = document.getElementById('planteDesc').value.trim();
    const planteUtilis = document.getElementById('planteUtilis').value.trim();
    const planteImage = document.getElementById('planteImage').files[0];

    if (!planteNom || !planteDesc || !planteUtilis || !planteImage) {
        alert("Tous les champs doivent être remplis !");
        return;
    }

    const formData = new FormData();
    formData.append('planteNom', planteNom);
    formData.append('planteDesc', planteDesc);
    formData.append('planteUtilis', planteUtilis);
    formData.append('planteImage', planteImage); // Champ de fichier image

    try {
        const response = await fetch('http://localhost:3000/RecensementPlante/add_plante.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            alert("Plante ajoutée avec succès !");
            document.getElementById('planteForm').reset(); // Réinitialiser le formulaire après l'ajout
            fetchPlantes(); // Rafraîchir la liste des plantes après ajout
        } else {
            alert("Erreur lors de l'ajout de la plante : " + data.message);
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout de la plante :", error);
        alert("Erreur lors de l'ajout de la plante");
    }
}

// Changer de section
function showTab(tabName) {
    const tabContent = document.getElementById(tabName);
    if (tabContent) {
        document.querySelectorAll('.tab-content').forEach(section => section.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach(button => button.classList.remove('active'));

        tabContent.classList.add('active');
        document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
    } else {
        console.error(`L'élément avec l'ID ${tabName} n'a pas été trouvé.`);
    }
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
    fetchPlantes(); // Charge les plantes au chargement de la page

    // Vérifier l'existence du formulaire avant d'attacher l'événement
    const form = document.getElementById("planteForm");
    if (form) {
        form.addEventListener("submit", addPlante);
    }

    // Ajouter des événements aux boutons de navigation
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => showTab(button.getAttribute('data-tab')));
    });
});
