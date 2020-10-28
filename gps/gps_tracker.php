<?php
require_once $_SERVER['DOCUMENT_ROOT'] . "/php/connection.php";

if ($_SERVER["REQUEST_METHOD"] === "GET") {
    $id_transport = $_GET['id_transport'];
    $longitude = $_GET['longitude'];
    $latitude = $_GET['latitude'];

    $sql = "UPDATE `transport` SET `longitude` = $longitude, `latitude` = $latitude WHERE `id_transport` = $id_transport";
    try {
        $link->exec($sql);
    } catch (PDOException $e) {
        echo "Error: " . $e;
    }
} else if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id_transport = $_POST['id_transport'];
    $longitude = $_POST['longitude'];
    $latitude = $_POST['latitude'];

    $sql = "UPDATE `transport` SET `longitude` = $longitude, `latitude` = $latitude WHERE `id_transport` = $id_transport";
    try {
        $link->exec($sql);
    } catch (PDOException $e) {
        echo "Error: " . $e;
    }
}
