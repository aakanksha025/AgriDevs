<?php

require_once 'config.php';
error_reporting(0);

$email = $_POST["email"];
$password =$_POST["password"];


$sql = "SELECT * from users where email = '".$email."'";
$result = $conn->query($sql);
$resultSet = mysqli_fetch_assoc($result); 

// If user does not exists
if ($resultSet == null) {
    echo json_encode("invalid");
} 
// If user exists
else {

    // If the hashed passwords are same
    if ($resultSet["password"] == md5($password)) {
        $auth = generate_string();
        $sql = $conn->prepare("UPDATE users set sessionToken = ? where emailId = ?");
        $sql->bind_param("ss", $auth, $email);
        $sql->execute();
        $output = array("authToken" => $auth);
        echo json_encode($output);
    } 
    else 
        echo json_encode("invalid");

}