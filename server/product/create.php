<?php
// Works for posting empty rows:
                // required headers
                header("Access-Control-Allow-Origin: *");
                header("Content-Type: application/json; charset=UTF-8");
                header("Access-Control-Allow-Methods: POST");
                header("Access-Control-Max-Age: 3600");
                header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

                // get database connection
                include_once '../config/database.php';

                // instantiate product object
                include_once '../objects/product.php';

                $database = new Database();
                $db = $database->getConnection();

                $product = new Product($db);

                // get posted data
                $data = json_decode(file_get_contents("php://input"));

                // set product property values
                $product->name = $data->name;
                $product->email = $data->email;
                $product->telephone = $data->telephone;
                //$product->bdate = $data->bdate;
                //$product->btime = $data->btime;

                // create the product
                if($product->create()){
                    echo '{';
                        echo '"message": "Product was created."';
                    echo '}';
                }

                // if unable to create the product, tell the user
                else{
                    echo '{';
                        echo '"message": "Unable to create product."';
                    echo '}';
                }



//require_once('../config/database.php');
//
////$post = json_decode(file_get_contents('php://input'));
////$array = json_decode(json_encode($post), True);
//
////if(isset($_GET)){
//   $name = $_GET['name'];
//   $email = $_GET['email'];
//    $telephone = $_GET['telephone'];
//
//$statement = $pdo->prepare(
//  "INSERT INTO customers (name, email, telephone)
//  VALUES (:name, :email, :telephone)"
//  );
//$statement->execute(array(
//  ":name"     => $array["name"],
//  ":email"     => $array["email"],
//  ":telephone"    => $array["telephone"]
//));
//
///* The ID of the SQL-row is inserted into the associative array. */
////$id = $pdo->lastInsertId();
////$array['bookingID'] = $id;
//

//echo json_encode($array);

?>