<?php
    /* This file fetches all guests and also their booking details, if they have any! */

    include_once 'database.php';

    $statement = $pdo->prepare("SELECT * FROM bookings RIGHT JOIN customers ON bookings.customerId = customers.id");

    $statement->execute();

    $data = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data, JSON_PRETTY_PRINT);

?>