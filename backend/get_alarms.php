<?php

require_once('authentication.php');

$sql = "SELECT * FROM `aci_alarms_topology` LIMIT 100";
$query = $con->query($sql);
// num rows
$num_rows = $query->num_rows;

$array_data = Array();
$array_total = Array();

for ($i=0; $i < $num_rows; $i++) { 
    $rows = $query->fetch_array(MYSQLI_ASSOC);
    $array_data['severity'] = $rows['severity'];
    $array_data['cause'] = $rows['cause'];
    $array_data['descr'] = $rows['descr'];
    $array_data['domain'] = $rows['domain'];
    $array_data['rule'] = $rows['rule'];
    $array_data['subject'] = $rows['subject'];
    $array_data['type'] = $rows['type'];
    array_push($array_total, $array_data);
}

echo json_encode($array_total);