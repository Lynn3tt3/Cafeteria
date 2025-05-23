<?php
require 'db_connect.php';

if(!isset($_SESSION['user_id'])) {
    echo json_encode(['status'=>'error', 'message'=>'Unauthorizes access.']);
    exit;
}

if(_$SERVER['REQUEST_METHOD']== 'POST') {
    $user_id=$_SESSION['user_id'];
    $name= trim($_POST['name']);
    $email= trim($_POST['email']);
    $phone= trim($_POST['phone']);

//update user details
$sql= $conn->prepare("UPDATE users SET name=?, email=?, phone=? WHERE user_id=?");
$sql->bind_param('sssi', $name, $email, $phone, $user_id);

if($sql->execute()) {
    echo json_encode(['status'=>'success', 'message'=>'Profile updated successfully.']);
}else {
    echo json_encode(['status'=>'error', 'message'=>'Profile update failed']);
}
$sql->close();
$conn->close();
}
?>