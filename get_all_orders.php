<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');

require 'db_connect.php';

try {
    $sql = "SELECT 
                o.order_id, 
                u.name AS student_name, 
                mi.name AS menu_item, 
                od.quantity, 
                o.order_status 
            FROM orders o
            JOIN users u ON o.student_id = u.user_id
            JOIN orderdetails od ON o.order_id = od.order_id
            JOIN menu_items mi ON od.menu_item_id = mi.menu_item_id
            ORDER BY o.created_at DESC";

    $result = $conn->query($sql);

    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }

    echo json_encode(['status' => 'success', 'orders' => $orders]);
} catch (mysqli_sql_exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

$conn->close();
?>