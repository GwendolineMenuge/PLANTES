// Fonction pour basculer les onglets
const tabs = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons et contenus
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Ajouter la classe active au bouton et contenu cliqué
        tab.classList.add('active');
        document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
    });
});

// Fonction de tri par ordre alphabétique
function trierListeParNom(liste) {
    return liste.sort((a, b) => {
        const nomA = a.nom.toLowerCase();
        const nomB = b.nom.toLowerCase();
        if (nomA < nomB) return -1;
        if (nomA > nomB) return 1;
        return 0;
    });
}

// Affichage de la liste des plantes
function afficherPlantes(plantes) {
    const plantesList = document.getElementById('plantes-list');
    plantesList.innerHTML = ''; // Vide la liste existante
    const plantesTriees = trierListeParNom(plantes);
    
    plantesTriees.forEach(plante => {
        const li = document.createElement('li');
        li.textContent = `${plante.nom} - ${plante.description}`;
        plantesList.appendChild(li);
    });
}

// Affichage de la liste des potions
function afficherPotions(potions) {
    const potionsList = document.getElementById('potions-list');
    potionsList.innerHTML = ''; // Vide la liste existante
    const potionsTriees = trierListeParNom(potions);
    
    potionsTriees.forEach(potion => {
        const li = document.createElement('li');
        li.textContent = `${potion.nom} - ${potion.description}`;
        potionsList.appendChild(li);
    });
}

// Gestion du formulaire de plante
document.getElementById('planteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const planteNom = document.getElementById('planteNom').value;
    const planteDesc = document.getElementById('planteDesc').value;

    const plante = { nom: planteNom, description: planteDesc };
    
    // Ajouter la plante dans une liste fictive (simule une base de données)
    plantes.push(plante);
    
    // Rafraîchir l'affichage de la liste
    afficherPlantes(plantes);
    
    // Réinitialiser le formulaire
    event.target.reset();
});

// Gestion du formulaire de potion
document.getElementById('potionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const potionNom = document.getElementById('potionNom').value;
    const potionDesc = document.getElementById('potionDesc').value;

    const potion = { nom: potionNom, description: potionDesc };
    
    // Ajouter la potion dans une liste fictive (simule une base de données)
    potions.push(potion);
    
    // Rafraîchir l'affichage de la liste
    afficherPotions(potions);
    
    // Réinitialiser le formulaire
    event.target.reset();
});

// Liste fictive de plantes et potions (simule une base de données)
const plantes = [
    { nom: "Aloe Vera", description: "Plante médicinale apaisante." },
    { nom: "Menthe", description: "Plante aromatique utilisée pour les tisanes." },
    { nom: "Camomille", description: "Utilisée pour calmer les troubles digestifs." }
];

const potions = [
    { nom: "Potion de guérison", description: "Restaure la santé." },
    { nom: "Elixir de sagesse", description: "Augmente la concentration." },
    { nom: "Potion de rapidité", description: "Permet d'augmenter la vitesse." }
];

// Affichage initial des plantes et potions
afficherPlantes(plantes);
afficherPotions(potions);
