// Fonction pour récupérer et afficher les plantes
// Fonction pour récupérer et afficher les plantes depuis la BDD
async function fetchPlantes() {
    try {
        const response = await fetch('fetch_plantes.php'); // Assurez-vous que ce fichier PHP est bien accessible
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Erreur serveur: ${response.status}`);
        }

        if (!Array.isArray(data)) {
            throw new Error("Réponse inattendue du serveur");
        }

        const plantesList = document.getElementById("plantes-list");
        plantesList.innerHTML = ""; // Réinitialiser la liste avant d'afficher les nouvelles plantes

        data.forEach(plante => {
            const li = document.createElement("li");
            li.innerHTML = `
                <h3>${plante.nom}</h3>
                <img src="${plante.image_url}" alt="${plante.nom}" width="100">
                <p>${plante.description}</p>
            `;
            plantesList.appendChild(li);
        });

    } catch (error) {
        console.error('Erreur lors de la récupération des plantes :', error);
    }
}

// Charger les plantes au démarrage
document.addEventListener("DOMContentLoaded", fetchPlantes);

// Fonction pour ajouter une plante
async function addPlante(event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("planteForm"));

    try {
        const response = await fetch("add_plante.php", {
            method: "POST",
            body: formData
        });

        const text = await response.text(); // Récupère la réponse sous forme de texte brut

        // Vérification si la réponse est JSON valide
        try {
            const result = JSON.parse(text);
            if (!result.success) throw new Error(result.message || "Erreur inconnue");

            alert("Plante ajoutée avec succès !");
            document.getElementById("planteForm").reset();
            fetchPlantes(); // Rafraîchit la liste des plantes
        } catch (jsonError) {
            console.error("Réponse invalide :", text);
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout de la plante :", error);
    }
}

// Écouteur d'événement pour soumission du formulaire
document.getElementById("planteForm").addEventListener("submit", addPlante);

// Fonction pour changer de section (activer/désactiver les boutons et sections)
function showTab(tabName) {
    const sections = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');

    sections.forEach(section => section.classList.remove('active'));
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
}

// Ajouter des écouteurs d'événements pour les boutons de tabulation
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        showTab(button.getAttribute('data-tab'));
    });
});

// Charger les plantes au démarrage
document.addEventListener("DOMContentLoaded", () => {
    fetchPlantes();
    showTab('plantes');
});
