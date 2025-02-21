// Connexion à Supabase
const supabaseUrl = "https://pjmobokqnprbocvuiqmc.supabase.co"; // Remplace par ton URL Supabase
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqbW9ib2txbnByYm9jdnVpcW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNzYyMDYsImV4cCI6MjA1NTc1MjIwNn0.uwiTLtBP00-v2Ce-MStb3dajDvfUxSeMufwilMg7kP8"; // Remplace par ta clé publique (anon)
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Sélectionner tous les boutons d'onglet et les contenus associés
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Fonction pour afficher un onglet en fonction de l'id
function showTab(tabId) {
    tabContents.forEach(tab => {
        tab.style.display = 'none';  // Cacher tous les onglets
    });

    const activeTab = document.getElementById(tabId);
    if (activeTab) {
        activeTab.style.display = 'block';  // Afficher l'onglet actif
    }
}

// Ajouter un événement de clic pour chaque bouton d'onglet
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        showTab(tabId);  // Affiche l'onglet correspondant
    });
});

// Afficher l'onglet par défaut au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    showTab('plantes');  // Affiche la section des plantes au départ
});

// Gestion de l'ajout de plante
document.getElementById('planteForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nom = document.getElementById('planteNom').value;
    const description = document.getElementById('planteDesc').value;
    const imageFile = document.getElementById('planteImage').files[0];

    if (!imageFile) {
        alert("Il faut télécharger une image !");
        return;
    }

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

    // Ajouter la plante dans la base de données
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
    plantesList.innerHTML = ''; // Réinitialiser la liste des plantes

    plantes.forEach(plante => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${plante.nom}</h3>
            <img src="https://your-project-url.supabase.co/storage/v1/object/public/plantes-images/${plante.image_url}" alt="${plante.nom}" width="200">
            <p>${plante.description}</p>
        `;
        plantesList.appendChild(li);
    });
}

// Initialisation de la liste des plantes au chargement de la page
document.addEventListener('DOMContentLoaded', afficherPlantes);


