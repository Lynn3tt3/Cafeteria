<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');

require 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['order_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Order ID is required.']);
    exit;
}

$order_id = intval($data['order_id']);

// Update the order status to 'paid'
$sql = "UPDATE orders SET order_status = 'paid' WHERE order_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $order_id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Order marked as paid.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to mark order as paid.']);
}

$conn->close();
?>