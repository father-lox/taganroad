<?php
require_once $_SERVER['DOCUMENT_ROOT'] . '/php/connection.php';

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $id_transport = $_GET['id_transport'];

    $sql = "SELECT `longitude`, `latitude` FROM `transport` WHERE `id_transport` = $id_transport";

    try {
        $result = $link->query($sql);
        $result = $result->fetch(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } catch (PDOException $e) {
        echo json_encode(1);
    }
}
