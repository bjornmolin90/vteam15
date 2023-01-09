use vteam;
DROP TABLE IF EXISTS bike_rides, users, bikes;

CREATE TABLE `bikes` (
  `bike_id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(30) NOT NULL,
  `parking` varchar(10) DEFAULT NULL,
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

/*
CREATE TABLE `parking_table` (
  `parking_id` varchar(10) NOT NULL,
  `parking_type` varchar(20) DEFAULT NULL,
  `charging_station` varchar(10) DEFAULT NULL,
  `city` varchar(30) NOT NULL,
  `latitude` varchar(20) DEFAULT NULL,
  `longitude` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`parking_id`),
  KEY `city_idx` (`city`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `bike_parking` (
  `bp_id` int NOT NULL AUTO_INCREMENT,
  `id_b` int DEFAULT NULL,
  `park_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`bp_id`),
  UNIQUE KEY `bp_id_UNIQUE` (`bp_id`),
  KEY `bike_id_idx` (`id_b`),
  KEY `parking_id_idx` (`park_id`),
  CONSTRAINT `id_b` FOREIGN KEY (`id_b`) REFERENCES `bike_table` (`bike_id`),
  CONSTRAINT `park_id` FOREIGN KEY (`park_id`) REFERENCES `parking_table` (`parking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
*/

/*
CREATE TABLE `location_table` (
  `location_id` int NOT NULL,
  `location_name` varchar(30) NOT NULL,
  `latitude` varchar(20) DEFAULT NULL,
  `longitude` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `bikelocation` (
  `bl_id` int NOT NULL AUTO_INCREMENT,
  `b_id` int DEFAULT NULL,
  `l_id` int DEFAULT NULL,
  PRIMARY KEY (`bl_id`),
  UNIQUE KEY `bl_id_UNIQUE` (`bl_id`),
  KEY `b_id_idx` (`b_id`),
  KEY `l_id_idx` (`l_id`),
  CONSTRAINT `b_id` FOREIGN KEY (`b_id`) REFERENCES `bike_table` (`bike_id`),
  CONSTRAINT `l_id` FOREIGN KEY (`l_id`) REFERENCES `location_table` (`location_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `bikeride` (
  `br_id` int NOT NULL AUTO_INCREMENT,
  `id_bike` int DEFAULT NULL,
  `id_bikeride` int DEFAULT NULL,
  PRIMARY KEY (`br_id`),
  UNIQUE KEY `br_id_UNIQUE` (`br_id`),
  KEY `b_id_idx` (`id_bike`),
  KEY `id_bikeride_idx` (`id_bikeride`),
  CONSTRAINT `id_bike` FOREIGN KEY (`id_bike`) REFERENCES `bike_table` (`bike_id`),
  CONSTRAINT `id_bikeride` FOREIGN KEY (`id_bikeride`) REFERENCES `bike_ride_table` (`ride_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `parkinglocation` (
  `pl_id` int NOT NULL AUTO_INCREMENT,
  `p_id` varchar(10) DEFAULT NULL,
  `loc_id` int DEFAULT NULL,
  PRIMARY KEY (`pl_id`),
  UNIQUE KEY `pl_id_UNIQUE` (`pl_id`),
  KEY `p_id_idx` (`p_id`),
  KEY `l_id_idx` (`loc_id`),
  CONSTRAINT `loc_id` FOREIGN KEY (`loc_id`) REFERENCES `location_table` (`location_id`),
  CONSTRAINT `p_id` FOREIGN KEY (`p_id`) REFERENCES `parking_table` (`parking_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
*/

/*
CREATE ALGORITHM=UNDEFINED DEFINER=`user`@`localhost` SQL SECURITY DEFINER VIEW `vteam`.`parking_bike` AS select `bp`.`id_b` AS `id_b`,`bp`.`park_id` AS `park_id`,`p`.`city` AS `city`,`b`.`parking` AS `parking`,`b`.`charging_status` AS `charging_status`,`b`.`available_status` AS `available_status` from ((`vteam`.`bike_parking` `bp` left outer join `vteam`.`parking_table` `p` on((`bp`.`park_id` = `p`.`parking_id`))) left outer join `vteam`.`bike_table` `b` on((`bp`.`id_b` = `b`.`bike_id`))) order by `p`.`city`;

CREATE ALGORITHM=UNDEFINED DEFINER=`user`@`localhost` SQL SECURITY DEFINER VIEW `vteam`.`acceptable_parking` AS select `vteam`.`parking_bike`.`park_id` AS `park_id`,`vteam`.`parking_bike`.`id_b` AS `id_b`,`vteam`.`parking_bike`.`available_status` AS `available_status`,count(`vteam`.`parking_bike`.`id_b`) AS `Antal` from `vteam`.`parking_bike` where (`vteam`.`parking_bike`.`available_status` = 'acceptable');

CREATE ALGORITHM=UNDEFINED DEFINER=`user`@`localhost` SQL SECURITY DEFINER VIEW `vteam`.`user_view` AS select `vteam`.`user_table`.`user_id` AS `ID`,`vteam`.`user_table`.`username` AS `username`,concat(`vteam`.`user_table`.`firstname`,' ',`vteam`.`user_table`.`lastname`) AS `Namn`,`vteam`.`user_table`.`adress` AS `Gatuadress`,concat(`vteam`.`user_table`.`postcode`,' ',`vteam`.`user_table`.`city`) AS `Postnummer`,`vteam`.`user_table`.`saldo` AS `saldo` from `vteam`.`user_table` order by `vteam`.`user_table`.`user_id`;

DELIMITER $$
CREATE DEFINER=`user`@`localhost` PROCEDURE `edit_user`(
uid INT,
edit_username VARCHAR(30),
    edit_type VARCHAR(10),
    edit_password VARCHAR(30),
    edit_firstname VARCHAR(30),
    edit_lastname VARCHAR(45),
    edit_adress VARCHAR(45),
    edit_postcode VARCHAR(8),
    edit_city VARCHAR(30),
    edit_saldo INT
)
BEGIN
UPDATE user_table SET
        u_type = edit_type,
        u_password = edit_password,
        firstname = edit_firstname,
        lastname = edit_lastname,
        adress = edit_adress,
        postcode = edit_postcode,
        city = edit_city,
        saldo = edit_saldo
WHERE
user_id = uid;
END$$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`user`@`localhost` PROCEDURE `move_bike`(
bike INT,
move_to_parking VARCHAR(10)
)
BEGIN
START TRANSACTION;
    
    UPDATE bike_table
    SET
parking = move_to_parking
WHERE
bike_id = bike;
END$$
DELIMITER ;
*/