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
INSERT INTO `user` VALUES (1,'user1@example.com','uioool','12346656781','AAD123456789','1990-01-15','2024-02-10 06:30:00','988346812','SAD',5000),(2,'user2@example.com','ddhfhd','9876543212','AAD987654321','1985-05-20','2024-02-10 07:00:00','988346811','SFFSG',5000),(3,'user3@example.com','dtjipj','987654326103','AAD345678910','1988-03-25','2024-02-10 08:30:00','98834680','dsg',5000),(4,'user4@example.com','aasdzsd','5678901299344','AAD678910111','1995-07-10','2024-02-10 09:00:00','98834689','dgn',5000),(5,'user5@example.com','fxhh','12309876545','AAD111213141','1982-11-05','2024-02-10 09:30:00','98834688','rhe',5000),(6,'user6@example.com','vkgkgk','78901234566','AAD131415161','1998-01-15','2024-02-10 10:00:00','98834687','xbf',5000),(7,'user7@example.com','zsfszf','23456789017','AAD161718192','1980-04-20','2024-02-10 10:30:00','98834686','sb',5000),(8,'user8@example.com','cvnvnv','89012345678','AAD212223242','1992-09-15','2024-02-10 11:00:00','98834685','dbfdbd',5000),(9,'user9@example.com','jlbljljn','45678901239','AAD252627282','1987-06-30','2024-02-10 11:30:00','98834684','bfdb',5000),(10,'user10@example.com','ccgmggvk','12345678900','AAD293031323','1993-12-10','2024-02-10 12:00:00','98834683','erg',5000),(11,'user11@example.com','dfxbcvb','987654321022','AAD333435363','1984-02-15','2024-02-10 12:30:00','98834682','xbfxb',5000),(12,'user12@example.com','hfkoobn','567890123433','AAD373839404','1996-05-20','2024-02-10 13:00:00','98834681','erge',5000),(13,'us2er1@example.com','uioool','1234622656781','AAD12342256789','1990-01-15','2024-02-10 01:00:00','9883246812','ergereg',5000),(14,'aviiva@gmail','afsaf','AJKF040','A2256789','1990-01-15','2024-02-10 01:00:00','8278371','erge',5000),(15,'av@gmmail','safsaf','ebrvbeb','asdee','1990-01-15','2024-02-10 01:00:00','78371','harkirat',5000),(16,'wojeejv','afwonua','',NULL,'1990-01-15','2024-02-10 01:00:00','88229911','opvwe',5000),(17,'s@@yahoas2do.com','sanju','iowrnrgoiwnrj','adawd','1990-01-15','2024-02-10 01:00:00','929801822','sanjasdaeev',5000),(18,'t@ubefbid','oopps','jkaen0039','jbif88233','1990-01-15','2024-02-10 01:00:00','817231000','tanya',5000),(19,'t@ubefssafabid','oopaefps','jkaesrgddn0039','jbrrsgifss88233','1990-01-15','2024-02-10 01:00:00','8172323133000','tanyaaefa',5000),(20,'hbhisbd','sklgl','FIUBnk933','AJDfnawd','1990-01-15','2024-02-10 01:00:00','9999222200','gau',5000),(21,'tag','tog','ksef','dka','1990-01-15','2024-02-10 01:00:00','11','talwinder',5000),(22,'aakk@g.com','haskoduwe','AJDBAJWFN','ADO038','1990-01-15','2024-02-10 01:00:00','892948917','avis',5000),(23,'aakwek@g.com','haskewoduwe','AJDeBAJWFN','ADOef038','1990-01-15','2024-02-10 01:00:00','8922948917','avis',5000),(24,'aakdswek@g.com','haskewoduwe','AJDeaBAJWFN','ADOesaf038','1990-01-15','2024-02-10 01:00:00','89222948917','avis',5000),(25,'asdfrrr@gmm.com','Adhsaaess','sdfsgttt','eeebbbddz','1990-01-15','2024-02-10 01:00:00','222948917','traviss',5000),(26,'rrtvus@g.com','$2b$10$OBTkIxxiB4SsYacRWG7MVuZIPJmsPRSGQTh095D/dG7IJhf6fEiKC','AJDddeaBAJWFN',NULL,'1990-01-15','2024-02-10 01:00:00','89092948917','aviss',5000),(27,'aa@jksgejkg.sa','$2b$10$knoy8HBDVtF8a7de3WuAF.scZEzRo6buMmWp5yCeCbA2iVjEI24O6','lksdn832','asda4353','1990-01-15','2024-02-10 01:00:00','832947991','thosa',5000),(28,'aa@sdfgs.dgd','$2b$10$kloI6L89mfNJfIvLTfTZz./9zyVIhlH309E6oXd8Byhw755knjzIm','dg23424','dfs2342','1990-01-15','2024-02-10 01:00:00','123113123','asdasdasd',5000),(29,'aaae@gmail.com','$2b$10$sshxVN5kUoKttxTG/P8mvuG6eX1ABrN.GlmgNeYuYsbFxX.v5/hZG','12e1233cc','wadwaw12','1990-01-15','2024-02-10 01:00:00','12344235','aedad',5000);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-26 13:41:43
