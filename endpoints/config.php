<?php

header('Access-Control-Allow-Origin: *');
error_reporting(0);

$server = "localhost";
$username = "root";
$password = "";
$db = "AgriDevs";

$conn = new mysqli($server, $username, $password, $db);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
} 


function generate_string($strength = 20) {
    $input = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $input_length = strlen($input);
    $random_string = '';
    for($i = 0; $i < $strength; $i++) {
        $random_character = $input[mt_rand(0, $input_length - 1)];
        $random_string .= $random_character;
    }
 
    return $random_string;
}