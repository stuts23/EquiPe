DROP DATABASE IF EXISTS test_db;   
CREATE DATABASE IF NOT EXISTS test_db;   
USE test_db; 

DROP TABLE IF EXISTS user; 

CREATE TABLE IF NOT EXISTS user 
  ( 
     id         INT PRIMARY KEY auto_increment, 
     username   VARCHAR(25) UNIQUE NOT NULL, 
     password   CHAR(60) NOT NULL, 
     first_name VARCHAR(50) NOT NULL, 
     last_name  VARCHAR(50) NOT NULL, 
     email      VARCHAR(100) UNIQUE NOT NULL, 
     role       ENUM('Admin', 'SuperUser') DEFAULT 'SuperUser'
  ); 

-- Dumping structure for table heroku_7697c875dc5b5f3.channels
CREATE TABLE IF NOT EXISTS `channels` (
  `channel_id` varchar(50) DEFAULT NULL,
  `channel_name` varchar(50) DEFAULT NULL,
  `server_id` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table heroku_7697c875dc5b5f3.messages
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `channel_id` varchar(50) DEFAULT NULL,
  `user_name` varchar(50) DEFAULT NULL,
  `msg` text,
  `date` varchar(50) DEFAULT NULL,
  KEY `Primary Key` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12012 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table heroku_7697c875dc5b5f3.servers
CREATE TABLE IF NOT EXISTS `servers` (
  `server_id` varchar(50) NOT NULL,
  `server_name` varchar(50) NOT NULL,
  `owner_id` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table heroku_7697c875dc5b5f3.userservers
CREATE TABLE IF NOT EXISTS `userservers` (
  `user_id` varchar(50) DEFAULT NULL,
  `server_id` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table heroku_7697c875dc5b5f3.user_messages
CREATE TABLE IF NOT EXISTS `user_messages` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `user_from` varchar(50) DEFAULT NULL,
  `user_to` varchar(50) DEFAULT NULL,
  `msg` text,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=132 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;

