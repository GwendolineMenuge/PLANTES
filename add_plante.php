<?php
header('Content-Type: application/json');
require 'ConnecxionBDD.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Vérifier si les données sont bien envoyées
    if (!isset($_POST['planteNom'], $_POST['planteDesc'], $_POST['planteUtilis'])) {
        echo json_encode(["success" => false, "message" => "Données manquantes"]);
        exit;
    }

    // Récupérer les données du formulaire
    $nom = trim($_POST['planteNom']);
    $description = trim($_POST['planteDesc']);
    $effet = trim($_POST['planteUtilis']);
    $imageUrl = ''; // Initialisation de la variable imageUrl

    // Vérification basique de la validité des données
    if (empty($nom) || empty($description) || empty($effet)) {
        echo json_encode(["success" => false, "message" => "Tous les champs doivent être remplis"]);
        exit;
    }

    // Vérifier l'upload d'image
    if (!empty($_FILES['planteImage']['name'])) {
        $targetDir = "uploads/"; // Dossier où les images seront stockées
        if (!is_dir($targetDir)) {
            mkdir($targetDir, 0777, true); // Créer le dossier si il n'existe pas
        }

        // Récupérer le nom du fichier et son chemin
        $fileName = basename($_FILES["planteImage"]["name"]);
        $targetFilePath = $targetDir . $fileName;

        // Vérifier l'extension du fichier (ex: .jpg, .png)
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        if (!in_array($fileExtension, $allowedExtensions)) {
            echo json_encode(["success" => false, "message" => "Extension de fichier non autorisée"]);
            exit;
        }

        // Vérifier la taille du fichier (ex : maximum 5 Mo)
        if ($_FILES["planteImage"]["size"] > 5 * 1024 * 1024) { 
            echo json_encode(["success" => false, "message" => "Le fichier est trop lourd. La taille maximale est de 5 Mo."]);
            exit;
        }

        // Vérifier si le fichier est bien téléchargé
        if (move_uploaded_file($_FILES["planteImage"]["tmp_name"], $targetFilePath)) {
            $imageUrl = $targetFilePath; // Attribuer le chemin de l'image téléchargée
        } else {
            echo json_encode(["success" => false, "message" => "Erreur lors de l'upload de l'image"]);
            exit;
        }
    }

    // Préparer la requête pour insérer les données dans la base de données
    $stmt = $conn->prepare("INSERT INTO plantes (nom, description, effet, image_url) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nom, $description, $effet, $imageUrl);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Plante ajoutée avec succès"]);
    } else {
        echo json_encode(["success" => false, "message" => "Erreur lors de l'ajout de la plante"]);
    }

    // Fermer la déclaration et la connexion
    $stmt->close();
    $conn->close();
}
?>
