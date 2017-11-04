﻿CREATE DATABASE pt_api

CREATE TABLE `media` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(255) NOT NULL,
    `comment` TEXT NOT NULL,
    `client_id` INT(11) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `trainer_id` INT(11) UNSIGNED,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `avatar_url` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `consultations_available` INT(11) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `consultations` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `date_time` DATE NOT NULL,
    `client_id` INT(11) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`)
);

ALTER TABLE media ADD CONSTRAINT `fk_media_clients_id`
FOREIGN KEY(`client_id`)
REFERENCES users (`id`);

ALTER TABLE users ADD CONSTRAINT `fk_user_trainer_id`
FOREIGN KEY(`trainer_id`)
REFERENCES users (`id`);

ALTER TABLE consultations ADD CONSTRAINT `fk_consultations_client_id`
FOREIGN KEY(`client_id`)
REFERENCES users (`id`);