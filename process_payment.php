<?php 
require 'db_connect.php';


if($_SERVER['REQUEST_METHOD'] =='POST') {
    $order_id= trim($_POST['order_id']);
    $pay_method= trim($_POST['pay_method']);
    $amount= trim($_POST['amount']);

if(empty($order_id) || empty($pay_method)||empty($amount)) {
    echo json_encode(['success'=>false, 'message'=>'All fields are required']);
    exit();
}

//verify the order exists and belongs to the student
$sql=$conn->prepare("INSERT INTO payment (order_id, amount, pay_method, is_paid, paid_at)
VALUES(?,?,?,1, NOW())");
$sql->bind_param('ids', $order_id,$amount,$pay_method);

if ($sql->execute()){
    $conn->query("UPDATE orders SET order_status='paid' WHERE order_id=$order_id");
    echo json_encode(['status'=>'success', 'message'=>'Payment successful.']);
} else{
    echo json_encode(['status'=>'error', 'message'=>'Payment failed.']);
}

$sql->close();
$conn->close();
}
?>