-- Drop the database if it already exists
DROP DATABASE IF EXISTS RecipeDBTeam1;
-- Create database
CREATE DATABASE IF NOT EXISTS RecipeDBTeam1;
USE RecipeDBTeam1;

-- Create table user
DROP TABLE IF EXISTS 	`User`;
CREATE TABLE IF NOT EXISTS `User` ( 	
	id 				INT AUTO_INCREMENT PRIMARY KEY,
    `first_name`	VARCHAR(50)	NOT NULL,
    `last_name`		VARCHAR(50)	NOT NULL,
	`user_name`	 	CHAR(50) 	NOT NULL UNIQUE CHECK (LENGTH(`user_name`) >= 6 AND LENGTH(`user_name`) <= 50),
	`email` 		CHAR(50) 	NOT NULL UNIQUE CHECK (LENGTH(`email`) >= 6 AND LENGTH(`email`) <= 50),
	`password` 		VARCHAR(100) NOT NULL,
    `birth_date`	DATE,
	`gender`		ENUM('Male','Female','isDifferent'),
    `phone`			VARCHAR(50),
    `status`		TINYINT DEFAULT 0, -- 0: Not Active, 1: Active
    `avatar_url`	VARCHAR(500)
);
				

-- Create table Recipe
DROP TABLE IF EXISTS 	`Recipe`;
CREATE TABLE IF NOT EXISTS `Recipe` ( 	
	id 					INT AUTO_INCREMENT PRIMARY KEY,
    `name`				VARCHAR(200) NOT NULL,
    `image_url`			VARCHAR(200) NOT NULL,
    `description`		TEXT NOT NULL,
    `processing_steps`	TEXT NOT NULL,
    `user_id`			INT NOT NULL,
    `note`				VARCHAR(3000),
    `price`				FLOAT(10,2) default 0,
    `views`				INT,
    `create_date`		DATETIME default now(),
	FOREIGN KEY (`user_id`) REFERENCES User(id)
);

-- Create table `Ingredient`

DROP TABLE IF EXISTS `Ingredient`;
CREATE TABLE IF NOT EXISTS `Ingredient` ( 	
	id		INT		NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name`	VARCHAR(100)	NOT NULL,
    `unit`	VARCHAR(50)		NOT NULL
);

-- Create table `Recipe_Ingredient`

DROP TABLE IF EXISTS `Recipe_Ingredient`;
CREATE TABLE IF NOT EXISTS `Recipe_Ingredient` ( 	
	id 				INT UNIQUE	AUTO_INCREMENT,
	`recipe_id`		INT NOT NULL,
    `ingredient_id`	INT NOT NULL,
    `amount`		FLOAT(10,2)	NOT NULL,
    FOREIGN KEY	(`recipe_id`) REFERENCES `Recipe`(id),
    FOREIGN KEY (`ingredient_id`)	REFERENCES `Ingredient`(id),
    PRIMARY KEY(`recipe_id`, `ingredient_id`)
);

-- Create table `Voting`

DROP TABLE IF EXISTS `Voting`;
CREATE TABLE IF NOT EXISTS `Voting` ( 	
	id 				INT UNIQUE	AUTO_INCREMENT,
	`user_id`		INT NOT NULL,
    `recipes_id`	INT NOT NULL,
    `stars`			INT NOT NULL,
    `create_date`	DATE NOT NULL,
    FOREIGN KEY	(`user_id`) REFERENCES `User`(id),
    FOREIGN KEY (`recipes_id`)	REFERENCES `Recipe`(id),
    PRIMARY KEY(`user_id`, `recipes_id`)
);

-- Create table `Comment`

DROP TABLE IF EXISTS `Comment`;
CREATE TABLE IF NOT EXISTS `Comment` ( 	
	id 				INT 	UNIQUE	AUTO_INCREMENT,
	`user_id`		INT NOT NULL,
    `recipes_id`	INT		NOT NULL,
    `comment`		TEXT 	NOT NULL,
    `create_date`	DATE	NOT NULL,
    FOREIGN KEY	(`user_id`) 	REFERENCES `User`(id),
    FOREIGN KEY (`recipes_id`)	REFERENCES `Recipe`(id),
    PRIMARY KEY(`user_id`, `recipes_id`)
);


-- Create table wallet
DROP TABLE IF EXISTS  `Wallet`;
CREATE TABLE IF NOT EXISTS `Wallet` (
	`user_id`			INT NOT NULL,
    `so_dutk`			INT default 0,
    FOREIGN KEY (`user_id`) REFERENCES `User`(id)
);

-- Create table RecipePurchaseHistory
DROP TABLE IF EXISTS 	`Recipe_Purchase_History`;
CREATE TABLE IF NOT EXISTS `Recipe_Purchase_History` (
	`user_id`				INT NOT NULL,
    `recipes_id`			INT NOT NULL,
    `purchase_date`			DATETIME DEFAULT NOW(),
    FOREIGN KEY (`user_id`) REFERENCES User(id),
    FOREIGN KEY (`recipes_id`) REFERENCES `Recipe`(id)
);
-- Create table Registration_User_Token
DROP TABLE IF EXISTS Registration_User_Token;
CREATE TABLE IF NOT EXISTS Registration_User_Token (
	token_id				INT AUTO_INCREMENT PRIMARY KEY,
    token					CHAR(36) NOT NULL UNIQUE,
    `user_id`				INT NOT NULL,
    expiry_date				DATETIME NOT NULL,
    FOREIGN KEY(`user_id`)  REFERENCES `User`(id)
);

-- Create table Reset_Password_Token
DROP TABLE IF EXISTS Reset_Password_Token;
CREATE TABLE IF NOT EXISTS Reset_Password_Token (
	reset_id				INT AUTO_INCREMENT PRIMARY KEY,
    token					CHAR(36) NOT NULL UNIQUE,
    `user_id`				INT NOT NULL,
    expiry_date				DATETIME NOT NULL,
    FOREIGN KEY(`user_id`) REFERENCES `User`(id)
);