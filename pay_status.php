<?php
session_start();
require_once 'db_connect.php';

//ensure the user is logged in
if (!isset($_SESSION['user_id']) || $_SESSION['role']!=='student'){
    echo json_encode(['error'=>'Unauthorized access']);
    exit;
}

//read json input from front end
$data=json_decode(file_get_contents("php://input"), true);

$order_id=$data['order_id']?? null;
$new_status=$data['payment_status']?? null;

if(!$order_id || !in_array($payment_status, ['Paid', 'Pending'])) {
    echo json_encode(['error'=>'Invalid request parameters']);
    exit;
}
try{
    //update payment status in the database
    $sql=$conn->prepare("UPDATE orders SET payment_status=? WHERE id=?");
    //bind parameters
    $sql->bind_param('si',$payment_status,$order_id);
    //execute the `query
    $sql->execute([$payment_status, $order_id]);
    echo json_encode(['message'=>'Payment status updated successfully']);
}catch(PDOException $e) {
    echo json_encode(['error'=>'Database error:' . $e->getMessage()]);
}
?>