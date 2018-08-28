<?php

    include_once 'database.php';

    /* Takes a JSON encoded string and converts it into a PHP variable. TRUE makes it into an associative array. */
    $array = json_decode(file_get_contents('php://input'), TRUE);

    $statement = $pdo->prepare(
      "UPDATE customers SET name = :name, email = :email, telephone = :telephone WHERE id = :id;
        UPDATE bookings SET bdate = :bdate, btime = :btime WHERE customerId = :id"
    );

    $statement->execute(array(
      ":id"        => $array["id"],
      ":name"      => $array["name"],
      ":email"     => $array["email"],
      ":telephone" => $array["telephone"],
      ":bdate"     => $array["bdate"],
      ":btime"     => $array["btime"],
    ));

?>