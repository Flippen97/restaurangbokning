<?php
class Product{
 
    // database connection and table name
    private $conn;
//    private $table_name = "customers";
 
    // object properties
    public $id;
    public $name;
    public $email;
    public $telephone;
    public $bid;
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
            bookings.bid as bid,
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
        $this->id = $row['id'];
        $this->name = $row['name'];
        $this->email = $row['email'];
        $this->telephone = $row['telephone'];
        $this->bid = $row['bid'];
        $this->bdate = $row['bdate'];
        $this->btime = $row['btime'];
        
    }
    
    
    //********* update the product ********//
    function update(){

        // update query
        
        $query = "UPDATE customers SET name = :name, email = :email, telephone = :telephone WHERE id = :id;
                UPDATE bookings SET bdate = :bdate, btime = :btime WHERE customerId = :id";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->email=htmlspecialchars(strip_tags($this->email));
        $this->telephone=htmlspecialchars(strip_tags($this->telephone));
        $this->bdate=htmlspecialchars(strip_tags($this->bdate));
        $this->btime=htmlspecialchars(strip_tags($this->btime));

        // bind new values
        $stmt->bindParam(':id', $this->id);
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
    
    /* This function deletes the booking, not the customer */
    function delete(){

        // delete query
        /* this query works just fine! */
        $query = "DELETE FROM bookings WHERE bid = :bid";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
//        $this->bid=htmlspecialchars(sbtrip_tags($this->bid));

        // bind id of record to delete
        $stmt->bindParam(':bid', $this->bid);

        // execute query
        if($stmt->execute()){
            return true;
        }

        return false;

    }
    
    //********* search in the database ********//
    /* Work in progress... */
    // search products
    function search($keywords){

        // select all query
        
        $query = "SELECT * FROM customers
                 LEFT JOIN bookings
                ON customers.id = bookings.customerId
                WHERE
                customers.name LIKE " . $keywords . " 
                ORDER BY DESC";
//        
//        $query = "SELECT * FROM customers
//                 LEFT JOIN bookings
//                ON customers.id = bookings.customerId
//                WHERE
//                    customers.email LIKE " . $keywords . " 
//                    OR customers.name LIKE " . $keywords . " 
//                    OR bookings.bid LIKE " . $keywords . "
//                ORDER BY DESC";
        
        
        
//        $query = "SELECT
//                    c.name as category_name, p.id, p.name, p.description, p.price, p.category_id, p.created
//                FROM
//                    " . $this->table_name . " p
//                    LEFT JOIN
//                        categories c
//                            ON p.category_id = c.id
//                WHERE
//                    p.name LIKE ? OR p.description LIKE ? OR c.name LIKE ?
//                ORDER BY
//                    p.created DESC";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // sanitize
//        $keywords=htmlspecialchars(strip_tags($keywords));
//        $keywords = "%{$keywords}%";

        // bind
        $stmt->bindParam(1, $keywords);
//        $stmt->bindParam(2, $keywords);
//        $stmt->bindParam(3, $keywords);

        // execute query
        $stmt->execute();

        return $stmt;
    }
    
}