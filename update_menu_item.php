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
$new_name=$data['new_name']?? null;
$new_price=$data['new_price']?? null;

if(!$item_id ||!$new_name || !$new_price) {
    echo json_encode(['error'=>'All fields are required']);
    exit;
}

try{
    //update new menu items 
    $sql=$conn->prepare("UPDATE menu SET item_name=?, price=? WHERE
    id=?");
    $sql->execute([$new_name, $new_price, $item_id]);
    echo json_encode(['message'=>'Menu Item updated successfully']);
}catch(connException $e) {
    echo json_encode(['error'=>'Database error:' . $e->getMessage()]);
}
?>
