<?php

require_once 'config.php';
error_reporting(0);

$fullName = $_POST["fullName"];
$email = $_POST["email"];
$password = $_POST["password"];
$phone = $_POST["phone"];
$city = $_POST["city"];
$country = "India";

$sql = "SELECT * from users where emailId = '".$username."'";
$result = $conn->query($sql);
$resultSet = mysqli_fetch_assoc($result);
$emaill = $resultSet["emailId"]; 

if ($emaill != ''){
    echo json_encode("exists");
} else {
    $authToken = generate_string(); 
    $password = md5($password);
    $sql = $conn->prepare("INSERT INTO users (email, fullName, password, sessionToken, phone, city, country) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $sql->bind_param("sssssss", $email, $fullName, $password, $authToken, $phone, $city, $country);
    $result = $sql->execute();

    if ($result) {
        $output = array("authToken" => $authToken);
        echo json_encode($output);
    }
    else {
        echo json_encode("fail");
        //echo  $conn->error;
    }
}

$conn->close();