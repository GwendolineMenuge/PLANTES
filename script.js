// Initialisation de Supabase
const SUPABASE_URL = 'https://pjmobokqnprbocvuiqmc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqbW9ib2txbnByYm9jdnVpcW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxNzYyMDYsImV4cCI6MjA1NTc1MjIwNn0.uwiTLtBP00-v2Ce-MStb3dajDvfUxSeMufwilMg7kP8';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fonction pour récupérer et afficher les plantes
async function fetchPlantes() {
    const { data, error } = await supabase.from('plantes').select('*').order('nom', { ascending: true });
    if (error) {
        console.error('Erreur lors de la récupération des plantes :', error);
        return;
    }
    
    const plantesList = document.getElementById("plantes-list");
    plantesList.innerHTML = ""; // Réinitialiser la liste

    data.forEach(plante => {
        const li = document.createElement("li");
        li.innerHTML = `
            <h3>${plante.nom}</h3>
            <img src="${plante.image_url}" alt="${plante.nom}" width="100">
            <p>${plante.description}</p>
        `;
        plantesList.appendChild(li);
    });
}

// Fonction pour ajouter une plante
async function addPlante(nom, description, imageUrl) {
    const { error } = await supabase.from('plantes').insert([
        { nom, description, image_url: imageUrl }
    ]);
    if (error) {
        console.error('Erreur lors de l\'ajout de la plante :', error);
        return;
    }
    fetchPlantes(); // Mettre à jour la liste après l'ajout
}

// Gestion du formulaire d'ajout de plante
document.getElementById("planteForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const nomPlante = document.getElementById("planteNom").value;
    const descriptionPlante = document.getElementById("planteDesc").value;
    const imagePlante = document.getElementById("planteImage").files[0];
    
    if (!imagePlante) {
        alert("Veuillez ajouter une image.");
        return;
    }
    
    // Upload de l'image sur Supabase Storage
    const { data, error } = await supabase.storage.from('images').upload(`plantes/${imagePlante.name}`, imagePlante);
    if (error) {
        console.error('Erreur lors de l\'upload de l\'image :', error);
        return;
    }
    
    const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/images/${data.path}`;
    addPlante(nomPlante, descriptionPlante, imageUrl);
    document.getElementById("planteForm").reset();
});

// Fonction pour changer de section (activer/désactiver les boutons et sections)
function showTab(tabName) {
    const sections = document.querySelectorAll('.tab-content');
    const buttons = document.querySelectorAll('.tab-btn');

    // Masquer toutes les sections
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Désactiver tous les boutons
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Afficher la section active et activer le bouton correspondant
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
    // Afficher la section par défaut (par exemple "plantes")
    showTab('plantes');
});
