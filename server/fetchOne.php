<?php

include_once 'database.php';

    $array = json_decode(file_get_contents('php://input'), TRUE);
 
    $statement = $pdo->prepare("
            SELECT * FROM customers
            LEFT JOIN bookings
            ON customers.id = bookings.customerId
            WHERE
            bookings.bid LIKE :bid
        ");

    $statement->execute(array(":bid" => $array["bid"]));

    $data = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data, JSON_PRETTY_PRINT);
?>