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

// Appeler la fonction pour afficher les plantes au chargement de la page
document.addEventListener('DOMContentLoaded', loadPlants);

// Ajouter un événement au formulaire pour l'ajout d'une plante
document.getElementById('add-plant-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const imageUrl = document.getElementById('image_url').value;
  const care = document.getElementById('care').value;
  
  addPlant(name, description, imageUrl, care);
});


