<?php
    /* This file fetches info about customer searching on it's unique telephone number. */

    include_once 'database.php';

    $array = json_decode(file_get_contents('php://input'), TRUE);

    $statement = $pdo->prepare("SELECT * FROM customers WHERE customers.telephone = :telephone");

    $statement->execute(array(
      ":telephone" => $array["telephone"]
    ));

    $data = $statement->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($data, JSON_PRETTY_PRINT);

?>