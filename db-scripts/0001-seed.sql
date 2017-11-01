CREATE TABLE `Media` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(255) NOT NULL,
    `comment` TEXT NOT NULL,
    `client_id` INT(11) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `User` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `trainer_id` INT(11) UNSIGNED NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `avatar_url` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `consultations_available` INT(11) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `Consultation` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `date_time` DATE NOT NULL,
    `trainer_id` INT(11) UNSIGNED NOT NULL,
    `client_id` INT(11) UNSIGNED NOT NULL,
    PRIMARY KEY (`id`)
);

ALTER TABLE Media ADD CONSTRAINT `fk_Media_client_id`
FOREIGN KEY(`client_id`)
REFERENCES User (`id`);

ALTER TABLE User ADD CONSTRAINT `fk_User_trainer_id`
FOREIGN KEY(`trainer_id`)
REFERENCES User (`id`);

ALTER TABLE Consultation ADD CONSTRAINT `fk_Consultation_trainer_id`
FOREIGN KEY(`trainer_id`)
REFERENCES User (`id`);

ALTER TABLE Consultation ADD CONSTRAINT `fk_Consultation_client_id`
FOREIGN KEY(`client_id`)
REFERENCES User (`id`);