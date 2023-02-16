DROP DATABASE IF EXISTS `MockProjectDB_Team1`;
CREATE DATABASE `MockProjectDB_Team1`;
USE `MockProjectDB_Team1`;


--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` 				INT AUTO_INCREMENT PRIMARY KEY,
  `username`	 	CHAR(50) 	NOT NULL UNIQUE CHECK (LENGTH(`username`) >= 6 AND LENGTH(`username`) <= 50),
  `email` 			CHAR(50) 	NOT NULL UNIQUE CHECK (LENGTH(`email`) >= 6 AND LENGTH(`email`) <= 50),
  `password` 		VARCHAR(100) NOT NULL,
  `avatar_url` 		TEXT NULL,
  `birth_date` 		DATE NULL,
  `first_name` 		VARCHAR(50) NOT NULL,
  `gender` 			TINYINT NULL,
  `last_name` 		VARCHAR(50) NOT NULL,
  `phone`			VARCHAR(50) NULL,
  `status` 			TINYINT DEFAULT 0 NOT NULL
);

--
-- Table structure for table `recipe`
--

DROP TABLE IF EXISTS `recipe`;
CREATE TABLE `recipe` (
  `id` 			INT NOT NULL AUTO_INCREMENT,
  `name` 		VARCHAR(200) NOT NULL,
  `image_url` 	TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `processing_steps` text NOT NULL,
  `note` 		TEXT NOT NULL,
  `views` 		INT NOT NULL DEFAULT '0',
  `point` 		INT NOT NULL DEFAULT '0',
  `creator_id` 	INT NOT NULL,
  `create_date` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`),
  UNIQUE KEY  (`name`),
  FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
);

--
-- Table structure for table `recipe_ingredient`
--

DROP TABLE IF EXISTS `recipe_ingredient`;
CREATE TABLE `recipe_ingredient` (
  `id` 		INT NOT NULL AUTO_INCREMENT,
  `amount`	FLOAT NOT NULL,
  `name` 	VARCHAR(100) NOT NULL,
  `unit` 	VARCHAR(50) NOT NULL,
  `recipe_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
);

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `recipe_id` 	int NOT NULL,
  `user_id` 	int NOT NULL,
  `comment` 	text NOT NULL,
  `create_date` datetime NOT NULL DEFAULT NOW(),
  `update_date` datetime NULL,
  PRIMARY KEY (`recipe_id`,`user_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
);

--
-- Table structure for table `point`
--

DROP TABLE IF EXISTS `point`;
CREATE TABLE `point` (
  `id` 		int NOT NULL AUTO_INCREMENT,
  `point` 	int NOT NULL DEFAULT '0',
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

--
-- Table structure for table `recipe_exchange_history`
--

DROP TABLE IF EXISTS `recipe_exchange_history`;
CREATE TABLE `recipe_exchange_history` (
  `recipe_id` 	INT NOT NULL,
  `user_id` 	INT NOT NULL,
  `exchange_date` DATETIME NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`recipe_id`,`user_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`)
);

--
-- Table structure for table `voting`
--

DROP TABLE IF EXISTS `voting`;
CREATE TABLE `voting` (
  `recipe_id` int NOT NULL,
  `user_id` int NOT NULL,
  `create_date` datetime(6) NOT NULL,
  `stars` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`recipe_id`,`user_id`),
  FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

--
-- Table structure for table `registration_user_token`
--

DROP TABLE IF EXISTS `registration_user_token`;
CREATE TABLE `registration_user_token` (
  `token_id` int NOT NULL AUTO_INCREMENT,
  `token` 	char(36) NOT NULL,
  `user_id` int NOT NULL,
  `expiry_date` datetime NOT NULL,
  PRIMARY KEY (`token_id`),
  UNIQUE KEY  (`token`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

--
-- Table structure for table `reset_password_token`
--

DROP TABLE IF EXISTS `reset_password_token`;
CREATE TABLE `reset_password_token` (
  `reset_id` int NOT NULL AUTO_INCREMENT,
  `token` 	char(36) NOT NULL,
  `user_id` int NOT NULL,
  `expiry_date` datetime NOT NULL,
  PRIMARY KEY (`reset_id`),
  UNIQUE KEY  (`token`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);
