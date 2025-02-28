// Fonction pour récupérer et afficher les plantes depuis MySQL
async function fetchPlantes() {
    try {
        const response = await fetch('fetch_plantes.php');
        const data = await response.json();

        const plantesList = document.getElementById("plantes-list");
        plantesList.innerHTML = ""; // Réinitialiser la liste

        data.forEach(plante => {
            const li = document.createElement("li");
            li.innerHTML = `
                <h3>${plante.nom}</h3>
                <img src="${plante.image_url}" alt="${plante.nom}" width="100">
                <p>${plante.description}</p>
                <p>${plante.effet}</p>
            `;
            plantesList.appendChild(li);
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des plantes :', error);
    }
}

// Gestion du formulaire d'ajout de plante
document.getElementById("planteForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    try {
        const response = await fetch('add_plante.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            fetchPlantes(); // Mettre à jour la liste
            document.getElementById("planteForm").reset();
        } else {
            alert('Erreur : ' + result.message);
        }
    } catch (error) {
        console.error('Erreur lors de l\'ajout de la plante :', error);
    }
});

// Fonction pour changer d'onglet
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.remove('active');
    });

    document.querySelectorAll('.tab-btn').forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');
    document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
}

// Gestion des boutons pour changer de section
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
