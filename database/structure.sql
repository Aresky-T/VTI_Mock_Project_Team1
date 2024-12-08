-- CREATE DATABASE
DROP DATABASE IF EXISTS `food_recipe_database`;

CREATE DATABASE `food_recipe_database`;

USE `food_recipe_database`;

-- food_recipe_database.`user` definition

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
    `id` int NOT NULL AUTO_INCREMENT,
    `avatar_url` text,
    `birth_date` date DEFAULT NULL,
    `email` varchar(50) NOT NULL,
    `first_name` varchar(50) NOT NULL,
    `gender` int DEFAULT NULL,
    `last_name` varchar(50) NOT NULL,
    `password` varchar(100) NOT NULL,
    `phone` varchar(50) DEFAULT NULL,
    `status` int NOT NULL,
    `username` varchar(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `user_uk1` (`email`),
    UNIQUE KEY `user_uk2` (`username`)
);

-- food_recipe_database.registration_user_token definition

DROP TABLE IF EXISTS `registration_user_token`;
CREATE TABLE `registration_user_token` (
    `token_id` int NOT NULL AUTO_INCREMENT,
    `expiry_date` datetime(6) NOT NULL,
    `token` varchar(36) NOT NULL,
    `user_id` int NOT NULL,
    PRIMARY KEY (`token_id`),
    UNIQUE KEY `registration_user_token_uk1` (`token`),
    CONSTRAINT `registration_user_token_fk1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

-- food_recipe_database.reset_password_token definition

DROP TABLE IF EXISTS `reset_password_token`;
CREATE TABLE `reset_password_token` (
    `reset_id` int NOT NULL AUTO_INCREMENT,
    `expiry_date` datetime(6) NOT NULL,
    `token` varchar(36) NOT NULL,
    `user_id` int NOT NULL,
    PRIMARY KEY (`reset_id`),
    UNIQUE KEY `reset_password_token_uk1` (`token`),
    CONSTRAINT `reset_password_token_fk1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

-- food_recipe_database.notification definition

DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
    `type` varchar(31) NOT NULL,
    `id` int NOT NULL AUTO_INCREMENT,
    `content` varchar(255) NOT NULL,
    `notification_date` datetime(6) NOT NULL,
    `seen` bit(1) NOT NULL,
    `receiver` int NOT NULL,
    `sender` int,
    PRIMARY KEY (`id`),
    CONSTRAINT `notification_fk1` FOREIGN KEY (`sender`) REFERENCES `user` (`id`) ON DELETE SET NULL,
    CONSTRAINT `notification_fk2` FOREIGN KEY (`receiver`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

-- food_recipe_database.`point` definition

DROP TABLE IF EXISTS `point`;
CREATE TABLE `point` (
    `id` int NOT NULL AUTO_INCREMENT,
    `point` int NOT NULL DEFAULT '0',
    `user_id` int NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `point_uk1` (`user_id`),
    CONSTRAINT `point_fk1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

-- food_recipe_database.point_history definition

DROP TABLE IF EXISTS `point_history`;
CREATE TABLE `point_history` (
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` int NOT NULL,
    `activity_name` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `point_changed` int NOT NULL DEFAULT '0',
    `changed_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `point_history_fk1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

-- food_recipe_database.recipe definition

DROP TABLE IF EXISTS `recipe`;
CREATE TABLE `recipe` (
    `id` int NOT NULL AUTO_INCREMENT,
    `create_date` datetime(6) NOT NULL,
    `description` text NOT NULL,
    `image_url` varchar(255) NOT NULL,
    `name` varchar(200) NOT NULL,
    `note` text,
    `point` int NOT NULL DEFAULT '0',
    `update_date` datetime(6) NOT NULL,
    `views` int NOT NULL DEFAULT '0',
    `creator_id` int NOT NULL,
    `code` varchar(20) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `recipe_uk1` (`name`),
    UNIQUE KEY `recipe_uk2` (`code`),
    CONSTRAINT `recipe_fk1` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

-- food_recipe_database.recipe_ingredient definition

DROP TABLE IF EXISTS `recipe_ingredient`;
CREATE TABLE `recipe_ingredient` (
    `id` int NOT NULL AUTO_INCREMENT,
    `amount` float NOT NULL,
    `name` varchar(255) NOT NULL,
    `unit` varchar(50) NOT NULL,
    `recipe_id` int NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `recipe_ingredient_fk1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

-- food_recipe_database.recipe_step definition

DROP TABLE IF EXISTS `recipe_step`;
CREATE TABLE `recipe_step` (
    `id` int NOT NULL AUTO_INCREMENT,
    `description` text NOT NULL,
    `duration` varchar(100) DEFAULT NULL,
    `image_url` varchar(255) DEFAULT NULL,
    `name` varchar(255) DEFAULT NULL,
    `step_number` int NOT NULL,
    `recipe_id` int NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `recipe_step_fk1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE
);

-- food_recipe_database.recipe_owner definition

DROP TABLE IF EXISTS `recipe_owner`;
CREATE TABLE `recipe_owner` (
    `owner_id` int NOT NULL,
    `recipe_id` int NOT NULL,
    `is_creator` bit(1) NOT NULL,
    PRIMARY KEY (`owner_id`, `recipe_id`),
    KEY `recipe_owner_fk1`(`owner_id`),
    KEY `recipe_owner_fk2`(`recipe_id`),
    CONSTRAINT `recipe_owner_fk1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    CONSTRAINT `recipe_owner_fk2` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE
);

-- food_recipe_database.recipe_transaction definition

DROP TABLE IF EXISTS `recipe_transaction`;
CREATE TABLE `recipe_transaction` (
    `id` int NOT NULL AUTO_INCREMENT,
    `cost` int NOT NULL,
    `recipe_id` int NOT NULL,
    `user_id` int NOT NULL,
    `transaction_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `recipe_transaction_fk1`(`recipe_id`),
    KEY `recipe_transaction_fk2`(`user_id`),
    UNIQUE KEY `recipe_transaction_uk1` (`recipe_id`, `user_id`, `transaction_date`),
    CONSTRAINT `recipe_transaction_fk1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE,
    CONSTRAINT `recipe_transaction_fk2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
);

-- food_recipe_database.voting definition

DROP TABLE IF EXISTS `voting`;
CREATE TABLE `voting` (
    `recipe_id` int NOT NULL,
    `user_id` int NOT NULL,
    `create_date` datetime(6) NOT NULL,
    `stars` int NOT NULL DEFAULT '0',
    PRIMARY KEY (`recipe_id`, `user_id`),
    CONSTRAINT `voting_fk1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    CONSTRAINT `voting_fk2` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE
);

-- food_recipe_database.voting_statistic definition

DROP TABLE IF EXISTS `voting_statistic`;
CREATE TABLE `voting_statistic` (
    `id` int NOT NULL AUTO_INCREMENT,
    `total_stars` double NOT NULL,
    `vote_count` int NOT NULL,
    `recipe_id` int NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `voting_statistic_uk1` (`recipe_id`),
    CONSTRAINT `voting_statistic_fk1` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE
);

-- food_recipe_database.comment definition

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `user_id` int NOT NULL,
    `recipe_id` int NOT NULL,
    `parent_comment_id` bigint DEFAULT NULL,
    `message` text NOT NULL,
    `sub_comment_count` int NOT NULL DEFAULT '0',
    `level` enum('TOP', 'MID', 'LOW') NOT NULL DEFAULT 'TOP',
    `user_role` enum('CREATOR', 'OWNER', 'NORMAL') NOT NULL DEFAULT 'NORMAL',
    `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    CONSTRAINT `comment_fk1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
    CONSTRAINT `comment_fk2` FOREIGN KEY (`recipe_id`) REFERENCES `recipe` (`id`) ON DELETE CASCADE,
    CONSTRAINT `comment_fk3` FOREIGN KEY (`parent_comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE,
    CONSTRAINT `comment_chk1` CHECK ((`sub_comment_count` >= 0)),
    CONSTRAINT `comment_chk2` CHECK (
        (
            (
                (`level` = _utf8mb4 'TOP')
                and (`parent_comment_id` is null)
            )
            or (
                (`level` <> _utf8mb4 'TOP')
                and (
                    `parent_comment_id` is not null
                )
            )
        )
    )
);

-- food_recipe_database.food_group definition
-- DROP TABLE IF EXISTS `food_group`;
-- CREATE TABLE `food_group` (
--     `id` int NOT NULL AUTO_INCREMENT,
--     `created_at` datetime(6) NOT NULL,
--     `description` text NOT NULL,
--     `name` varchar(100) NOT NULL,
--     `recipe_count` int NOT NULL,
--     `updated_at` datetime(6) NOT NULL,
--     PRIMARY KEY (`id`),
--     UNIQUE KEY `UK_a935bmmnn6yvyc46tv5rkwcyq` (`name`),
--     CONSTRAINT `food_group_chk_1` CHECK ((`recipe_count` >= 0))
-- );

-- food_recipe_database.food_region definition

-- DROP TABLE IF EXISTS `food_region`;
-- CREATE TABLE `food_region` (
--     `id` int NOT NULL AUTO_INCREMENT,
--     `created_at` datetime(6) NOT NULL,
--     `description` text NOT NULL,
--     `famous_for` text NOT NULL,
--     `image_url` varchar(255) DEFAULT NULL,
--     `name` varchar(100) NOT NULL,
--     `type` varchar(255) NOT NULL,
--     `updated_at` datetime(6) NOT NULL,
--     PRIMARY KEY (`id`),
--     UNIQUE KEY `UK_cfx2svvsmdmgbcolfdsjquhry` (`name`)
-- );