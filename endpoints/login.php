<?php

require_once 'config.php';
error_reporting(0);

$email = $_POST["email"];
$password =$_POST["password"];


$sql = "SELECT * from users where email = '".$email."'";
$result = $conn->query($sql);
$resultSet = mysqli_fetch_assoc($result);
$email = $resultSet["email"]; 
if ($email == ''){
    echo json_encode("invalid");
} else {
    if ($resultSet["password"] == md5($password)) {
        $auth = generate_string();
        $sql = $conn->prepare("UPDATE users set sessionToken = ? where emailId = ?");
        $sql->bind_param("ss", $auth, $username);
        $sql->execute();
        $output = array("authToken" => $auth);
        echo json_encode($output);
    } else echo json_encode("invalid");

}