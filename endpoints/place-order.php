
<?php

require_once 'config.php';
error_reporting(0);


$email = $_POST["email"];
$authToken =$_POST["authToken"]; 
$productDetails = json_decode($_POST["productDetails"]); 


$sql = "SELECT * from users where email = '".$email."' and sessionToken = '".$authToken."'";
$result = $conn->query($sql);
$row = mysqli_fetch_assoc($result);
if ($row != null){  
    foreach ($productDetails as $product) {
        $orderId = generate_string(10); 
        $sql = $conn->prepare("INSERT INTO orders (orderId, productName, customerEmail, price) VALUES (?, ?, ?, ?)");
        $sql->bind_param("ssss", $orderId, $product->$productName, $email, $product->$productName);
        $result = $sql->execute();
        if (!$result) {
            echo json_encode("fail");
        }
    }
    echo json_encode("success")
} else {
    echo json_encode("unauthenticated");
}



$conn->close();