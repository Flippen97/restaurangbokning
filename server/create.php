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
      ":bdate"     => $array["bdate"],
      ":btime"     => $array["btime"],
      ":numberOfGuests" => $array["numberOfGuests"]
    ));

    $data = $statement->fetchAll(PDO::FETCH_ASSOC);

    /* Sending conformation email */
    /* 
    $msg = "Tack för din bokning.";
    // use wordwrap() if lines are longer than 70 characters
    $msg = wordwrap($msg,70);
    mail($array["email"],"Tack för din bokning.",$msg); 
    */

    echo json_encode($data, JSON_PRETTY_PRINT);
?>