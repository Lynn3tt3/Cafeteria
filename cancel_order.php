<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');

require 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($data['order_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Order ID is required.']);
    exit;
}

$order_id = intval($data['order_id']);

// Check if the order exists and is in 'pending' status
$sql = "SELECT order_status FROM orders WHERE order_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $order_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['status' => 'error', 'message' => 'Order not found.']);
    exit;
}

$order = $result->fetch_assoc();
if ($order['order_status'] !== 'pending') {
    echo json_encode(['status' => 'error', 'message' => 'Only pending orders can be canceled.']);
    exit;
}

// Update the order status to 'canceled'
$sql = "UPDATE orders SET order_status = 'rejected' WHERE order_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $order_id);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Order canceled successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to cancel order.']);
}

$conn->close();
?>