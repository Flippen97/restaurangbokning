<?php
    /* This file fetches current bookings and customer info. Customers who do not have a booking is not included. */

    include_once 'database.php';

    $statement = $pdo->prepare("SELECT * FROM bookings JOIN customers WHERE bookings.customerId = customers.id ORDER BY bookings.bid ASC");

    $statement->execute();

    $data = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data, JSON_PRETTY_PRINT);

?>