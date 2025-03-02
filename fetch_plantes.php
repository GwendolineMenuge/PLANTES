<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

$plantes = [
    ["id" => 1, "nom" => "Menthe", "description" => "Apaise l’estomac", "image_url" => "https://via.placeholder.com/100"],
    ["id" => 2, "nom" => "Camomille", "description" => "Favorise le sommeil", "image_url" => "https://via.placeholder.com/100"],
    ["id" => 3, "nom" => "Thym", "description" => "Antiseptique naturel", "image_url" => "https://via.placeholder.com/100"]
];

echo json_encode($plantes, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
