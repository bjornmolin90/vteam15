--
-- Inserts data in to the database
--
/*
use vteam;

LOAD DATA LOCAL infile 'user.csv'
INTO TABLE user_table
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;

LOAD DATA LOCAL infile 'location.csv'
INTO TABLE location_table
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;

LOAD DATA LOCAL infile 'parking.csv'
INTO TABLE parking_table
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;

LOAD DATA LOCAL infile 'bike.csv'
INTO TABLE bike_table
CHARSET utf8
FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
LINES
    TERMINATED BY '\n'
IGNORE 1 LINES
;
*/