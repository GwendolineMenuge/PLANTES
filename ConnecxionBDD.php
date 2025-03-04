<?php
$servername = "localhost";
$username = "root"; // Remplace par ton identifiant MySQL
$password = ""; // Remplace par ton mot de passe MySQL
$dbname = "recensement"; // Remplace par ton nom de base de données

// Activer les rapports d'erreurs pour débogage (uniquement en développement)
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    // Créer la connexion
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Vérifier si la connexion est réussie
    if ($conn->connect_error) {
        throw new Exception("Connexion échouée: " . $conn->connect_error);
    }
    echo "Connexion réussie"; 
} catch (Exception $e) {
    // Affichage d'un message d'erreur générique
    echo "Erreur de connexion à la base de données.";
    // Enregistrer l'erreur dans un fichier log (environnement de production)
    error_log($e->getMessage(), 3, '/var/log/php_errors.log');
}
?>
