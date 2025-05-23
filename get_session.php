<?php
session_start();

header('Access-Control-Allow-Origin:http://localhost:3000');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods:POST, GET, OPTIONS');
header('Access-Control-Allow-Headers:Content-Type');
header('Content-type: application/json');

//check if user is loged in
if(!isset($_SESSION['user_id'])) {
    echo json_encode([
        'status'=>'success', 'user'=>[
            'user_id'=>$_SESSION['user_id'],
            'name'=>$_SESSION['name'],
            'email'=>$_SESSION['email'],
            'role'=>$_SESSION['role'],
        ]
        ]);
    }else{
            echo json_encode([
                'status'=>'error', 'message'=>'Unauthorized access.',
            ]);
        }
?>