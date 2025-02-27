# Recensement des Plantes & Potions

## Description
Ce projet est une application web permettant de recenser des plantes et de créer des potions en utilisant une base de données MySQL. Les utilisateurs peuvent :
- Afficher la liste des plantes enregistrées.
- Ajouter une nouvelle plante avec une image.
- Afficher la liste des potions.
- Créer une potion en sélectionnant des plantes existantes.

## Technologies utilisées
- **Frontend** : HTML, CSS, JavaScript
- **Backend** : PHP
- **Base de données** : MySQL
- **Stockage des images** : Dossier `uploads/` sur le serveur

---

## Base de données
### Table `plantes`
```sql
CREATE TABLE plantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL
);
```
### Table `potions`
```sql
CREATE TABLE potions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);
```
### Table `potion_plante` (relation entre les potions et plantes)
```sql
CREATE TABLE potion_plante (
    id INT AUTO_INCREMENT PRIMARY KEY,
    potion_id INT NOT NULL,
    plante_id INT NOT NULL,
    FOREIGN KEY (potion_id) REFERENCES potions(id) ON DELETE CASCADE,
    FOREIGN KEY (plante_id) REFERENCES plantes(id) ON DELETE CASCADE
);
```

---

## Fonctionnalités
- [x] Ajout et affichage des plantes
- [x] Ajout et affichage des potions
- [x] Sélection dynamique des plantes pour créer une potion
- [x] Gestion des onglets pour une navigation fluide
- [x] Stockage des images sur le serveur

---

## Améliorations possibles
- 🔹 Ajouter une authentification utilisateur
- 🔹 Permettre la modification/suppression des plantes et potions
- 🔹 Ajouter une recherche et des filtres avancés
- 🔹 Implémenter une API REST pour accéder aux données

---

## Auteurs
Développé par **Gwendoline MENUGE**

🌱🌿 Bonne exploration botanique ! 🧪✨

## Badge
[![Netlify Status](https://api.netlify.com/api/v1/badges/5f9ed56d-dce9-4cc2-9c2f-12a6e17ba603/deploy-status)](https://app.netlify.com/sites/recensementplantes/deploys)
