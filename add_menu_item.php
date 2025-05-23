<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');

require 'db_connect.php';

// Handle preflight request (POST method)
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

if (!$data) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON input.']);
    exit;
}

// Validate and sanitize input
$name = isset($data['name']) ? trim($data['name']) : null;
$description = isset($data['description']) ? trim($data['description']) : null;
$price = isset($data['price']) ? floatval($data['price']) : null;
$availability = isset($data['availability']) ? trim($data['availability']) : null;
$category = isset($data['category']) ? trim($data['category']) : null;
$created_by = isset($data['created_by']) ? intval($data['created_by']) : null;

// Validate required fields
if (
    $name === null || $name === '' || $price === null ||
    $availability === null || $availability === '' || $created_by === null
) {
    echo json_encode(['status' => 'error', 'message' => 'Please fill all required fields.']);
    exit;
}

// Optional fields
if ($description === '') $description = null;
if ($category === '') $category = null;

try {
    $sql = $conn->prepare("INSERT INTO menu_items (name, description, price, availability, category, created_by) 
                           VALUES (?, ?, ?, ?, ?, ?)");
    $sql->bind_param('ssdssi', $name, $description, $price, $availability, $category, $created_by);

    if ($sql->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Menu item added successfully.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to add item.']);
    }

    $sql->close();
    $conn->close();
} catch (mysqli_sql_exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error: ' . $e->getMessage()]);
    exit;
}
?>