CREATE DATABASE AgriDevs; 
USE AgriDevs; 

CREATE TABLE `agridevs`.`users` (
  `email` VARCHAR(255) NOT NULL,
  `fullName` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `sessionToken` VARCHAR(255) NULL,
  `phone` VARCHAR(255) NULL,
  `city` VARCHAR(45) NULL,
  `country` VARCHAR(45) NULL,
  PRIMARY KEY (`email`)); 

CREATE TABLE `orders` (
  `orderId` varchar(45) NOT NULL, `productId` VARCHAR(45),
  `productName` varchar(50) NOT NULL,
  `customerEmail` varchar(45) NOT NULL,
  `price` int(11) DEFAULT NULL,
  PRIMARY KEY (`orderId`)
);  
CREATE TABLE `agridevs`.`cart` (
  `id` VARCHAR(50) NOT NULL,
  `productId` VARCHAR(45) NOT NULL,
  `productName` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  PRIMARY KEY (`id`));


