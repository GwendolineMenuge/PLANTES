// Configuration de Supabase
const supabaseUrl = 'https://pjmobokqnprbocvuiqmc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqbW9ib2txbnByYm9jdnVpcW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNzYyMDYsImV4cCI6MjA1NTc1MjIwNn0.uwiTLtBP00-v2Ce-MStb3dajDvfUxSeMufwilMg7kP8';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Sélection des éléments HTML
const plantsSection = document.getElementById("plants-section");
const potionsSection = document.getElementById("potions-section");
const addPlantSection = document.getElementById("add-plant-section");
const addPotionSection = document.getElementById("add-potion-section");
const plantsList = document.getElementById("plants-list");
const potionsList = document.getElementById("potions-list");

// Fonction pour récupérer les plantes depuis Supabase
async function getPlants() {
    const { data, error } = await supabase
        .from('plants')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Erreur lors de la récupération des plantes:', error);
        return;
    }

    plantsList.innerHTML = '';
    data.forEach(plant => {
        const plantElement = document.createElement('div');
        plantElement.classList.add('plant-item');
        plantElement.innerHTML = `
            <h3 style="text-align: center;">${plant.name}</h3>
            <img src="${plant.image_url}" alt="${plant.name}">
            <p style="text-align: justify;">${plant.description}</p>
            <p><strong>Soins :</strong> ${plant.care}</p>
        `;
        plantsList.appendChild(plantElement);
    });
}

// Fonction pour ajouter une plante dans Supabase
async function addPlant(event) {
    event.preventDefault();

    const name = document.getElementById("plant-name").value;
    const description = document.getElementById("plant-description").value;
    const imageUrl = document.getElementById("plant-image-url").value;
    const care = document.getElementById("plant-care").value;

    const { data, error } = await supabase
        .from('plants')
        .insert([
            { name, description, image_url: imageUrl, care }
        ]);

    if (error) {
        console.error('Erreur lors de l\'ajout de la plante:', error);
    } else {
        console.log('Plante ajoutée:', data);
        getPlants(); // Rafraîchir la liste des plantes
    }
}

// Fonction pour récupérer les potions depuis Supabase
async function getPotions() {
    const { data, error } = await supabase
        .from('potions')
        .select('*');

    if (error) {
        console.error('Erreur lors de la récupération des potions:', error);
        return;
    }

    potionsList.innerHTML = '';
    data.forEach(potion => {
        const potionElement = document.createElement('div');
        potionElement.classList.add('potion-item');
        potionElement.innerHTML = `
            <h3>${potion.name}</h3>
            <p><strong>Ingrédients :</strong> ${potion.ingredients}</p>
            <p><strong>Description :</strong> ${potion.description}</p>
        `;
        potionsList.appendChild(potionElement);
    });
}

// Fonction pour ajouter une potion dans Supabase
async function addPotion(event) {
    event.preventDefault();

    const name = document.getElementById("potion-name").value;
    const ingredients = document.getElementById("potion-ingredients").value;
    const description = document.getElementById("potion-description").value;

    const { data, error } = await supabase
        .from('potions')
        .insert([
            { name, ingredients, description }
        ]);

    if (error) {
        console.error('Erreur lors de l\'ajout de la potion:', error);
    } else {
        console.log('Potion ajoutée:', data);
        getPotions(); // Rafraîchir la liste des potions
    }
}

// Gestion des onglets
document.getElementById("show-plants").addEventListener("click", () => {
    plantsSection.style.display = 'block';
    potionsSection.style.display = 'none';
    addPlantSection.style.display = 'none';
    addPotionSection.style.display = 'none';
    getPlants();
});

document.getElementById("show-potions").addEventListener("click", () => {
    plantsSection.style.display = 'none';
    potionsSection.style.display = 'block';
    addPlantSection.style.display = 'none';
    addPotionSection.style.display = 'none';
    getPotions();
});

document.getElementById("add-plant").addEventListener("click", () => {
    plantsSection.style.display = 'none';
    potionsSection.style.display = 'none';
    addPlantSection.style.display = 'block';
    addPotionSection.style.display = 'none';
});

document.getElementById("add-potion").addEventListener("click", () => {
    plantsSection.style.display = 'none';
    potionsSection.style.display = 'none';
    addPlantSection.style.display = 'none';
    addPotionSection.style.display = 'block';
});

// Initialiser les événements de formulaire
document.getElementById("add-plant-form").addEventListener("submit", addPlant);
document.getElementById("add-potion-form").addEventListener("submit", addPotion);

