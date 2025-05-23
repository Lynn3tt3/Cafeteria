<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');

require 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['order_id']) || !isset($data['status'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input.']);
    exit;
}

$order_id = intval($data['order_id']);
$status = $data['status'];

$sql = $conn->prepare("UPDATE orders SET order_status = ? WHERE order_id = ?");
$sql->bind_param('si', $status, $order_id);

if ($sql->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Order status updated.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to update order status.']);
}

$conn->close();
?>