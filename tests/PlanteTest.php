<?php
use PHPUnit\Framework\TestCase;

class PlanteTest extends TestCase
{
    protected $pdo;

    protected function setUp(): void
    {
        $this->pdo = new PDO('mysql:host=127.0.0.1;dbname=test_db', 'root', 'root');
    }

    public function testAjoutPlante()
    {
        $stmt = $this->pdo->prepare("INSERT INTO plantes (nom, description, effet, image_url) VALUES (?, ?, ?, ?)");
        $stmt->execute(['Mandragore', 'Plante magique', 'Effet calmant', 'uploads/mandragore.jpg']);

        $result = $this->pdo->query("SELECT * FROM plantes WHERE nom = 'Mandragore'")->fetch();
        $this->assertNotEmpty($result);
    }
}
