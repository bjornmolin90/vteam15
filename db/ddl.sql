CREATE DATABASE IF NOT EXISTS vteam;
use vteam;
DROP TABLE IF EXISTS bike_rides, users, bikes;

CREATE TABLE `bikes` (
  `bike_id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(30) NOT NULL,
  `parking` varchar(50) DEFAULT NULL,
  `charging_status` varchar(30) DEFAULT NULL,
  `available_status` varchar(20) NOT NULL,
  `m_location` varchar(50) DEFAULT NULL,
  `speed` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`bike_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `u_type` varchar(10) NOT NULL,
  `u_password` varchar(30) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `adress` varchar(45) DEFAULT NULL,
  `postcode` varchar(8) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `saldo` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='Table for the users';

CREATE TABLE `bike_rides` (
  `ride_id` int NOT NULL AUTO_INCREMENT,
  `bike_id` int,
  `user_id` int,
  `start_position` varchar(50) DEFAULT NULL,
  `end_position` varchar(50) DEFAULT NULL,
  `cost` int NOT NULL,
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE SET NULL,
  FOREIGN KEY (`bike_id`) REFERENCES `bikes`(`bike_id`) ON DELETE SET NULL,
  PRIMARY KEY (`ride_id`)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;