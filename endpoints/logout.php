<?php

require_once 'config.php';
error_reporting(0); 

$email = $_POST["email"];

$sql = $conn->prepare("UPDATE users SET sessionToken = NULL WHERE email = ?");
$sql->bind_param("ss", $email);
$result = $sql->execute(); 

$conn->close();
