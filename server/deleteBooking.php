<?php

    include_once 'database.php';

    /* Takes a JSON encoded string and converts it into a PHP variable. TRUE makes it into an associative array. */
    $array = json_decode(file_get_contents('php://input'), TRUE);

    $statement = $pdo->prepare("DELETE FROM bookings WHERE bid = :bid");

    $statement->execute(array(":bid" => $array["bid"]));

    $data = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data, JSON_PRETTY_PRINT);

?>