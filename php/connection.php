<?php
$host = 'localhost';
$database = 'taganroa_db';
$username = 'taganroa_root';
$password = '95#TIeR#ofPVkm$@To6bx*U!9RNvJ&';

try {
    $link = new PDO("mysql:host=$host;dbname=$database", $username, $password);
    $link->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $link->exec('SET NAMES "utf8"');
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
