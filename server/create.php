<?php

    include_once 'database.php';

    /* json_decode takes the JSON encoded string and converts it into a PHP variable. 
     * TRUE makes it into an associative array (an array with named keys.)*/
    $array = json_decode(file_get_contents('php://input'), TRUE);
    
    $statement = $pdo->prepare(
      "INSERT INTO customers (name, email, telephone)
        VALUES (:name, :email, :telephone);
        INSERT INTO bookings (bdate, btime, numberOfGuests, customerId)
        VALUES (:bdate, :btime, :numberOfGuests, LAST_INSERT_ID())"
    );

    $statement->execute(array(
      ":name"      => $array["name"],
      ":email"     => $array["email"],
      ":telephone" => $array["telephone"],
      ":numberOfGuests" => $array["numberOfGuests"],
      ":bdate"     => $array["bdate"],
      ":btime"     => $array["btime"]
    ));

?>