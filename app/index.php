<?php
require_once 'headers.php';
require_once 'Classes/PDOFactory.php';
require_once 'Classes/Films.php';

$pdo = (new PDOFactory())->getPdo();

$query = $pdo->query('SELECT * FROM Films ORDER BY `date` DESC');
$query->setFetchMode(PDO::FETCH_ASSOC);

$res = [];

foreach ($query->fetchAll() as $films) {
//    var_dump($films);
    $res[] = [
        'id' => $films['id'],
        "date" => $films['date'],
        'title' => $films['title'],
        'content' => $films['content'],
        'author' => $films['authorId']
    ];
}

echo json_encode($res);