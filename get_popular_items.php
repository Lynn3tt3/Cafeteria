<?php
require_once 'db_connect.php';

try{
    //get top 5 most ordered menu items
    $sql=$conn->prepare("SELECT item_name, COUNT(*) as order_count FROM orders GROUP BY
    item_name ORDER BY order_count DESC LIMIT 5");
    $sql->execute();
    $popularItems= $sql->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(['popular_items'=>$popularItems]);
} catch (PDOException $e){
    echo json_encode(['error'=>'Database error:'. $e->getMessage()]);
}
?>