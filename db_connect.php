<?php
$host="localhost";
$username="root";
$password="";
$dbname="cuea_cafeteria";

// Create connection
$conn=mysqli_connect($host,$username,$password,$dbname);

//check connection
if($conn->connect_error){
    die(json_encode(["error"=> "Database Connection failed: ".$connect->connect_error]));
}
//set header for JSON responses 
header('Content-Type: application/json');
?>