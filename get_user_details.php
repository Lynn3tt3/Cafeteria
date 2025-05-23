<?php
session_start();
require_once 'db_connect.php';

//ensure the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status'=>'error', 'message'=>'Unauthorized access']);
    exit;
}

$user_id=$_SESSION['user_id'];

    //fetch user details from correct table
$sql=$conn->prepare("SELECT user_id, name, email, phone, role FROM users WHERE user_id=?");
$sql->bind_param('i', $user_id);
$sql->execute();
$result= $sql->get_result();

if(result->num_rows >0) {
    $user=$result->fetch_assoc();
    echo json_encode(['status'=>'success', 'user'=>$user]);
}else{
    echo json_encode(['status'=>'error','message'=>'User not found.']);
}
$sql->close();
$conn->close();
?>