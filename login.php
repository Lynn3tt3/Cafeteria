<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require 'db_connect.php';

$data = json_decode(file_get_contents('php://input'), true);

// Check if data is valid and required fields are set
if (!isset($data['email']) || !isset($data['password'])) {
    echo json_encode(['status' => 'error', 'message' => 'Email and password are required']);
    exit();
}

$email = trim($data['email']);
$password = trim($data['password']);

// Check if user exists
$sql = $conn->prepare("SELECT user_id, name, email, password, role FROM users WHERE email = ?");
$sql->bind_param('s', $email);
$sql->execute();
$result = $sql->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // Verify hashed password
    if (password_verify($password, $user['password'])) {
        // Store session variables
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['name'] = $user['name'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['role'] = $user['role'];

        $token = bin2hex(random_bytes(16)); // Simulated token (JWT)

        echo json_encode([
            'status' => 'success',
            'user' => [
                'user_id' => $user['user_id'], // Include user_id here
                'role' => $user['role'],
                'name' => $user['name'],
                'email' => $user['email']
            ],
            'token' => $token
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Invalid email or password']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'User not found']);
}

$sql->close();
$conn->close();
?>