<?php

    include_once 'database.php';

    $statement = $pdo->prepare("SELECT * FROM bookings JOIN customers WHERE bookings.customerId = customers.id");

    $statement->execute();

    $data = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data, JSON_PRETTY_PRINT);

?>