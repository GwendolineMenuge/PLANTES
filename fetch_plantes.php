<?php
require 'ConnecxionBDD.php'; // Assure-toi que le nom du fichier est correct

// Définir le bon type de réponse
header('Content-Type: application/json');

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

// Vérifie si la réponse est bien un JSON
echo json_encode($plantes, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
