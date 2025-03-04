// Fonction pour récupérer et afficher les plantes
async function fetchPlantes() {
    try {
        const response = await fetch('http://localhost:3000/RecensementPlante/fetch_plantes.php'); // Utilisation du proxy sur le port 3000
        if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);

        const data = await response.json();
        const plantesList = document.getElementById("plantes-list");
        plantesList.innerHTML = ""; // Réinitialiser la liste

        data.forEach(plante => {
            const li = document.createElement("li");
            li.innerHTML = `
                <h3><strong>${plante.nom}</strong></h3>
                ${plante.image_url ? `<img src="${plante.image_url}" alt="${plante.nom}" width="100">` : ''}
                <p><strong>Description :</strong><br>${plante.description.replace(/\n/g, '<br>')}</p>  <!-- Ajouter des sauts de ligne -->
                ${plante.autres_info ? `<p><strong>Autres informations :</strong><br>${plante.autres_info.replace(/\n/g, '<br>')}</p>` : ''}
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
    event.preventDefault(); // Empêcher l'envoi du formulaire par défaut

    const formData = new FormData();
    formData.append('planteNom', document.getElementById('planteNom').value);
    formData.append('planteDesc', document.getElementById('planteDesc').value);
    formData.append('planteUtilis', document.getElementById('planteUtilis').value);
    formData.append('planteImage', document.getElementById('planteImage').files[0]); // Champ de fichier image

    try {
        const response = await fetch('http://localhost:3000/RecensementPlante/add_plante.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            alert("Plante ajoutée avec succès !");
            // Réinitialiser le formulaire après l'ajout
            document.getElementById('planteForm').reset();
            fetchPlantes(); // Recharger les plantes pour afficher la nouvelle
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
    document.querySelectorAll('.tab-content').forEach(section => section.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(button => button.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
}

// Initialisation
document.addEventListener("DOMContentLoaded", () => {
    fetchPlantes();
    showTab('plantes');

    document.getElementById("planteForm").addEventListener("submit", addPlante);
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => showTab(button.getAttribute('data-tab')));
    });
});
