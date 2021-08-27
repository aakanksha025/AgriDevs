
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
    $success = 1;
    foreach ($productDetails as $product) { 
        $orderId = generate_string(10); 
        $sql = $conn->prepare("INSERT INTO orders (orderId, productId, productName, customerEmail, price) VALUES (?, ?, ?, ?, ?)");
        $sql->bind_param("sssss", $orderId,$product->$productId, $product->$productName, $email, $product->$price);
        $result = $sql->execute();
        if (!$result) { 
            $success=0;
            echo json_encode("fail");
        }
    }
    if ($success==1) echo json_encode("success");
} else {
    echo json_encode("unauthenticated");
}



$conn->close();