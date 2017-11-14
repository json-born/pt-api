CREATE DATABASE pt_api

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

CREATE TABLE `users` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` ENUM('trainer', 'client'),
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

CREATE TABLE `consultations` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `start_date` DATETIME NOT NULL,
    `end_date` DATETIME NOT NULL,
    `client_id` INT(11) UNSIGNED NOT NULL,
    `trainer_id` INT(11) UNSIGNED NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

ALTER TABLE media ADD CONSTRAINT `fk_media_trainer_id`
FOREIGN KEY(`trainer_id`)
REFERENCES users (`id`);

ALTER TABLE media ADD CONSTRAINT `fk_media_client_id`
FOREIGN KEY(`client_id`)
REFERENCES users (`id`);

ALTER TABLE users ADD CONSTRAINT `fk_user_trainer_id`
FOREIGN KEY(`trainer_id`)
REFERENCES users (`id`);

ALTER TABLE consultations ADD CONSTRAINT `fk_consultations_client_id`
FOREIGN KEY(`client_id`)
REFERENCES users (`id`);

ALTER TABLE consultations ADD CONSTRAINT `fk_consultations_trainer_id`
FOREIGN KEY(`trainer_id`)
REFERENCES users (`id`);