<?php
require 'ConnecxionBDD'; // Fichier pour la connexion à la BDD

$sql = "SELECT * FROM Plante ORDER BY nom ASC";
$result = $conn->query($sql);

$plantes = [];
while ($row = $result->fetch_assoc()) {
    $plantes[] = $row;
}

echo json_encode($plantes);
?>
