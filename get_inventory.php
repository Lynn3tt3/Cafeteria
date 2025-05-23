<?php
require_once 'db_connect.php';

// get inventory from database(total ordered quantity per menu item)
$sql= "SELECT mi.menu_item_id, mi.name AS item_name, SUM(o.quantity) AS
total_ordered FROM orders o JOIN menu_items mi ON o.menu_item_id=mi.menu_item_id
WHERE o.order_status IN ('pending','accepted','paid') GROUP BY mi.menu_item_id";

$result= $conn->query($sql);
$inventory=[];

while($row= $result->fetch_assoc()) {
    $inventory[]=$row;
}

//return inventory data as json
echo json_encode(['status'=>'success', 'inventory'=>$inventory]);

$conn->close();

?>