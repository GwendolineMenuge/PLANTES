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
        const tabContent = document.getElementById(tab.getAttribute('data-tab'));
        tabContent.classList.add('active');
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

// Fonction d'affichage des plantes
function afficherPlantes(plantes) {
    const plantesList = document.getElementById('plantes-list');
    plantesList.innerHTML = ''; // Vide la liste existante
    const plantesTriees = trierListeParNom(plantes);  // Trie la liste des plantes

    plantesTriees.forEach(plante => {
        const li = document.createElement('li');
        li.textContent = `${plante.nom} - ${plante.description}`;
        plantesList.appendChild(li);
    });
}

// Fonction d'affichage des potions
function afficherPotions(potions) {
    const potionsList = document.getElementById('potions-list');
    potionsList.innerHTML = ''; // Vide la liste existante
    const potionsTriees = trierListeParNom(potions); // Trie la liste des potions

    potionsTriees.forEach(potion => {
        const li = document.createElement('li');
        li.textContent = `${potion.nom} - ${potion.description}`;
        potionsList.appendChild(li);
    });
}

// Fonction d'ajout de plante via le formulaire
document.getElementById('planteForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Empêche le rafraîchissement de la page

    const planteNom = document.getElementById('planteNom').value;
    const planteDesc = document.getElementById('planteDesc').value;

    const plante = { nom: planteNom, description: planteDesc };
    
    // Ajouter la plante à la liste (sans base de données pour l'instant)
    plantes.push(plante);
    
    // Rafraîchir l'affichage après ajout
    afficherPlantes(plantes);

    // Réinitialiser le formulaire
    event.target.reset();
});

// Fonction d'ajout de potion via le formulaire
document.getElementById('potionForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Empêche le rafraîchissement de la page

    const potionNom = document.getElementById('potionNom').value;
    const potionDesc = document.getElementById('potionDesc').value;

    const potion = { nom: potionNom, description: potionDesc };
    
    // Ajouter la potion à la liste (sans base de données pour l'instant)
    potions.push(potion);
    
    // Rafraîchir l'affichage après ajout
    afficherPotions(potions);

    // Réinitialiser le formulaire
    event.target.reset();
});

// Liste vide de plantes et potions (simulation de base de données)
let plantes = [];
let potions = [];

// Affichage initial (si tu veux commencer avec des plantes et potions prédéfinies)
afficherPlantes(plantes);
afficherPotions(potions);
