<?php
require 'ConnecxionBDD.php'; // Assure-toi que le fichier connexion BDD est correct

header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Vérifier si la connexion à la base de données est réussie
if (!$conn) {
    echo json_encode(["success" => false, "message" => "Échec de la connexion à la base de données"]);
    exit;
}

$sql = "SELECT * FROM plantes ORDER BY nom ASC";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["success" => false, "message" => "Erreur SQL : " . $conn->error]);
    exit;
}

$plantes = [];
while ($row = $result->fetch_assoc()) {
    $plantes[] = $row;
}

// Renvoie les données sous forme de JSON, avec une belle mise en forme et les caractères spéciaux non échappés
echo json_encode($plantes, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
