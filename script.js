// Configuration de Supabase
const supabaseUrl = 'https://pjmobokqnprbocvuiqmc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqbW9ib2txbnByYm9jdnVpcW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNzYyMDYsImV4cCI6MjA1NTc1MjIwNn0.uwiTLtBP00-v2Ce-MStb3dajDvfUxSeMufwilMg7kP8';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Ajouter une plante
async function addPlant(name, description, imageUrl, care) {
    const { data, error } = await supabase
        .from('plants')
        .insert([
            { name, description, image_url: imageUrl, care }
        ]);
    if (error) {
        console.error('Erreur lors de l\'ajout de la plante :', error);
    } else {
        console.log('Plante ajoutée:', data);
        loadPlants();  // Recharge les plantes après ajout
    }
}

// Ajouter une potion
async function addPotion(name, description, ingredients) {
    const { data, error } = await supabase
        .from('potions')
        .insert([
            { name, description, ingredients }
        ]);
    if (error) {
        console.error('Erreur lors de l\'ajout de la potion :', error);
    } else {
        console.log('Potion ajoutée:', data);
        loadPotions();  // Recharge les potions après ajout
    }
}

// Récupérer toutes les plantes
async function loadPlants() {
    const { data, error } = await supabase
        .from('plants')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Erreur lors du chargement des plantes :', error);
    } else {
        const plantList = document.getElementById('plant-list');
        plantList.innerHTML = ''; // Vide la liste avant de la remplir
        data.forEach(plant => {
            const plantElement = document.createElement('div');
            plantElement.className = 'plant-item';
            plantElement.innerHTML = `
                <h3>${plant.name}</h3>
                <p>${plant.description}</p>
                <img src="${plant.image_url}" alt="${plant.name}">
                <p>${plant.care}</p>
            `;
            plantList.appendChild(plantElement);
        });
    }
}

// Récupérer toutes les potions
async function loadPotions() {
    const { data, error } = await supabase
        .from('potions')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Erreur lors du chargement des potions :', error);
    } else {
        const potionList = document.getElementById('potion-list');
        potionList.innerHTML = ''; // Vide la liste avant de la remplir
        data.forEach(potion => {
            const potionElement = document.createElement('div');
            potionElement.className = 'potion-item';
            potionElement.innerHTML = `
                <h3>${potion.name}</h3>
                <p>${potion.description}</p>
                <p><strong>Ingrédients:</strong> ${potion.ingredients}</p>
            `;
            potionList.appendChild(potionElement);
        });
    }
}

// Fonction pour ouvrir un onglet spécifique
function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName("tablink");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Appeler la fonction pour afficher les plantes et potions au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    loadPlants();
    loadPotions();
});

// Ajouter un événement au formulaire pour l'ajout d'une plante
document.getElementById('add-plant-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const imageUrl = document.getElementById('image_url').value;
    const care = document.getElementById('care').value;

    addPlant(name, description, imageUrl, care);
});

// Ajouter un événement au formulaire pour l'ajout d'une potion
document.getElementById('add-potion-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('potion-name').value;
    const description = document.getElementById('potion-description').value;
    const ingredients = document.getElementById('potion-ingredients').value;

    addPotion(name, description, ingredients);
});



