<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');

require 'db_connect.php';

$sql = "SELECT mi.name AS menu_item, SUM(od.quantity) AS total_quantity
        FROM orderdetails od
        JOIN menu_items mi ON od.menu_item_id = mi.menu_item_id
        JOIN orders o ON od.order_id = o.order_id
        WHERE o.order_status IN ('accepted', 'paid', 'served')
        GROUP BY mi.menu_item_id";
$result = $conn->query($sql);

$report = [];
while ($row = $result->fetch_assoc()) {
    $report[] = $row;
}

echo json_encode(['status' => 'success', 'report' => $report]);

$conn->close();
?>