<?php
require 'db_connect.php';

if(!isset($_SESSION['user_id'])) {
    echo json_encode(['status'=>'error', 'message'=>'Unauthorized access.']);
    exit;
}
$user_id= $_SESSION['user_id'];

//delete user account
$sql= $conn->prepare("DELETE FROM users WHERE user_id =? ");
$sql->bind_param('i', $user_id);

if($sql->execute()) {
    session_destroy(); //end session after account deletion
    echo json_encode(['status'=>'success','message'=>'Account deleted successfully']);
}else{
    echo json_encode(['status'=>'error', 'message'=>'Failed to delete account.']);
}
$sql->close();
$conn->close();