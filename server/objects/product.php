<?php
class Product{
 
    // database connection and table name
    private $conn;
//    private $table_name = "products";
    private $table_name = "customers";
 
    // object properties
//    public $id;
//    public $name;
//    public $description;
//    public $price;
//    public $category_id;
//    public $category_name;
//    public $created;
    public $id;
    public $name;
    public $email;
    public $telephone;
//    public $date;
//    public $time;
    
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
    
    // read products
    function read(){
        
        $query = "SELECT * FROM bookings JOIN customers WHERE bookings.customerId = customers.id";
        
//        $query = "
//        SELECT 
//            customers.id as id,
//            customers.name as name,
//            customers.email as email,
//            customers.telephone as telephone,
//            bookings.date as date,
//            bookings.time as time
//        FROM bookings 
//            JOIN customers WHERE bookings.customerId = customers.id";

        // select all query
//        $query = "SELECT
//                    c.name as category_name, p.id, p.name, p.description, p.price, p.category_id, p.created
//                FROM
//                    " . $this->table_name . " p
//                    LEFT JOIN
//                        categories c
//                            ON p.category_id = c.id
//                ORDER BY
//                    p.created DESC";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }
    
    // create product
    function create(){

        // query to insert record
        
       $query = "INSERT INTO
                    customers
                SET
                    name=:name, email=:email, telephone=:telephone";
        
//        $query = "INSERT INTO
//                    " . $this->table_name . "
//                SET
//                    name=:name, price=:price, description=:description, category_id=:category_id, created=:created";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->telephone=htmlspecialchars(strip_tags($this->telephone));

        
//        $this->name=htmlspecialchars(strip_tags($this->name));
//        $this->price=htmlspecialchars(strip_tags($this->price));
//        $this->description=htmlspecialchars(strip_tags($this->description));
//        $this->category_id=htmlspecialchars(strip_tags($this->category_id));
//        $this->created=htmlspecialchars(strip_tags($this->created));

        // bind values
        
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":telephone", $this->telephone);
        
//        $stmt->bindParam(":name", $this->name);
//        $stmt->bindParam(":price", $this->price);
//        $stmt->bindParam(":description", $this->description);
//        $stmt->bindParam(":category_id", $this->category_id);
//        $stmt->bindParam(":created", $this->created);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }
}