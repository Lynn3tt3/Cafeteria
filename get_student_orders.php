<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');

require 'db_connect.php';

// Validate and retrieve student_id
if (!isset($_GET['student_id']) || empty($_GET['student_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Student ID is required.']);
    exit;
}

$student_id = intval($_GET['student_id']);

$sql = "SELECT o.order_id, o.order_status, od.menu_item_id, mi.name AS menu_item, od.quantity
        FROM orders o
        JOIN orderdetails od ON o.order_id = od.order_id
        JOIN menu_items mi ON od.menu_item_id = mi.menu_item_id
        WHERE o.student_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $student_id);
$stmt->execute();
$result = $stmt->get_result();

$orders = [];
while ($row = $result->fetch_assoc()) {
    $orders[] = $row;
}

echo json_encode(['status' => 'success', 'orders' => $orders]);

$conn->close();
?>