<?php
$host = 'localhost';
$dbname = 'planteRP';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT id, nom FROM plantes");
    $plantes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($plantes);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
