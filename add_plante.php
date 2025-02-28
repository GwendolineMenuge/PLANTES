<?php
require 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = $_POST['planteNom'];
    $description = $_POST['planteDesc'];
    $effet = $_POST['planteUtilis'];
    $imageUrl = '';

    if (!empty($_FILES['planteImage']['name'])) {
        $targetDir = "uploads/";
        $fileName = basename($_FILES["planteImage"]["name"]);
        $targetFilePath = $targetDir . $fileName;

        if (move_uploaded_file($_FILES["planteImage"]["tmp_name"], $targetFilePath)) {
            $imageUrl = $targetFilePath;
        } else {
            echo json_encode(["success" => false, "message" => "Erreur lors de l'upload de l'image"]);
            exit;
        }
    }

    $stmt = $conn->prepare("INSERT INTO Plante (nom, description, effet, image_url) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $nom, $description, $effet, $imageUrl);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Erreur lors de l'insertion"]);
    }

    $stmt->close();
}
?>
