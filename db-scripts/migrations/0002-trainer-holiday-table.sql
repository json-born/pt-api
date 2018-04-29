CREATE TABLE `trainer_holiday` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `trainer_id` int(11) unsigned NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_trainer_holidays_trainer_id` (`trainer_id`),
  CONSTRAINT `fk_trainer_holidays_trainer_id` FOREIGN KEY (`trainer_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1471 DEFAULT CHARSET=utf8;
