<?php

    include_once 'database.php';

    /* json_decode takes the JSON encoded string and converts it into a PHP variable. 
     * TRUE makes it into an associative array (an array with named keys.)*/
    $array = json_decode(file_get_contents('php://input'), TRUE);
    
    $statement = $pdo->prepare(
      "INSERT INTO customers (name, email, telephone)
        VALUES (:name, :email, :telephone);
        INSERT INTO bookings (bdate, btime, customerId)
        VALUES (:bdate, :btime, LAST_INSERT_ID())"
    );

    $statement->execute(array(
      ":name"      => $array["name"],
      ":email"     => $array["email"],
      ":telephone" => $array["telephone"],
      ":bdate"     => $array["bdate"],
      ":btime"     => $array["btime"]
    ));

?>