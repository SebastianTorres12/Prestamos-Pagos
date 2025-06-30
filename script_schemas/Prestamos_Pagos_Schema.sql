CREATE DATABASE  IF NOT EXISTS `gestion_prestamos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `gestion_prestamos`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: gestion_prestamos
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cuota`
--

DROP TABLE IF EXISTS `cuota`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuota` (
  `id_cuota` bigint NOT NULL AUTO_INCREMENT COMMENT 'Identificador único de cada cuota, usado como clave primaria para rastrear individualmente cada pago asociado a un préstamo.',
  `capital_cuota` double NOT NULL COMMENT 'Monto del capital amortizado en esta cuota, parte del principal del préstamo que se paga en cada período.',
  `estado` varchar(255) NOT NULL COMMENT 'Estado de la cuota (por ejemplo, "pendiente", "pagada", "vencida"), usado para monitorear el cumplimiento de los pagos.',
  `fecha_pago` date DEFAULT NULL COMMENT 'Fecha en que se realizó o se espera realizar el pago de la cuota, relevante para seguimiento y reportes.',
  `fecha_vencimiento` date NOT NULL COMMENT 'Fecha límite para el pago de la cuota, usada para calcular intereses de mora si se paga después de esta fecha.',
  `interes_cuota` double NOT NULL COMMENT 'Monto de intereses generados para esta cuota, calculado según la tasa de interés del préstamo y el período.',
  `interes_mora` double DEFAULT NULL COMMENT 'Monto adicional por intereses de mora, aplicado si la cuota se paga después de fecha_vencimiento.',
  `monto_total_cuota` double NOT NULL COMMENT 'Monto total a pagar en la cuota, suma de capital_cuota e interes_cuota, más interes_mora si aplica.',
  `numero_cuota` int NOT NULL COMMENT 'Número secuencial de la cuota dentro del préstamo (por ejemplo, 1, 2, 3...), usado para ordenar y rastrear el cronograma de pagos.',
  `id_prestamo` bigint NOT NULL COMMENT 'Identificador del préstamo al que pertenece la cuota, vinculado a la tabla prestamo para asociar cada pago con su préstamo correspondiente.',
  PRIMARY KEY (`id_cuota`),
  KEY `FK6kxoctl4wm3wjq29ngy41qjrs` (`id_prestamo`),
  CONSTRAINT `FK6kxoctl4wm3wjq29ngy41qjrs` FOREIGN KEY (`id_prestamo`) REFERENCES `prestamo` (`id_prestamo`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuota`
--

LOCK TABLES `cuota` WRITE;
/*!40000 ALTER TABLE `cuota` DISABLE KEYS */;
INSERT INTO `cuota` VALUES (1,357.29371302410567,'Pagada','2025-03-06','2025-04-06',39.37500000000001,0,396.66871302410567,1,1),(2,360.4200330130666,'Pagada','2025-05-17','2025-05-06',36.248680011039085,0,396.66871302410567,2,1),(3,363.57370830193094,'Pagada','2025-05-17','2025-06-06',33.09500472217475,0,396.66871302410567,3,1),(4,366.7549782495728,'Pagada','2025-05-17','2025-07-06',29.913734774532855,0,396.66871302410567,4,1),(5,369.9640843092566,'Pagada','2025-05-17','2025-08-06',26.704628714849093,0,396.66871302410567,5,1),(6,373.2012700469626,'Pagada','2025-05-17','2025-09-06',23.4674429771431,0,396.66871302410567,6,1),(7,376.4667811598735,'Pagada','2025-05-17','2025-10-06',20.201931864232176,0,396.66871302410567,7,1),(8,379.7608654950224,'Pagada','2025-05-17','2025-11-06',16.90784752908328,0,396.66871302410567,8,1),(9,383.0837730681038,'Pagada','2025-05-17','2025-12-06',13.584939956001834,0,396.66871302410567,9,1),(10,386.43575608244976,'Pagada','2025-05-17','2026-01-06',10.232956941655926,0,396.66871302410567,10,1),(11,389.8170689481712,'Pagada','2025-05-17','2026-02-06',6.851644075934491,0,396.66871302410567,11,1),(12,393.2279683014677,'Pagada','2025-05-17','2026-03-06',3.4407447226379926,0,396.66871302410567,12,1),(13,160.91802397150926,'Pagada','2025-05-18','2025-06-17',13.125000000000002,0,174.04302397150926,1,3),(14,162.32605668125996,'Pagada','2025-05-18','2025-07-17',11.716967290249295,0,174.04302397150926,2,3),(15,163.74640967722098,'Pagada','2025-05-18','2025-08-17',10.29661429428827,0,174.04302397150926,3,3),(16,165.17919076189668,'Pagada','2025-05-18','2025-09-17',8.863833209612586,0,174.04302397150926,4,3),(17,166.62450868106328,'Pagada','2025-05-18','2025-10-17',7.418515290445989,0,174.04302397150926,5,3),(18,168.08247313202259,'Pagada','2025-05-18','2025-11-17',5.960550839486686,0,174.04302397150926,6,3),(19,169.55319477192776,'Pagada','2025-05-18','2025-12-17',4.4898291995814885,0,174.04302397150926,7,3),(20,171.03678522618213,'Pagada','2025-05-18','2026-01-17',3.0062387453271198,0,174.04302397150926,8,3),(21,172.53335709691123,'Pagada','2025-05-17','2026-02-17',1.5096668745980262,0,174.04302397150926,9,3),(22,163.0578875964397,'Pagada','2025-05-18','2025-06-18',8.75,0,171.8078875964397,1,5),(23,164.48464411290857,'Pagada','2025-05-18','2025-07-18',7.323243483531153,0,171.8078875964397,2,5),(24,165.9238847488965,'Pagada','2025-05-18','2025-08-18',5.884002847543203,0,171.8078875964397,3,5),(25,167.37571874044934,'Pagada','2025-05-18','2025-09-18',4.4321688559903585,0,171.8078875964397,4,5),(26,168.84025627942827,'Pagada','2025-05-18','2025-10-18',2.967631317011427,0,171.8078875964397,5,5),(27,170.3176085218733,'Pagada','2025-05-18','2025-11-18',1.4902790745664294,0,171.8078875964397,6,5),(28,163.0578875964397,'Pagada','2025-05-18','2025-06-18',8.75,0,171.8078875964397,1,6),(29,164.48464411290857,'Pagada','2025-05-18','2025-07-18',7.323243483531153,0,171.8078875964397,2,6),(30,165.9238847488965,'Pagada','2025-05-18','2025-08-18',5.884002847543203,0,171.8078875964397,3,6),(31,167.37571874044934,'Pagada','2025-05-18','2025-09-18',4.4321688559903585,0,171.8078875964397,4,6),(32,168.84025627942827,'Pagada','2025-05-18','2025-10-18',2.967631317011427,0,171.8078875964397,5,6),(33,170.3176085218733,'Pagada','2025-05-18','2025-11-18',1.4902790745664294,0,171.8078875964397,6,6),(34,163.0578875964397,'Pagada','2025-05-18','2025-06-18',8.75,0,171.8078875964397,1,9),(35,164.48464411290857,'Pagada','2025-05-18','2025-07-18',7.323243483531153,0,171.8078875964397,2,9),(36,165.9238847488965,'Pagada','2025-05-18','2025-08-18',5.884002847543203,0,171.8078875964397,3,9),(37,167.37571874044934,'Pagada','2025-05-18','2025-09-18',4.4321688559903585,0,171.8078875964397,4,9),(38,168.84025627942827,'Pagada','2025-05-18','2025-10-18',2.967631317011427,0,171.8078875964397,5,9),(39,170.3176085218733,'Pagada','2025-05-18','2025-11-18',1.4902790745664294,0,171.8078875964397,6,9),(40,163.0578875964397,'Pagada','2025-05-18','2025-06-18',8.75,0,171.8078875964397,1,12),(41,164.48464411290857,'Pagada','2025-05-18','2025-07-18',7.323243483531153,0,171.8078875964397,2,12),(42,165.9238847488965,'Pagada','2025-05-18','2025-08-18',5.884002847543203,0,171.8078875964397,3,12),(43,167.37571874044934,'Pagada','2025-05-18','2025-09-18',4.4321688559903585,0,171.8078875964397,4,12),(44,168.84025627942827,'Pagada','2025-05-18','2025-10-18',2.967631317011427,0,171.8078875964397,5,12),(45,170.3176085218733,'Pagada','2025-05-18','2025-11-18',1.4902790745664294,0,171.8078875964397,6,12),(46,163.0578875964397,'Pagada','2025-05-26','2025-06-18',8.75,0,171.8078875964397,1,11),(47,164.48464411290857,'Pagada','2025-05-27','2025-07-18',7.323243483531153,0,171.8078875964397,2,11),(48,165.9238847488965,'Pagada','2025-05-27','2025-08-18',5.884002847543203,0,171.8078875964397,3,11),(49,167.37571874044934,'Pagada','2025-05-27','2025-09-18',4.4321688559903585,0,171.8078875964397,4,11),(50,168.84025627942827,'Pagada','2025-05-27','2025-10-18',2.967631317011427,0,171.8078875964397,5,11),(51,170.3176085218733,'Pagada','2025-05-27','2025-11-18',1.4902790745664294,0,171.8078875964397,6,11),(52,163.0578875964397,'Pagada','2025-05-27','2025-06-27',8.75,0,171.8078875964397,1,18),(53,164.48464411290857,'Pendiente',NULL,'2025-07-27',7.323243483531153,0,171.8078875964397,2,18),(54,165.9238847488965,'Pendiente',NULL,'2025-08-27',5.884002847543203,0,171.8078875964397,3,18),(55,167.37571874044934,'Pendiente',NULL,'2025-09-27',4.4321688559903585,0,171.8078875964397,4,18),(56,168.84025627942827,'Pendiente',NULL,'2025-10-27',2.967631317011427,0,171.8078875964397,5,18),(57,170.3176085218733,'Pendiente',NULL,'2025-11-27',1.4902790745664294,0,171.8078875964397,6,18);
/*!40000 ALTER TABLE `cuota` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestamo`
--

DROP TABLE IF EXISTS `prestamo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prestamo` (
  `id_prestamo` bigint NOT NULL AUTO_INCREMENT COMMENT 'Identificador único de cada préstamo, usado como clave primaria y referenciado como clave foránea en la tabla cuota.',
  `estado_prestamo` varchar(255) NOT NULL COMMENT 'Estado actual del préstamo (por ejemplo, "pendiente", "aprobado", "pagado", "vencido"), usado para rastrear el progreso del préstamo.',
  `fecha_aprobacion` date DEFAULT NULL COMMENT 'Fecha en que el préstamo fue aprobado, relevante para el inicio del plazo de pago.',
  `fecha_solicitud` datetime DEFAULT NULL COMMENT 'Fecha y hora en que el usuario solicitó el préstamo, con precisión de microsegundos, para auditoría y seguimiento.',
  `monto_pendiente` double DEFAULT NULL COMMENT 'Monto restante por pagar del préstamo, actualizado con cada cuota pagada.',
  `monto_solicitado` double NOT NULL COMMENT 'Monto total solicitado por el usuario al iniciar el préstamo.',
  `monto_total` double DEFAULT NULL COMMENT 'Monto total a pagar, incluyendo principal y todos los intereses acumulados.',
  `plazo_meses` int NOT NULL COMMENT 'Duración del préstamo en meses, define el número de cuotas a pagar.',
  `tasa_interes` double NOT NULL COMMENT 'Tasa de interés aplicada al préstamo (por ejemplo, en porcentaje), usada para calcular intereses y cuotas.',
  `tipo_pago` varchar(255) NOT NULL COMMENT 'Tipo de pago o método de amortización (por ejemplo, "mensual fijo", "variable"), que define cómo se calculan las cuotas.',
  `id_usuario` bigint NOT NULL COMMENT 'Identificador del usuario que solicitó el préstamo, vinculado a la tabla usuario para rastrear al solicitante.',
  PRIMARY KEY (`id_prestamo`),
  KEY `FK5avf7s8x7uj7osdvn220wm79s` (`id_usuario`),
  CONSTRAINT `FK5avf7s8x7uj7osdvn220wm79s` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamo`
--

LOCK TABLES `prestamo` WRITE;
/*!40000 ALTER TABLE `prestamo` DISABLE KEYS */;
INSERT INTO `prestamo` VALUES (1,'CANCELADO','2025-03-06','2025-03-06 00:01:56',0,4500,4760.024556289268,12,10.5,'FRANCES',1),(2,'CANCELADO',NULL,'2025-04-27 15:44:46',1109.375,1000,1109.375,24,10.5,'ALEMAN',3),(3,'FINALIZADO','2025-05-17','2025-05-17 21:09:58',0.00000000000017053025658242404,1500,1566.3872157435833,9,10.5,'FRANCES',1),(4,'CANCELADO',NULL,'2025-05-18 00:11:17',2610.645359572639,2500,2610.645359572639,9,10.5,'FRANCES',1),(5,'FINALIZADO','2025-05-18','2025-05-18 00:18:57',0,1000,1030.8473255786382,6,10.5,'FRANCES',1),(6,'FINALIZADO','2025-05-18','2025-05-18 00:36:13',0,1000,1030.8473255786382,6,10.5,'FRANCES',1),(7,'CANCELADO',NULL,'2025-05-18 10:20:05',1030.8473255786382,1000,1030.8473255786382,6,10.5,'FRANCES',1),(8,'CANCELADO',NULL,'2025-05-18 11:06:05',1030.8473255786382,1000,1030.8473255786382,6,10.5,'FRANCES',1),(9,'FINALIZADO','2025-05-18','2025-05-18 11:12:01',0,1000,1030.8473255786382,6,10.5,'FRANCES',1),(10,'CANCELADO',NULL,'2025-05-18 12:04:31',1030.8473255786382,1000,1030.8473255786382,6,10.5,'FRANCES',1),(11,'FINALIZADO','2025-05-18','2025-05-18 12:07:19',0,1000,1030.8473255786382,6,10.5,'FRANCES',1),(12,'FINALIZADO','2025-05-18','2025-05-18 12:15:01',0,1000,1030.8473255786382,6,10.5,'FRANCES',1),(18,'ACTIVO','2025-05-27','2025-05-27 08:05:22',859.0394379821985,1000,1030.8473255786382,6,10.5,'FRANCES',3);
/*!40000 ALTER TABLE `prestamo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` bigint NOT NULL AUTO_INCREMENT COMMENT 'Identificador único del usuario, usado como clave primaria en la tabla usuario y referenciado como clave foránea en las tablas prestamo y cuota.',
  `apellido` varchar(50) NOT NULL COMMENT 'Apellido del usuario, obligatorio para identificación y registro.',
  `cedula` varchar(255) NOT NULL COMMENT 'Número de cédula o documento de identificación del usuario, usado para verificar su identidad en el sistema de gestión de préstamos.',
  `contrasena_hash` varchar(255) NOT NULL COMMENT 'Contraseña del usuario, almacenada en formato hash para garantizar la seguridad del acceso al sistema.',
  `correo` varchar(255) NOT NULL COMMENT 'Correo electrónico del usuario, usado para inicio de sesión y recuperación de contraseña.',
  `cuenta_bloqueada` bit(1) DEFAULT NULL COMMENT 'Indica si la cuenta del usuario está bloqueada (1 = bloqueada, 0 = activa), posiblemente debido a intentos fallidos de inicio de sesión.',
  `direccion` varchar(255) NOT NULL COMMENT 'Dirección física del usuario, útil para fines de contacto o verificación en el proceso de aprobación de préstamos.',
  `expiracion_token_recuperacion` datetime DEFAULT NULL COMMENT 'Fecha y hora de expiración del token de recuperación de contraseña, con precisión de microsegundos, usado para gestionar el proceso de restablecimiento de contraseña.',
  `fecha_creacion` datetime DEFAULT NULL COMMENT 'Fecha y hora de creación de la cuenta del usuario en el sistema, con precisión de microsegundos, para auditoría y seguimiento.',
  `fecha_desbloqueo` datetime DEFAULT NULL COMMENT 'Fecha y hora programada para el desbloqueo automático de la cuenta del usuario, si está bloqueada temporalmente.',
  `fecha_nac` date NOT NULL COMMENT 'Fecha de nacimiento del usuario, usada para calcular la edad y evaluar la elegibilidad para préstamos.',
  `historial_cred` int DEFAULT NULL COMMENT 'Puntaje del historial crediticio del usuario, usado para evaluar su capacidad de pago y riesgo crediticio al solicitar un préstamo.',
  `ingresos` double DEFAULT NULL COMMENT 'Ingresos mensuales del usuario, usados para determinar su capacidad de pago y el monto máximo del préstamo que puede solicitar.',
  `intentos_fallidos` int DEFAULT NULL COMMENT 'Número de intentos fallidos de inicio de sesión, usado para implementar medidas de seguridad como el bloqueo de la cuenta tras varios intentos fallidos.',
  `nombre` varchar(50) NOT NULL COMMENT 'Nombre del usuario, complementa el apellido para identificación y personalización en el sistema.',
  `rol` enum('ADMIN','USUARIO') NOT NULL COMMENT 'Rol del usuario en el sistema, usado para controlar permisos y acceso a funcionalidades del sistema.',
  `token_recuperacion` varchar(255) DEFAULT NULL COMMENT 'Token generado para el proceso de recuperación de contraseña, asociado con expiracion_token_recuperacion para validar su vigencia.',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `UK6lpw46du147baun4iyme6m6uk` (`cedula`),
  UNIQUE KEY `UK2mlfr087gb1ce55f2j87o74t` (`correo`),
  UNIQUE KEY `UK71sx3rqqapq5lx93qck2pq4t2` (`token_recuperacion`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Torres','1752935948','$2a$10$Z0A3uqwADP.2UpWd03Nh.OgpOe4iF5A/oKE7pMlthX.GoR6fVuW3i','sebastatoo9@gmail.com',_binary '\0','Guapulo',NULL,'2025-03-06 00:00:42',NULL,'2000-12-25',885,5000.5,0,'Sebastian','USUARIO',NULL),(3,'Cantuna','1753020393','$2a$10$H6q7P4An4qn/9imWWcMa1.yNj.1QPrJ65q3VN9Agd8ncKtTjhykiW','edcantuna@espe.edu.ec',_binary '\0','Inca',NULL,'2025-04-27 15:43:30',NULL,'2002-04-29',825,400,0,'David','USUARIO',NULL),(7,'Nazate','1752985698','$2a$10$rBfhVy8GAny/EkK8ckHyeeDmjtxJ7nZFHDlE3bCUPIvRlWHXW9FvG','jcnazate@espe.edu.ec',_binary '\0','Fajardo',NULL,'2025-05-18 16:44:45',NULL,'2000-06-25',NULL,NULL,0,'Cristina','USUARIO',NULL),(17,'Manager','87654321','$2a$10$C1rLO5cshTuWVqQDw2KYWeIjEi3kkWjQznUt5mwcTk.LzF6.9xXuO','admin2@example.com',_binary '\0','Av. Principal',NULL,'2025-05-18 16:59:29',NULL,'1985-07-20',NULL,NULL,0,'Admin','ADMIN',NULL),(22,'Roman','1752935468','$2a$10$Xo/.2Bw0UU5ZRAsq.mzij.bOOYhFaUmM1V.CA4wQHFurGqIlhxw/y','cmroman@espe.edu.ec',_binary '\0','Armenai',NULL,'2025-05-18 17:05:08',NULL,'2000-03-18',NULL,NULL,0,'Mateo','USUARIO',NULL),(23,'Manager','1752458934','$2a$10$yai1Ew4TE7fLv/ZJbi0f6.A1NWQRZUWOAv5sm1wrxSID1mKJaXboC','admin@example.com',_binary '\0','Av. Principal',NULL,'2025-05-18 17:05:09',NULL,'1985-07-20',NULL,NULL,0,'Admin','ADMIN',NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-30 17:27:03
