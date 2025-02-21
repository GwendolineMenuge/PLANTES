// Gestion des onglets
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        const tab = button.getAttribute('data-tab');
        
        // Changer d'onglet actif
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        document.querySelectorAll('.tab-content').forEach(section => {
            section.classList.remove('active');
            if (section.id === tab) {
                section.classList.add('active');
            }
        });
    });
});

// Fonction pour ajouter une plante à la liste
document.getElementById("planteForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Récupérer les valeurs du formulaire
    const nomPlante = document.getElementById("planteNom").value;
    const descriptionPlante = document.getElementById("planteDesc").value;
    const imagePlante = document.getElementById("planteImage").files[0];

    // Créer un objet FormData pour l'image
    const formData = new FormData();
    formData.append("image", imagePlante);

    // Créer une URL locale pour l'image (à remplacer par un service de stockage si besoin)
    const imageURL = URL.createObjectURL(imagePlante); // Simule une URL d'image locale

    // Ajouter la plante à la liste
    const plante = {
        nom: nomPlante,
        description: descriptionPlante,
        image: imageURL
    };

    // Ajouter la plante à l'affichage
    addPlanteToList(plante);

    // Réinitialiser le formulaire
    document.getElementById("planteForm").reset();
});

// Fonction pour ajouter une potion à la liste
document.getElementById("potionForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // Récupérer les valeurs du formulaire
    const nomPotion = document.getElementById("potionNom").value;
    const descriptionPotion = document.getElementById("potionDesc").value;
    const imagePotion = document.getElementById("potionImage").files[0];

    // Créer un objet FormData pour l'image
    const formData = new FormData();
    formData.append("image", imagePotion);

    // Créer une URL locale pour l'image (à remplacer par un service de stockage si besoin)
    const imageURL = URL.createObjectURL(imagePotion); // Simule une URL d'image locale

    // Ajouter la potion à la liste
    const potion = {
        nom: nomPotion,
        description: descriptionPotion,
        image: imageURL
    };

    // Ajouter la potion à l'affichage
    addPotionToList(potion);

    // Réinitialiser le formulaire
    document.getElementById("potionForm").reset();
});

// Fonction pour afficher les plantes dans la liste
function addPlanteToList(plante) {
    const plantesList = document.getElementById("plantes-list");
    const li = document.createElement("li");

    li.innerHTML = `
        <h3>${plante.nom}</h3>
        <img src="${plante.image}" alt="${plante.nom}" width="100">
        <p>${plante.description}</p>
    `;
    
    plantesList.appendChild(li);
}

// Fonction pour afficher les potions dans la liste
function addPotionToList(potion) {
    const potionsList = document.getElementById("potions-list");
    const li = document.createElement("li");

    li.innerHTML = `
        <h3>${potion.nom}</h3>
        <img src="${potion.image}" alt="${potion.nom}" width="100">
        <p>${potion.description}</p>
    `;
    
    potionsList.appendChild(li);
}

