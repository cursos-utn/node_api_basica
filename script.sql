-- Adminer 4.7.1 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

CREATE DATABASE `curso_node` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `curso_node`;

DROP TABLE IF EXISTS `contacto`;
CREATE TABLE `contacto` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `telefono` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `contacto` (`id`, `nombre`, `apellido`, `telefono`) VALUES
(2,	'Joaquin',	'Michellin',	'1234455'),
(3,	'Maria Juana',	'Trapezoide',	'987654');

-- 2019-08-01 23:37:21