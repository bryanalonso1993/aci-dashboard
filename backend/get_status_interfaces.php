<?php
require_once("authentication.php");


$query = $con->query("SELECT `id`, `idParent`, `operSt` FROM `aci_status_interfaces`");
if ($con->error){
    die("Error in query sql $con->error");
}
$num_rows = $query->num_rows;
$array_data = Array();
$array_push = Array();

for ($index=0;$index<$num_rows;$index++){
    $row = $query->fetch_array(MYSQLI_ASSOC);
    $array_data['id'] = $row['id'];
    $array_data['idParent'] = $row['idParent'];
    $array_data['operSt'] = $row['operSt'];
    array_push($array_push, $array_data);
}
echo json_encode($array_push);