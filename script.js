// Fonction pour récupérer et afficher les plantes
async function fetchPlantes() {
    try {
        const response = await fetch('fetch_plantes.php');
        if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);

        // Vérification de la réponse avant de tenter de la parser
        const text = await response.text();
        
        try {
            const data = JSON.parse(text);
            if (!Array.isArray(data)) throw new Error("Réponse inattendue du serveur");

            const plantesList = document.getElementById("plantes-list");
            plantesList.innerHTML = ""; // Réinitialiser la liste

            data.forEach(plante => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <h3>${plante.nom}</h3>
                    ${plante.image_url ? `<img src="${plante.image_url}" alt="${plante.nom}" width="100">` : ''}
                    <p>${plante.description}</p>
                `;
                plantesList.appendChild(li);
            });
        } catch (jsonError) {
            console.error('Erreur de parsing JSON:', jsonError);
            console.log('Réponse brute du serveur:', text);  // Affiche la réponse brute pour voir ce qui est retourné
        }

    } catch (error) {
        console.error('Erreur lors de la récupération des plantes :', error);
    }
}

// Fonction pour ajouter une plante
async function addPlante(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById("planteForm"));

    try {
        const response = await fetch("http://localhost/RecensementPlante/add_plante.php", { 
    method: "POST", 
    body: formData 
        });

        const text = await response.text();

        try {
            const result = JSON.parse(text);
            if (!result.success) throw new Error(result.message || "Erreur inconnue");

            alert("Plante ajoutée avec succès !");
            document.getElementById("planteForm").reset();
            fetchPlantes();
        } catch (jsonError) {
            console.error("Réponse invalide :", text);
            alert("Erreur lors de l'ajout de la plante");
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
