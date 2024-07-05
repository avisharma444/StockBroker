CREATE DATABASE  IF NOT EXISTS `zerodha` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `zerodha`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: zerodha
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('admin1','adminpassword1'),('admin10','adminpassword10'),('admin11','adminpassword11'),('admin12','adminpassword12'),('admin13','testpasss'),('admin14','tp'),('admin16','pass'),('admin2','adminpassword2'),('admin3','adminpassword3'),('admin4','adminpassword4'),('admin5','adminpassword5'),('admin6','adminpassword6'),('admin7','adminpassword7'),('admin8','adminpassword8'),('admin9','adminpassword9');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assetownership`
--

DROP TABLE IF EXISTS `assetownership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assetownership` (
  `stock_id` int NOT NULL,
  `company_name` varchar(255) NOT NULL,
  PRIMARY KEY (`stock_id`,`company_name`),
  UNIQUE KEY `stock_id_UNIQUE` (`stock_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assetownership`
--

LOCK TABLES `assetownership` WRITE;
/*!40000 ALTER TABLE `assetownership` DISABLE KEYS */;
INSERT INTO `assetownership` VALUES (1,'CompanyA'),(2,'CompanyB'),(3,'CompanyC'),(4,'CompanyD'),(5,'CompanyE'),(6,'CompanyF'),(7,'CompanyG'),(8,'CompanyH'),(9,'CompanyI'),(10,'CompanyJ'),(11,'CompanyK'),(12,'CompanyL'),(13,'CompanyA'),(14,'TATA');
/*!40000 ALTER TABLE `assetownership` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `belongsto`
--

DROP TABLE IF EXISTS `belongsto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `belongsto` (
  `user_id` int NOT NULL,
  `portfolio` int NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `supporter_id_UNIQUE` (`portfolio`),
  CONSTRAINT `belongsto_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `belongsto_ibfk_2` FOREIGN KEY (`portfolio`) REFERENCES `ticketsupporter` (`supporter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `belongsto`
--

LOCK TABLES `belongsto` WRITE;
/*!40000 ALTER TABLE `belongsto` DISABLE KEYS */;
INSERT INTO `belongsto` VALUES (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10),(11,11),(12,12);
/*!40000 ALTER TABLE `belongsto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company` (
  `name` varchar(255) NOT NULL,
  `current_profit_of_company` double NOT NULL,
  `net_turnover` double NOT NULL,
  `registration_number` varchar(255) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES ('CompanyA',1000000.5,5000000.75,'REG123456'),('CompanyB',750000.25,3000000.8,'REG987654'),('CompanyC',500000.75,2500000.5,'REG789012'),('CompanyD',650000.5,2800000.25,'REG345678'),('CompanyE',850000.25,4000000.8,'REG901234'),('CompanyF',720000.8,3500000.75,'REG567890'),('CompanyG',950000.4,5000000.6,'REG123456'),('CompanyH',620000.65,3200000.45,'REG789012'),('CompanyI',780000.45,4200000.3,'REG345678'),('CompanyJ',590000.3,2900000.2,'REG901234'),('CompanyK',720000.2,3800000.15,'REG567890'),('CompanyL',680000.15,3600000.1,'REG123456'),('TATA',32452,2352525,'REG1234124');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contains`
--

DROP TABLE IF EXISTS `contains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contains` (
  `user_id` int NOT NULL,
  `stock_id` int NOT NULL,
  `stocks_no` int NOT NULL,
  PRIMARY KEY (`stock_id`),
  KEY `contains_ibfk_1_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contains`
--

LOCK TABLES `contains` WRITE;
/*!40000 ALTER TABLE `contains` DISABLE KEYS */;
INSERT INTO `contains` VALUES (1,1,20),(2,2,15),(3,3,25),(4,4,18),(5,5,30),(6,6,15),(7,7,22),(8,8,35),(9,9,28),(10,10,20),(11,11,12),(12,12,17);
/*!40000 ALTER TABLE `contains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `handles`
--

DROP TABLE IF EXISTS `handles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `handles` (
  `admin_username` varchar(255) NOT NULL,
  `ticket_id` int NOT NULL,
  PRIMARY KEY (`admin_username`,`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `handles`
--

LOCK TABLES `handles` WRITE;
/*!40000 ALTER TABLE `handles` DISABLE KEYS */;
INSERT INTO `handles` VALUES ('admin1',1),('admin1',2),('admin10',10),('admin11',11),('admin12',12),('admin3',3),('admin4',4),('admin5',5),('admin6',6),('admin7',7),('admin8',8),('admin9',9);
/*!40000 ALTER TABLE `handles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marketwatch`
--

DROP TABLE IF EXISTS `marketwatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marketwatch` (
  `user_stock` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `stock_id` int DEFAULT NULL,
  PRIMARY KEY (`user_stock`),
  KEY `user_id_idx` (`user_id`),
  KEY `stock_id_idx` (`stock_id`),
  CONSTRAINT `fk_stock_id` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`stock_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marketwatch`
--

LOCK TABLES `marketwatch` WRITE;
/*!40000 ALTER TABLE `marketwatch` DISABLE KEYS */;
INSERT INTO `marketwatch` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10),(11,2,1),(12,2,2),(13,2,3),(14,2,4),(15,2,5),(16,2,6),(17,2,7),(18,2,8),(19,2,9),(20,2,10),(21,3,1),(22,3,2),(23,3,3),(24,3,4),(25,3,5),(26,3,6),(27,3,7),(28,3,8),(29,3,9),(30,3,10),(31,4,1),(32,4,2),(33,4,3),(34,4,4),(35,4,5),(36,4,6),(37,4,7),(38,4,8),(39,4,9),(40,4,10),(41,5,1),(42,5,2),(43,5,3),(44,5,4),(45,5,5),(46,5,6),(47,5,7),(48,5,8),(49,5,9),(50,5,10),(51,6,1),(52,6,2),(53,6,3),(54,6,4),(55,6,5),(56,6,6),(57,6,7),(58,6,8),(59,6,9),(60,6,10),(61,7,1),(62,7,2),(63,7,3),(64,7,4),(65,7,5),(66,7,6),(67,7,7),(68,7,8),(69,7,9),(70,7,10),(71,8,1),(72,8,2),(73,8,3),(74,8,4),(75,8,5),(76,8,6),(77,8,7),(78,8,8),(79,8,9),(80,8,10),(81,9,1),(82,9,2),(83,9,3),(84,9,4),(85,9,5),(86,9,6),(87,9,7),(88,9,8),(89,9,9),(90,9,10),(91,10,1),(92,10,2),(93,10,3),(94,10,4),(95,10,5),(96,10,6),(97,10,7),(98,10,8),(99,10,9),(100,10,10);
/*!40000 ALTER TABLE `marketwatch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderbook`
--

DROP TABLE IF EXISTS `orderbook`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderbook` (
  `orderbook_id` int NOT NULL AUTO_INCREMENT,
  `stock_id` int NOT NULL,
  `order_type` varchar(255) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`orderbook_id`),
  UNIQUE KEY `orderbook_id_UNIQUE` (`orderbook_id`),
  KEY `orderbook_ibfk_1` (`stock_id`),
  CONSTRAINT `orderbook_ibfk_1` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`stock_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderbook`
--

LOCK TABLES `orderbook` WRITE;
/*!40000 ALTER TABLE `orderbook` DISABLE KEYS */;
INSERT INTO `orderbook` VALUES (1,1,'Buy',1),(2,1,'Sell',1),(3,2,'Buy',1),(4,2,'Sell',1),(5,3,'Buy',1),(6,3,'Sell',1),(7,4,'Buy',1),(8,4,'Sell',1),(9,5,'Buy',1),(10,5,'Sell',1),(11,6,'Buy',1),(12,6,'Sell',1);
/*!40000 ALTER TABLE `orderbook` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio`
--

DROP TABLE IF EXISTS `portfolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio` (
  `user_id` int DEFAULT NULL,
  `stock_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio`
--

LOCK TABLES `portfolio` WRITE;
/*!40000 ALTER TABLE `portfolio` DISABLE KEYS */;
INSERT INTO `portfolio` VALUES (1,3,5);
/*!40000 ALTER TABLE `portfolio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registers`
--

DROP TABLE IF EXISTS `registers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registers` (
  `userid` int NOT NULL,
  `admin_username` varchar(255) DEFAULT NULL,
  `date_of_joining` timestamp NOT NULL,
  PRIMARY KEY (`userid`,`date_of_joining`),
  KEY `admin_username_idx` (`admin_username`),
  CONSTRAINT `admin_username` FOREIGN KEY (`admin_username`) REFERENCES `admin` (`username`),
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registers`
--

LOCK TABLES `registers` WRITE;
/*!40000 ALTER TABLE `registers` DISABLE KEYS */;
INSERT INTO `registers` VALUES (1,'admin1','2024-02-12 10:30:00'),(10,'admin10','2024-02-12 12:00:00'),(11,'admin11','2024-02-12 12:10:00'),(12,'admin12','2024-02-12 12:20:00'),(2,'admin2','2024-02-12 10:40:00'),(3,'admin3','2024-02-12 10:50:00'),(4,'admin4','2024-02-12 11:00:00'),(5,'admin5','2024-02-12 11:10:00'),(6,'admin6','2024-02-12 11:20:00'),(7,'admin7','2024-02-12 11:30:00'),(8,'admin8','2024-02-12 11:40:00'),(9,'admin9','2024-02-12 11:50:00');
/*!40000 ALTER TABLE `registers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `stock_id` int NOT NULL,
  `current_price` double NOT NULL,
  `last_traded_price` double NOT NULL,
  `created_at` timestamp NOT NULL,
  `quantity` int NOT NULL,
  `symbol` varchar(45) NOT NULL,
  PRIMARY KEY (`stock_id`),
  UNIQUE KEY `stock_id_UNIQUE` (`stock_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
INSERT INTO `stock` VALUES (1,50.25,180,'2024-02-10 04:30:00',122,'APPL'),(2,75.5,76.2,'2024-02-10 05:00:00',23,'GOOG'),(3,45.75,46.2,'2024-02-10 05:30:00',45,'INFY'),(4,80,78.5,'2024-02-10 06:00:00',6783,'ATK'),(5,55.5,54.8,'2024-02-10 06:30:00',345,'HTC'),(6,72.25,73,'2024-02-10 07:00:00',62,'LEO'),(7,68.75,70.2,'2024-02-10 07:30:00',33,'TYY'),(8,90.5,89.8,'2024-02-10 08:00:00',658,'AWE'),(9,62,63.5,'2024-02-10 08:30:00',234,'DSG'),(10,78.25,76.8,'2024-02-10 09:00:00',45,'WEFW'),(11,53,52.2,'2024-02-10 09:30:00',7,'FGDG'),(12,65.75,6445,'2024-02-10 10:00:00',463,'SDD');
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supportticket`
--

DROP TABLE IF EXISTS `supportticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supportticket` (
  `ticket_id` int NOT NULL,
  `status` tinyint(1) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`ticket_id`),
  UNIQUE KEY `ticket_id_UNIQUE` (`ticket_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supportticket`
--

LOCK TABLES `supportticket` WRITE;
/*!40000 ALTER TABLE `supportticket` DISABLE KEYS */;
INSERT INTO `supportticket` VALUES (101,1,'Issue resolved'),(102,0,'Pending investigation'),(103,1,'Issue resolved'),(104,0,'Pending investigation'),(105,1,'Issue resolved'),(106,0,'Pending investigation'),(107,1,'Issue resolved'),(108,0,'Pending investigation'),(109,1,'Issue resolved'),(110,0,'Pending investigation'),(111,1,'Issue resolved'),(112,0,'Pending investigation');
/*!40000 ALTER TABLE `supportticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticketsupporter`
--

DROP TABLE IF EXISTS `ticketsupporter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticketsupporter` (
  `supporter_id` int NOT NULL,
  `user_id` int NOT NULL,
  `ticket_id` int NOT NULL,
  PRIMARY KEY (`supporter_id`),
  UNIQUE KEY `supporter_id_UNIQUE` (`supporter_id`),
  UNIQUE KEY `ticket_id_UNIQUE` (`ticket_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `ticketsupporter_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticketsupporter`
--

LOCK TABLES `ticketsupporter` WRITE;
/*!40000 ALTER TABLE `ticketsupporter` DISABLE KEYS */;
INSERT INTO `ticketsupporter` VALUES (1,1,101),(2,2,102),(3,3,103),(4,4,104),(5,5,105),(6,6,106),(7,7,107),(8,8,108),(9,9,109),(10,10,110),(11,11,111),(12,12,112);
/*!40000 ALTER TABLE `ticketsupporter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `stock_id` int NOT NULL,
  `transaction_value` double NOT NULL,
  `transaction_type` varchar(5) NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`transaction_id`),
  UNIQUE KEY `transaction_id_UNIQUE` (`transaction_id`),
  KEY `user_id` (`user_id`),
  KEY `stock_id` (`stock_id`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `transactions_ibfk_2` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`stock_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,1,1,56.229,'buy',22),(2,2,1,56.22,'buy',32),(3,3,2,56.22,'buy',32),(4,4,2,764,'sell',234),(5,5,3,412,'buy',23),(6,6,3,4134,'buy',56),(7,7,4,142,'sell',324),(8,8,4,5432,'sell',5364),(9,9,5,452,'buy',567),(10,10,5,352,'buy',67),(11,11,6,252,'sell',234),(12,12,6,56.22,'sell',324),(13,1,4,320,'buy',4),(14,1,4,320,'buy',4),(15,1,2,75.5,'buy',1),(16,1,5,666,'buy',12),(17,1,3,45.75,'buy',1),(18,1,1,100.5,'sell',2),(19,28,1,50.25,'buy',1),(20,2,2,2332,'buy',3),(21,4,4,2412,'buy',5),(22,5,1,180,'buy',1),(23,27,1,180,'sell',1),(24,27,1,180,'buy',1),(25,5,1,180,'sell',1),(26,27,1,180,'buy',1),(27,5,1,180,'sell',1),(28,27,1,180,'buy',1),(29,5,1,180,'sell',1),(30,27,1,180,'buy',1),(31,5,1,180,'sell',1);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `PAN_card` varchar(255) NOT NULL,
  `Aadhar` varchar(255) DEFAULT NULL,
  `DateOfBirth` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `phone_no` varchar(45) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `balance` float DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `PAN_card_UNIQUE` (`PAN_card`),
  UNIQUE KEY `Aadhar_UNIQUE` (`Aadhar`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'user1@example.com','uioool','12346656781','AAD123456789','1990-01-15','2024-02-10 06:30:00','988346812','SAD',1000),(2,'user2@example.com','ddhfhd','9876543212','AAD987654321','1985-05-20','2024-02-10 07:00:00','988346811','SFFSG',5000),(3,'user3@example.com','dtjipj','987654326103','AAD345678910','1988-03-25','2024-02-10 08:30:00','98834680','dsg',5000),(4,'user4@example.com','aasdzsd','5678901299344','AAD678910111','1995-07-10','2024-02-10 09:00:00','98834689','dgn',16800),(5,'user5@example.com','fxhh','12309876545','AAD111213141','1982-11-05','2024-02-10 09:30:00','98834688','rhe',15980),(6,'user6@example.com','vkgkgk','78901234566','AAD131415161','1998-01-15','2024-02-10 10:00:00','98834687','xbf',5000),(7,'user7@example.com','zsfszf','23456789017','AAD161718192','1980-04-20','2024-02-10 10:30:00','98834686','sb',5000),(8,'user8@example.com','cvnvnv','89012345678','AAD212223242','1992-09-15','2024-02-10 11:00:00','98834685','dbfdbd',5000),(9,'user9@example.com','jlbljljn','45678901239','AAD252627282','1987-06-30','2024-02-10 11:30:00','98834684','bfdb',5000),(10,'user10@example.com','ccgmggvk','12345678900','AAD293031323','1993-12-10','2024-02-10 12:00:00','98834683','erg',5000),(11,'user11@example.com','dfxbcvb','987654321022','AAD333435363','1984-02-15','2024-02-10 12:30:00','98834682','xbfxb',5000),(12,'user12@example.com','hfkoobn','567890123433','AAD373839404','1996-05-20','2024-02-10 13:00:00','98834681','erge',5000),(13,'us2er1@example.com','uioool','1234622656781','AAD12342256789','1990-01-15','2024-02-10 01:00:00','9883246812','ergereg',5000),(14,'aviiva@gmail','afsaf','AJKF040','A2256789','1990-01-15','2024-02-10 01:00:00','8278371','erge',5000),(15,'av@gmmail','safsaf','ebrvbeb','asdee','1990-01-15','2024-02-10 01:00:00','78371','harkirat',5000),(16,'wojeejv','afwonua','',NULL,'1990-01-15','2024-02-10 01:00:00','88229911','opvwe',5000),(17,'s@@yahoas2do.com','sanju','iowrnrgoiwnrj','adawd','1990-01-15','2024-02-10 01:00:00','929801822','sanjasdaeev',5000),(18,'t@ubefbid','oopps','jkaen0039','jbif88233','1990-01-15','2024-02-10 01:00:00','817231000','tanya',5000),(19,'t@ubefssafabid','oopaefps','jkaesrgddn0039','jbrrsgifss88233','1990-01-15','2024-02-10 01:00:00','8172323133000','tanyaaefa',5000),(20,'hbhisbd','sklgl','FIUBnk933','AJDfnawd','1990-01-15','2024-02-10 01:00:00','9999222200','gau',5000),(21,'tag','tog','ksef','dka','1990-01-15','2024-02-10 01:00:00','11','talwinder',5000),(22,'aakk@g.com','haskoduwe','AJDBAJWFN','ADO038','1990-01-15','2024-02-10 01:00:00','892948917','avis',5000),(23,'aakwek@g.com','haskewoduwe','AJDeBAJWFN','ADOef038','1990-01-15','2024-02-10 01:00:00','8922948917','avis',5000),(24,'aakdswek@g.com','haskewoduwe','AJDeaBAJWFN','ADOesaf038','1990-01-15','2024-02-10 01:00:00','89222948917','avis',5000),(25,'asdfrrr@gmm.com','Adhsaaess','sdfsgttt','eeebbbddz','1990-01-15','2024-02-10 01:00:00','222948917','traviss',5000),(26,'rrtvus@g.com','$2b$10$OBTkIxxiB4SsYacRWG7MVuZIPJmsPRSGQTh095D/dG7IJhf6fEiKC','AJDddeaBAJWFN',NULL,'1990-01-15','2024-02-10 01:00:00','89092948917','aviss',5000),(27,'aa@jksgejkg.sa','$2b$10$knoy8HBDVtF8a7de3WuAF.scZEzRo6buMmWp5yCeCbA2iVjEI24O6','lksdn832','asda4353','1990-01-15','2024-02-10 01:00:00','832947991','thosa',8780),(28,'aa@sdfgs.dgd','$2b$10$kloI6L89mfNJfIvLTfTZz./9zyVIhlH309E6oXd8Byhw755knjzIm','dg23424','dfs2342','1990-01-15','2024-02-10 01:00:00','123113123','asdasdasd',5000),(29,'aaae@gmail.com','$2b$10$sshxVN5kUoKttxTG/P8mvuG6eX1ABrN.GlmgNeYuYsbFxX.v5/hZG','12e1233cc','wadwaw12','1990-01-15','2024-02-10 01:00:00','12344235','aedad',5000),(30,'asgg@gmail.com','$2b$10$3PBa1xiY9nq1TdYW46OH9.z2u2LMchAYkpU9FBSiTynHNyEOw6y56','ESFE234','RGKNOS302','1990-01-15','2024-02-10 01:00:00','82112314','avi ',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userstock`
--

DROP TABLE IF EXISTS `userstock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userstock` (
  `user_id` int NOT NULL,
  `GOOG` int NOT NULL DEFAULT '0',
  `APPL` int NOT NULL DEFAULT '0',
  `INFY` int NOT NULL DEFAULT '0',
  `MSFT` int NOT NULL DEFAULT '0',
  `GS` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  CONSTRAINT `fk_userstock_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userstock`
--

LOCK TABLES `userstock` WRITE;
/*!40000 ALTER TABLE `userstock` DISABLE KEYS */;
INSERT INTO `userstock` VALUES (1,20,22,23,24,25),(2,34,35,37,39,39),(3,44,44,45,56,46),(4,-4,66,67,78,89),(5,-16,33,44,54,56),(6,65,33,56,65,45),(7,55,56,78,89,122),(8,23,45,56,75,45),(9,23,45,56,75,45),(10,23,45,56,75,45),(11,23,45,56,75,45),(12,23,45,56,75,45),(13,23,45,56,75,45),(14,23,45,56,75,45),(15,23,45,56,75,45),(16,23,45,56,75,45),(17,23,45,56,75,45),(18,23,45,56,75,45),(19,23,45,56,75,45),(20,23,45,56,75,45),(21,23,45,56,75,45),(22,23,45,56,75,45),(23,23,45,56,75,45),(24,23,45,56,75,45),(25,23,45,56,75,45),(26,23,45,56,75,45),(27,23111,45,56,75,45),(28,23,45,56,75,45),(29,23,45,56,75,45),(30,23,45,56,75,45);
/*!40000 ALTER TABLE `userstock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userstocks`
--

DROP TABLE IF EXISTS `userstocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userstocks` (
  `user_stock` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `stock_id` int DEFAULT NULL,
  `purchased_at` float DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`user_stock`),
  KEY `fk_stock2_idx` (`stock_id`),
  KEY `fk_user1_idx` (`user_id`),
  CONSTRAINT `fk_stock1` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`stock_id`),
  CONSTRAINT `fk_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userstocks`
--

LOCK TABLES `userstocks` WRITE;
/*!40000 ALTER TABLE `userstocks` DISABLE KEYS */;
INSERT INTO `userstocks` VALUES (1,1,1,79.9854,76),(2,1,2,88.4036,65),(3,1,3,59.7996,54),(4,1,4,90.5608,91),(5,1,5,82.4587,90),(6,2,1,51.6674,89),(7,2,2,89.5525,81),(8,2,3,86.4906,90),(9,2,4,87.3494,69),(10,2,5,81.2232,50),(11,2,6,57.097,85),(12,2,7,53.8335,64),(13,2,8,58.9641,52),(14,2,9,85.816,71),(15,2,10,99.8281,85),(16,3,1,74.389,67),(17,3,2,64.9384,72),(18,3,3,64.3288,56),(19,3,4,87.8018,70),(20,3,5,89.2748,85),(21,4,1,56.0044,76),(22,4,2,60.6104,76),(23,4,9,97.5582,60),(24,4,10,58.1118,60),(25,5,1,76.1004,50),(26,5,2,72.9013,64),(27,5,3,50.2204,59),(28,5,4,98.0771,61),(29,5,5,61.4803,74),(30,5,6,85.4319,55),(31,5,7,69.8833,84),(32,5,8,58.8962,94),(33,5,9,90.0771,70),(34,5,10,81.3994,96),(35,6,1,85.8956,92),(36,6,2,99.421,73),(37,7,1,65.9383,61),(38,7,2,58.0391,56),(39,7,3,59.2973,76),(40,7,4,54.2973,93),(41,7,5,97.9726,63),(42,8,1,72.8043,74),(43,8,2,51.5272,86),(44,8,3,73.7794,62),(45,9,1,88.0641,54),(46,9,2,59.2024,82),(47,9,3,82.2691,65),(48,9,4,80.2919,55),(49,9,5,85.1245,60),(50,9,6,94.738,94),(51,9,7,83.9024,89),(52,9,8,91.5026,92),(53,10,1,83.4278,93),(54,10,2,61.6044,81),(55,10,3,69.6343,55),(56,10,4,68.6119,77),(57,10,5,76.9166,55);
/*!40000 ALTER TABLE `userstocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet`
--

DROP TABLE IF EXISTS `wallet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet` (
  `user_id` int NOT NULL,
  `bank_account` double NOT NULL,
  `balance` double NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  CONSTRAINT `wallet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet`
--

LOCK TABLES `wallet` WRITE;
/*!40000 ALTER TABLE `wallet` DISABLE KEYS */;
INSERT INTO `wallet` VALUES (1,12345678901234,5000.5),(2,98765432109876,10000.25),(3,45678901234567,8000.75),(4,78901234567890,15000.25),(5,23456789012345,6000.5),(6,89012345678901,12000.8),(7,34567890123456,10000.25),(8,90123456789012,20000.6),(9,56789012345678,7500.45),(10,12345678901234,18000.3),(11,67890123456789,3500.2);
/*!40000 ALTER TABLE `wallet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchlist`
--

DROP TABLE IF EXISTS `watchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watchlist` (
  `user_id` int NOT NULL,
  `stock_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`stock_id`),
  KEY `stock_id` (`stock_id`),
  CONSTRAINT `watchlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist`
--

LOCK TABLES `watchlist` WRITE;
/*!40000 ALTER TABLE `watchlist` DISABLE KEYS */;
INSERT INTO `watchlist` VALUES (1,1),(1,2),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(3,9),(9,9),(4,10),(10,10),(11,11),(12,12);
/*!40000 ALTER TABLE `watchlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-05 21:06:32
