CREATE DATABASE  IF NOT EXISTS `university` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `university`;
-- MySQL dump 10.13  Distrib 5.7.25, for Win64 (x86_64)
--
-- Host: localhost    Database: university
-- ------------------------------------------------------
-- Server version	5.7.25-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `faculty`
--

DROP TABLE IF EXISTS `faculty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faculty` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `established` varchar(45) DEFAULT NULL,
  `telephone` varchar(150) DEFAULT NULL,
  `webSite` varchar(45) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faculty`
--

LOCK TABLES `faculty` WRITE;
/*!40000 ALTER TABLE `faculty` DISABLE KEYS */;
INSERT INTO `faculty` VALUES (1,'Elektrotehnički fakultet','Patre 5, 78000 Banja Luka','1962','+387 51 221 824','www.etf.unibl.org',0),(2,'Ekonomski fakultet','Majke Jugovića 4, 78000 Banja Luka','1975','+387 51 430 010','www.ef.unibl.org',0),(3,'Arhitektonsko-građevinsko-geodetski fakultet','Bulevar vojvode Stepe Stepanovića 77, 78000 Banja Luka','1996','+387 51 462 543','www.aggf.unibl.org',0),(4,'Mašinski fakultet','Bulevar vojvode Stepe Stepanovića 71, 78000 Banja Luka','1971','+387 51 433 000','www.mf.unibl.org',0),(5,'Medicinski fakultet','Save Mrkalja 14, 78000 Banja Luka','1978','+387 51 234 100, 215 454','www.med.unibl.org',0),(6,'Akademija umjetnosti','Bulevar vojvode Petra Bojovića 1A, 78000 Banja Luka','1998','+387 51 348 800','www.au.unibl.org',0),(7,'Poljoprivredni fakultet','Bulevar vojvode Petra Bojovića 1A, 78000 Banja Luka','1992','+387 51 312 390','www.agro.unibl.org',0),(8,'Pravni fakultet','Bulevar vojvode Stepe Stepanovića 77, 78000 Banja Luka','1975','+387 51 339 001','www.pf.unibl.org',0),(9,'Prirodno-­matematički fakultet',' 	Mladena Stojanovića 2, 78000 Banja Luka','1996','+387 51 319 142','www.pmf.unibl.org',0),(10,'Rudarski fakultet','Save Kovačevića bb, 79101 Prijedor','2009','+387 52 241 660','www.rf.unibl.org',0),(11,'Tehnološki fakultet',' 	Bulevar vojvode Stepe Stepanovića 73, 78000 Banja Luka','1975','+387 51 434 357','www.tf.unibl.org',0),(12,'Fakultet bezbjednosnih nauka','Bulevar vojvode Živojina Mišića 10 a, 78000 Banja Luka','2017','+387 51 333 603','www.fbn.unibl.org',0),(13,'Fakultet političkih nauka','Bulevar vojvode Petra Bojovića 1A,  78000 Banja Luka','2009','+387 51 304 001','www.fpn.unibl.org',0),(14,'Fakultet fizičkog vaspitanja i sporta','Bulevar vojvode Petra Bojovića 1A, 78000 Banja Luka','2001','+387 51 312 280','www.ffvs.unibl.org',0),(15,'Filološki fakultet','Bulevar vojvode Petra Bojovića 1A, 78000 Banja  Luka','2009','+387 51 340 120','www.flf.unibl.org',0),(16,'Filozofski fakultet','Bulevar vojvode Petra Bojovića 1A, 78000 Banja  Luka','1994','+387 51 322 780','https://ff.unibl.org/',0),(17,'Šumarski fakultet','Bulevar vojvode Stepe Stepanovića 75a, 78000 Banja Luka','1993','+387 51 464 628','www.sf.unibl.org',0);
/*!40000 ALTER TABLE `faculty` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `study_program`
--

DROP TABLE IF EXISTS `study_program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `study_program` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `code` varchar(45) NOT NULL,
  `cycle` int(11) NOT NULL,
  `duration` varchar(45) DEFAULT NULL,
  `totalECTS` int(11) DEFAULT NULL,
  `idFaculty` int(11) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_study_program_faculty_idx` (`idFaculty`),
  CONSTRAINT `fk_study_program_faculty` FOREIGN KEY (`idFaculty`) REFERENCES `faculty` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `study_program`
--

LOCK TABLES `study_program` WRITE;
/*!40000 ALTER TABLE `study_program` DISABLE KEYS */;
INSERT INTO `study_program` VALUES (1,'Računarstvo i informatika','RI',1,'VIII semestara',240,1,0),(2,'Elektronika i telekomunikacije','ET',1,'VIII semestara',240,1,0),(3,'Elektroenergetika i automatika','EA',1,'VIII semestara',240,1,0),(4,'Računarstvo i informatika','RI',2,'null',0,1,0),(5,'Proizvodno mašinstvo','PM',1,'VI semestara',180,4,0),(6,'Energetsko i proizvodno mašinstvo','EPM',1,'VI semestara',180,4,0),(7,'Mehatronika','MT',1,'VII semestara',180,4,0);
/*!40000 ALTER TABLE `study_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subject` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `code` varchar(45) NOT NULL,
  `ects` int(11) NOT NULL,
  `numberOfClasses` varchar(50) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `idFaculty` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_subject_faculty_idx` (`idFaculty`),
  CONSTRAINT `fk_subject_faculty` FOREIGN KEY (`idFaculty`) REFERENCES `faculty` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (1,'Programiranje I','2227',6,'2+2+1',0,1),(2,'Osnovi računarske tehnike','2228',7,'3+2+1',0,1),(3,'Matematika I','2225',7,'3+3+0',0,1),(4,'Baze podataka','2261',6,'3+0+2',0,1),(5,'Projektovanje softvera','2263',6,'3+0+2',0,1),(6,'Internet programiranje','2279',6,'3+0+2',0,1),(7,'Impulsna elektronika','2314',6,'3+2+1',0,1),(8,'Računarska elektronika','2327',6,'2+1+2',0,1),(9,'Elektrane','2358',6,'3+2+0',0,1),(10,'Elektromotorni pogoni','2368',6,'2+2+1',0,1),(11,'Digitalna obrada signala','2316',5,'2+1+1',0,1),(12,'Linearna elektronika','2250',7,'3+2+1',0,1),(13,'Računarske mreže','2252',5,'2+0+2',0,1),(14,'Internet tehnologije','2270',5,'2+0+2',0,1);
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject_on_study_program`
--

DROP TABLE IF EXISTS `subject_on_study_program`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subject_on_study_program` (
  `idSubject` int(11) NOT NULL,
  `idStudyProgram` int(11) NOT NULL,
  `typeOfSubject` varchar(45) DEFAULT NULL,
  `semester` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idSubject`,`idStudyProgram`),
  KEY `fk_contain_study_program1_idx` (`idStudyProgram`),
  CONSTRAINT `fk_contain_study_program1` FOREIGN KEY (`idStudyProgram`) REFERENCES `study_program` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_contain_subject1` FOREIGN KEY (`idSubject`) REFERENCES `subject` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject_on_study_program`
--

LOCK TABLES `subject_on_study_program` WRITE;
/*!40000 ALTER TABLE `subject_on_study_program` DISABLE KEYS */;
INSERT INTO `subject_on_study_program` VALUES (1,1,'Obavezan','I'),(1,2,'Obavezan','I'),(2,1,'Obavezan','I'),(3,1,'Obavezan','I'),(3,2,'Obavezan','I'),(3,3,'Obavezan','I'),(4,1,'Obavezan','VI'),(5,1,'Obavezan','VI'),(6,1,'Obavezan','VII'),(7,2,'Obavezan','V'),(8,2,'Obavezan','VII'),(9,3,'Izborni','VII'),(10,3,'Izborni','VII'),(11,2,'Obavezan','V'),(12,2,'Obavezan','IV'),(13,1,'Obavezan','V'),(14,1,'Obavezan','VI');
/*!40000 ALTER TABLE `subject_on_study_program` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'university'
--

--
-- Dumping routines for database 'university'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-09 20:25:42
