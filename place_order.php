<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');

require 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['student_id']) || !isset($data['order_details'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input.']);
    exit;
}

$student_id = intval($data['student_id']);
$order_details = $data['order_details']; // Array of {menu_item_id, quantity}

$conn->begin_transaction();

try {
    // Insert into orders table
    $sql = $conn->prepare("INSERT INTO orders (student_id) VALUES (?)");
    $sql->bind_param('i', $student_id);
    $sql->execute();
    $order_id = $stmt->insert_id;

    // Insert into orderdetails table
    $sql = $conn->prepare("INSERT INTO orderdetails (order_id, menu_item_id, quantity) VALUES (?, ?, ?)");
    foreach ($order_details as $detail) {
        $menu_item_id = intval($detail['menu_item_id']);
        $quantity = intval($detail['quantity']);
        $sql->bind_param('iii', $order_id, $menu_item_id, $quantity);
        $sql->execute();
    }

    $conn->commit();
    echo json_encode(['status' => 'success', 'message' => 'Order placed successfully.']);
} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(['status' => 'error', 'message' => 'Failed to place order.']);
}

$conn->close();
?>