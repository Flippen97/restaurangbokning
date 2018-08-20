<?php
class Product{
 
    // database connection and table name
    private $conn;
//    private $table_name = "customers";
 
    // object properties
//    public $id;
    public $name;
    public $email;
    public $telephone;
    public $bdate;
    public $btime;
    
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
    
    
    
    //********* read products ********//
    function read(){
        
        $query = "SELECT * FROM bookings JOIN customers WHERE bookings.customerId = customers.id";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }
    
 
    
    //********* create product ********//
    function create(){
        
        // query to insert record
        $query = "INSERT INTO customers (name, email, telephone)
                    VALUES (:name, :email, :telephone);
                INSERT INTO bookings (bdate, btime, customerId)
                    VALUES (:bdate, :btime, LAST_INSERT_ID())";
        
        // prepare query
        $stmt = $this->conn->prepare($query);
        
        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->telephone=htmlspecialchars(strip_tags($this->telephone));
        $this->bdate=htmlspecialchars(strip_tags($this->bdate));
        $this->btime=htmlspecialchars(strip_tags($this->btime));
        
        // bind values
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":telephone", $this->telephone);
        $stmt->bindParam(":bdate", $this->bdate);
        $stmt->bindParam(":btime", $this->btime);
        
        // execute query
        if($stmt->execute()){
            return true;
        }
        return false;
    }
    
    
 
    
    //********* used when filling up the update product form ********//
    /* Might need adjustments..?.... */
    function readOne(){

        // query to read single record
        $query = "
        SELECT 
            customers.id as id,
            customers.name as name,
            customers.email as email,
            customers.telephone as telephone,
            bookings.bdate as bdate,
            bookings.btime as btime
        FROM bookings 
            JOIN customers WHERE bookings.customerId = customers.id";

        // prepare query statement
        $stmt = $this->conn->prepare( $query );

        // bind id of product to be updated
        $stmt->bindParam(1, $this->id);

        // execute query
        $stmt->execute();

        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // set values to object properties
        $this->name = $row['name'];
        $this->email = $row['email'];
        $this->telephone = $row['telephone'];
        $this->bdate = $row['bdate'];
        $this->btime = $row['btime'];
        
    }
    
    
    //********* update the product ********//
    /* Work in progress here.... */
    function update(){

        // update query
        $query = "UPDATE
                    customers, bookings
                SET
                    customers.name = :name,
                    customers.email = :email,
                    customers.telephone = :telephone,
                    bookings.bdate = :bdate,
                    bookings.btime = :btime,
                WHERE
                    customers.id = :id";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->telephone=htmlspecialchars(strip_tags($this->telephone));
        $this->bdate=htmlspecialchars(strip_tags($this->bdate));
        $this->btime=htmlspecialchars(strip_tags($this->btime));

        // bind new values
        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':telephone', $this->telephone);
        $stmt->bindParam(':bdate', $this->bdate);
        $stmt->bindParam(':btime', $this->btime);

        // execute the query
        if($stmt->execute()){
            return true;
        }

        return false;
    }
    
    
    
    //********* delete the product ********//
    /* Work in progress here.... */
    function delete(){

        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));

        // bind id of record to delete
        $stmt->bindParam(1, $this->id);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }
    
}