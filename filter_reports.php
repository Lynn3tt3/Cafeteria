<?php
require 'db_connect.php'; //Database connection file


// Handle preflight request (OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //Get start and end dates
    $start_date= trim($_POST['start_date']);
    $end_date= trim($_POST['end_date']);

//validate input
if(empty($start_date)||empty($end_date)) {
    echo json_encode(['status'=>'error', 'message'=>'Both start and end dates are required']);
    exit;
}

//query to fetch filtered reports
$sql= $conn->prepare("SELECT o.order_id,u.name AS student_name,mi.name AS 
menu_item, o.quantity, p.amount, p.payment_method, o.order_status,o.created_at 
FROM orders o JOIN users u ON o.student_id=u.user_id JOIN menu_items mi ON o.menu_item_id 
=mi.menu_item_id LEFT JOIN payments p ON o.order_id =p.order_id WHERE DATE(o.created_at) 
BETWEEN ? AND ? ORDER BY created_at DESC");
$sql->bind_param('ss',$start_date,$end_date);
$sql->execute();
$result=$sql->get_result();

//fetch data
$reports=[];
while ($row= $result->fetch_assoc()) {
    $reports[]=$row;
}
//return json response
echo json_encode([
    'success'=>true, 'reports'=>$reports
]);

//close statement and connection
$sql->close();
$conn->close();
}
?>


