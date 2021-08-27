<?php

require_once 'config.php';
error_reporting(0);


$email = $_POST["email"];
$authToken = $_POST["authToken"]; 
$action = $_POST['action'];

// If Authenticated
$sql = "SELECT * from users where email = '".$email."' and sessionToken = '".$authToken."'";
$result = $conn->query($sql);
$row = mysqli_fetch_assoc($result);

if ($row != null) {  

    // Add a product to cart
    if ($action == 'add') {
        $productId = $_POST["productId"]; 
        $productName = $_POST["productName"]; 
        $productPrice = $_POST["price"];  
        if ($productId && $productName && $productPrice) {
            $sql = $conn->prepare("INSERT INTO cart (id, productId, productName, price) VALUES (?, ?, ?, ?)");
            $sql->bind_param("ssss", $email, $productId, $productName, $productPrice);
            if ($sql->execute()) { 
                echo json_encode("success"); 
            } else {
                echo json_encode("fail");
            }   
        } else { 
            echo json_encode(array("data-missing", $productId, $productName, $productPrice)); 
        }
             
    } 
    
    // get all products of a cart
    else if ($action == 'get') {
        $resultArray = array(); $i=0;
        $sql = "SELECT * from cart where id = '".$email."'";
        $result = $conn->query($sql); 
        while($row = mysqli_fetch_assoc($result)) {
            $resultArray[$i] = $row;
            $i++;
        }  
        if ($resultArray == null ) echo json_encode("no-products");
        else echo json_encode($resultArray);
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
