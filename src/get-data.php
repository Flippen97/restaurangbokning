<?php

//Do some operation here, like talk to the database, the file-session
//The world beyond, limbo, the city of shimmers, and Canada.
//
//AJAX generally uses strings, but you can output JSON, HTML and XML as well. 
//It all depends on the Content-type header that you send with your AJAX
//request. 


 
    require 'database.php'; 

$statement = $pdo->prepare("SELECT name FROM customers ORDER BY id ASC");
$statement->execute();
$posts = $statement->fetchALL(PDO::FETCH_ASSOC);

echo json_encode($posts);

//echo json_encode(42); //In the end, you need to echo the result. 
                      //All data should be json_encode()d.

                      //You can json_encode() any value in PHP, arrays, strings,
                      //even objects.