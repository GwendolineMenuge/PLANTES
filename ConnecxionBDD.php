<?php
$servername = "localhost";
$username = "root"; // Remplace par ton identifiant MySQL
$password = ""; // Remplace par ton mot de passe MySQL
$dbname = "recensement"; // Remplace par ton nom de base de données

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connexion échouée: " . $conn->connect_error);
}
?>
