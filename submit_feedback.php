<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');

require 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['order_id']) || !isset($data['comment'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid input.']);
    exit;
}

$order_id = intval($data['order_id']);
$comment = trim($data['comment']);

$sql = $conn->prepare("INSERT INTO feedback (order_id, comment) VALUES (?, ?)");
$sql->bind_param('is', $order_id, $comment);

if ($sql->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Feedback submitted.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to submit feedback.']);
}

$conn->close();
?>