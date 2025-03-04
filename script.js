// Fonction pour récupérer et afficher les plantes
async function fetchPlantes() {
    try {
        const response = await fetch('http://localhost/RecensementPlante/fetch_plantes.php'); // Pointage vers ton backend local
        if (!response.ok) throw new Error(`Erreur serveur: ${response.status}`);

        const text = await response.text();  // Récupère la réponse en texte brut pour vérifier
        console.log('Réponse brute du serveur:', text);  // Affiche la réponse brute dans la console

        let data;
        try {
            data = JSON.parse(text);  // Tente de parser le texte en JSON
        } catch (jsonError) {
            throw new Error('Erreur de parsing JSON : ' + jsonError.message);
        }

        if (!Array.isArray(data)) throw new Error("Réponse inattendue du serveur : doit être un tableau");

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

    } catch (error) {
        console.error('Erreur lors de la récupération des plantes :', error);
        alert("Une erreur s'est produite lors de la récupération des plantes. Voir la console pour plus de détails.");
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
        console.log('Réponse brute de l\'ajout de la plante:', text);  // Affiche la réponse brute dans la console

        let result;
        try {
            result = JSON.parse(text);  // Tente de parser la réponse
        } catch (jsonError) {
            throw new Error('Erreur de parsing JSON lors de l\'ajout de la plante : ' + jsonError.message);
        }

        if (!result.success) throw new Error(result.message || "Erreur inconnue");

        alert("Plante ajoutée avec succès !");
        document.getElementById("planteForm").reset();
        fetchPlantes();  // Recharge la liste des plantes après ajout

    } catch (error) {
        console.error("Erreur lors de l'ajout de la plante :", error);
        alert("Erreur lors de l'ajout de la plante. Voir la console pour plus de détails.");
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
