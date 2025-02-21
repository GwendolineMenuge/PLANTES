// Connexion à Supabase
const supabaseUrl = "https://pjmobokqnprbocvuiqmc.supabase.co"; // Remplace par ton URL Supabase
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqbW9ib2txbnByYm9jdnVpcW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNzYyMDYsImV4cCI6MjA1NTc1MjIwNn0.uwiTLtBP00-v2Ce-MStb3dajDvfUxSeMufwilMg7kP8"; // Remplace par ta clé publique (anon)
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Fonction pour afficher l'onglet actif
function showTab(tabId) {
    tabContents.forEach(tab => {
        tab.style.display = 'none';  // Cache tous les onglets
    });

    const activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.style.display = 'block';  // Affiche l'onglet actif
    }
}

// Ajouter un événement sur chaque bouton pour changer d'onglet
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        showTab(tabId);  // Affiche l'onglet correspondant
    });
});

// Par défaut, afficher le premier onglet (plantes)
document.addEventListener('DOMContentLoaded', () => {
    showTab('plantes');
});

// Gestion de l'ajout de plante avec image
document.getElementById('planteForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nom = document.getElementById('planteNom').value;
    const description = document.getElementById('planteDesc').value;
    const imageFile = document.getElementById('planteImage').files[0];

    // Télécharger l'image dans Supabase Storage
    const { data, error: uploadError } = await supabase.storage
        .from('plantes-images')  // Le nom du "bucket" d'images dans Supabase
        .upload('plantes/' + imageFile.name, imageFile);

    if (uploadError) {
        console.error('Erreur de téléchargement de l\'image:', uploadError);
        return;
    }

    // Obtenir l'URL de l'image téléchargée
    const imageUrl = data.path;

    // Ajouter les données de la plante dans la base de données
    const { data: insertedData, error: insertError } = await supabase
        .from('plantes')
        .insert([
            { nom, description, image_url: imageUrl }
        ]);

    if (insertError) {
        console.error('Erreur d\'insertion dans la base de données:', insertError);
    } else {
        console.log('Plante ajoutée avec succès:', insertedData);
        afficherPlantes(); // Rafraîchir la liste des plantes après ajout
    }
});

// Afficher les plantes
async function afficherPlantes() {
    const { data: plantes, error } = await supabase
        .from('plantes')
        .select('*')
        .order('nom', { ascending: true }); // Tri par nom

    if (error) {
        console.error('Erreur lors de la récupération des plantes:', error);
        return;
    }

    const plantesList = document.getElementById('plantes-list');
    plantesList.innerHTML = ''; // Réinitialiser la liste

    plantes.forEach(plante => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${plante.nom}</h3>
            <img src="https://your-project-url.supabase.co

