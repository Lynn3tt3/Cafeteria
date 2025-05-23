<?php
require 'db_connect.php'; //db connection file
 
// Handle preflight request (GET method)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $order_id= trim($_GET['order_id']);

$sql= $conn->prepare("SELECT is_paid FROM payments WHERE order_id=?");
$sql->bind_param('i',$order_id);
$sql->execute();
$sql->bind_result($is_paid);
$sql->fetch();

echo json_encode(['status'=>'success', 'is_paid'=>$is_paid]);

$sql->close();
$conn->close();
}
?>
