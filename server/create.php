<?php
    include_once 'database.php';

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
    $msg = "Tack för din bokning.";
    $msg = wordwrap($msg,70);
    mail($array["email"],"Food Fusion bokningsbekräftelse",$msg); 

    echo json_encode($data, JSON_PRETTY_PRINT);
?>