<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');

require 'db_connect.php';

try {
    $sql = "SELECT menu_item_id AS id, name, description, price, availability, category, created_at FROM menu_items";
    $result = $conn->query($sql);

    if (!$result) {
        echo json_encode(['status' => 'error', 'message' => 'Failed to execute query.']);
        exit;
    }

    $menu = [];
    while ($row = $result->fetch_assoc()) {
        $menu[] = $row;
    }

    if (empty($menu)) {
        echo json_encode(['status' => 'success', 'menu' => []]); // Return empty menu if no items
    } else {
        echo json_encode(['status' => 'success', 'menu' => $menu]);
    }
} catch (mysqli_sql_exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
}

$conn->close();
?>