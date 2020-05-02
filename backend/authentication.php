<?php

$USERNAME = "bryan";
$PASSWORD = "claro123";
$DATABASE = "DATASETS";
$HOSTNAME = "127.0.0.1";

$con = new mysqli( 
    $host = $HOSTNAME, 
    $username=$USERNAME, 
    $passwd= $PASSWORD,
    $dbname=$DATABASE);

if ( $con->connect_errno) {
    die("Error in connect database $con->connect_errno");
}
