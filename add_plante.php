<?php
header('Content-Type: application/json');
require 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Vérifier si les données sont bien envoyées
    if (!isset($_POST['planteNom'], $_POST['planteDesc'], $_POST['planteUtilis'])) {
        echo json_encode(["success" => false, "message" => "Données manquantes"]);
        exit;
    }

    $nom = $_POST['planteNom'];
    $description = $_POST['planteDesc'];
    $effet = $_POST['planteUtilis'];
    $imageUrl = '';

    // Vérifier l'upload d'image
    if (!empty($_FILES['planteImage']['name'])) {
        $targetDir = "uploads/";
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true);
        }

        $fileName = basename($_FILES["planteImage"]["name"]);
        $targetFilePath = $targetDir . $fileName;

        if (move_uploaded_file($_FILES["planteImage"]["tmp_name"], $targetFilePath)) {
            $imageUrl = $targetFilePath;
        } else {
            echo json_encode(["success" => false, "message" => "Erreur lors de l'upload de l'image"]);
            exit;
        }
    }

    // Correction : 4 colonnes -> 4 valeurs dans le `bind_param`
    $stmt = $conn->prepare("INSERT INTO plantes (nom, description, effet, image_url) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nom, $description, $effet, $imageUrl);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Erreur lors de l'insertion : " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
}
?>
