<?php

require_once 'config.php';
error_reporting(0);


$email = $_POST["email"];
$authToken = $_POST["authToken"]; 
$action = $_POST['action'];


$sql = "SELECT * from users where email = '".$email."' and sessionToken = '".$authToken."'";
$result = $conn->query($sql);
$row = mysqli_fetch_assoc($result);

if ($row != null) {  

    // Add a product to cart
    if ($action == 'add') {
        $product = json_decode($_POST["productDetails"]); 
        $sql = $conn->prepare("INSERT INTO cart (id, productId, productName, price) VALUES (?, ?, ?, ?)");
        $sql->bind_param("ssss", $email, $product->$productId, $product->$productName, $product->$price);
        $result = $sql->execute();
        if (!$result) { 
            echo json_encode("fail");
        } else {
            echo json_encode("success");
        }        
    } 
    
    // get all products of a cart
    else if ($action == 'get') {
        $resultArray = array(); $i=0;
        $sql = "SELECT * from cart where id = '".$email."'";
        $result = $conn->query($sql); 
        while($row = mysqli_fetch_assoc($result)) {
            $resultArray[$i] = $result;
            $i++;
        } 
        echo json_encode($resultArray);
    } 
    
    // Delete an item from the cart
    else if ($action == 'delete') {
        $productId = $_POST["productId"]; 
        $sql = $conn->prepare("DELETE FROM cart WHERE id = ? and productId = ?");
        $sql->bind_param("ss", $email, $productId);
        $result = $sql->execute(); 

        if ($result) 
            echo json_encode("success"); 
        else 
            echo json_encode("fail");
    }

} else {
    echo json_encode("unauthenticated");
}

$conn->close();
