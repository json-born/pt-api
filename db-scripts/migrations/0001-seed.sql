﻿CREATE DATABASE pt_api;

SET GLOBAL time_zone = '+00:00';

CREATE TABLE `media` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `media_url` VARCHAR(255) NOT NULL,
    `comment` TEXT NOT NULL,
    `client_id` INT(11) UNSIGNED NOT NULL,
    `trainer_id` INT(11) UNSIGNED NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `user` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` ENUM('trainer', 'client') NOT NULL DEFAULT 'client',
    `trainer_id` INT(11) UNSIGNED,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `avatar_url` VARCHAR(255),
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `consultations_available` INT(11) UNSIGNED NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `consultation` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `start_date` DATETIME NOT NULL,
    `end_date` DATETIME NOT NULL,
    `client_id` INT(11) UNSIGNED NOT NULL,
    `trainer_id` INT(11) UNSIGNED NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

CREATE TABLE `trainer_availability` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `trainer_id` INT(11) UNSIGNED NOT NULL,
    `day_of_week` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
    `start_time` TIME NOT NULL,
    `end_time` TIME NOT NULL,
    PRIMARY KEY (`id`)
);

ALTER TABLE media ADD CONSTRAINT `fk_media_trainer_id`
FOREIGN KEY(`trainer_id`)
REFERENCES user (`id`);

ALTER TABLE media ADD CONSTRAINT `fk_media_client_id`
FOREIGN KEY(`client_id`)
REFERENCES user (`id`);

ALTER TABLE user ADD CONSTRAINT `fk_user_trainer_id`
FOREIGN KEY(`trainer_id`)
REFERENCES user (`id`);

ALTER TABLE consultation ADD CONSTRAINT `fk_consultations_client_id`
FOREIGN KEY(`client_id`)
REFERENCES user (`id`);

ALTER TABLE consultation ADD CONSTRAINT `fk_consultations_trainer_id`
FOREIGN KEY(`trainer_id`)
REFERENCES user (`id`);

ALTER TABLE trainer_availability ADD CONSTRAINT `fk_trainer_availability_trainer_id`
FOREIGN KEY(`trainer_id`)
REFERENCES user (`id`);

ALTER TABLE trainer_availability
ADD CONSTRAINT `uc_trainer_availability` UNIQUE (`trainer_id`,`day_of_week`);