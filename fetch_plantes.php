<?php
require 'ConnecxionBDD.php'; // Assure-toi que le fichier connexion BDD est correct

header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

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

echo json_encode($plantes, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
