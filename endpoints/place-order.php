
<?php

require_once 'config.php';
error_reporting(0);


$email = $_POST["email"];
$authToken =$_POST["authToken"]; 
$productDetails = json_decode($_POST["productDetails"], true); 

// If Authenticated
$sql = "SELECT * from users where email = '".$email."' and sessionToken = '".$authToken."'";
$result = $conn->query($sql);
$row = mysqli_fetch_assoc($result);


if ($row != null){  
    $success = 1;

    // Place order for each products
    try {
        foreach ($productDetails as $product) { 
        $orderId = generate_string(10); 
            $sql = $conn->prepare("INSERT INTO orders (orderId, productId, productName, customerEmail, price) VALUES (?, ?, ?, ?, ?)");
            $sql->bind_param("sssss", $orderId,$product["productId"], $product["productName"], $email, $product["price"]);
            $result = $sql->execute();
            if (!$result) { 
                $success=0;
                break;
                }
            } 
        if ($success==1) echo json_encode("success"); 
        else 
            echo json_encode("fail"); 

    } catch(Exception $e) {
        echo json_encode(array("fail", $e));
    }
        
} else {
    echo json_encode("unauthenticated");
}



$conn->close();