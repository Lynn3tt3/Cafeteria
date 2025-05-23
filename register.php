<?php
header('Access-Control-Allow-Origin:http://localhost:3000');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods:POST, GET, OPTIONS');
header('Access-Control-Allow-Headers:Content-Type');
header('Content-Type:application/json');

require 'db_connect.php';

if ($_SERVER["REQUEST_METHOD"]=="OPTIONS") {
    http_response_code(200);
    exit;
}
$data=json_decode(file_get_contents("php://input"), true);

error_log(json_encode($data));

if(!$data || !isset($data['name'], $data['email'], $data['phone'], $data['password'], $data['role'])){
    echo json_encode(['status'=>'error', 'message'=>'Invalid JSON input.']);
    exit;
}
    $name=trim($data['name']);
    $email=trim($data['email']);
    $phone=trim($data['phone']);
    $password=trim($data['password']);
    $role= trim($data['role']); //student or cafeteria staff

    if (empty($name)||empty($email)||empty($phone)||empty($password)||empty($role)) {
        echo json_encode(['status'=>'error', 'message'=>'All fields are required,']);
        exit;
    }

//password hashing
$hashedPassword=password_hash($password, PASSWORD_DEFAULT);

//insert user to db
$sql=$conn->prepare("INSERT INTO users(name, email, phone, password, role)
VALUES(?,?,?,?,?)");
$sql->bind_param('sssss', $name,$email,$phone,$hashedPassword,$role);

if($sql->execute()){
    echo json_encode(['status'=>'success', 'message'=>'Registration Successful.']);
}else{
    echo json_encode(['status'=>'error', 'message'=>'Registration Failed.']);
}
$sql->close();
$conn->close();

?>