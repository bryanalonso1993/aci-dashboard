<?php
require_once('authentication.php');

$sql = "SELECT * FROM `aci_partitions_controller` LIMIT 15";
$query = $con->query($sql);
// num rows
$num_rows = $query->num_rows;

$array_data = Array();
$array_total = Array();

for ($i=0; $i < $num_rows; $i++) { 
    $rows = $query->fetch_array(MYSQLI_ASSOC);
    $array_data['fileSystem'] = $rows['fileSystem'];
    $array_data['name'] = $rows['name'];
    $array_data['capUtilized'] = $rows['capUtilized'];
    array_push($array_total, $array_data);
}

echo json_encode($array_total);
