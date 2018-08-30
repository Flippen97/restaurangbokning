<?php
    include_once 'database.php';
    /* json_decode takes the JSON encoded string and converts it into a PHP variable. 
     * TRUE makes it into an associative array (an array with named keys.)*/
    $array = json_decode(file_get_contents('php://input'), TRUE);
    
    $statement = $pdo->prepare(
      "INSERT INTO bookings (bdate, btime, numberOfGuests, customerId)
        VALUES (:bdate, :btime, :numberOfGuests, :customerId)"
    );
    $statement->execute(array(
      ":bdate"     => $array["bdate"],
      ":btime"     => $array["btime"],
      ":numberOfGuests" => $array["numberOfGuests"],
      ":customerId" => $array["customerId"]
    ));
?>