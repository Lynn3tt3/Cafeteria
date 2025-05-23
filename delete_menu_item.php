<?php
session_start();
require_once 'db_connect.php';

//ensure the user is logged in
if (!isset($_SESSION['user_id']) || $_SESSION['role']!=='staff'){
    echo json_encode(['error'=>'Unauthorized access']);
    exit;
}

//read json input from front end
$data=json_decode(file_get_contents("php://input"), true);
$item_id=$data['item_id']?? null;

if(!$item_id) {
    echo json_encode(['error'=>'Invalid item id']);
    exit;
}
try{
    //delete new menu items 
    $sql=$conn->prepare("DELETE FROM menu WHERE id=?");
    $sql->execute([$item_id]);
    echo json_encode(['message'=>'Menu Item deleted successfully']);
}catch(connException $e) {
    echo json_encode(['error'=>'Database error:' . $e->getMessage()]);
}
?>