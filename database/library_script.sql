CREATE DATABASE  IF NOT EXISTS `library` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `library`;
-- MySQL dump 10.13  Distrib 5.7.25, for Win64 (x86_64)
--
-- Host: localhost    Database: library
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
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `numberOfPages` varchar(20) DEFAULT NULL,
  `isbn` varchar(100) DEFAULT NULL,
  `publisher` varchar(100) NOT NULL,
  `yearPublication` varchar(20) DEFAULT NULL,
  `about` varchar(1000) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES (1,'Zaboravljeni vrt','Kejt Morton','drama','528','978-98-663-6962-9','Allen & Unwin','2008','Neodoljivi roman očaravajuće atmosfere, priča o tajnama, porodici i uspomenama. Dobitnica nagrade Australijskog udruženja izdavača Knjiga godine.',0),(2,'Koreni','Dobrica Ćosić','klasik','376','978-86-521-2078-9','Laguna','2015','Koreni su biografija naroda i autobiografija pisca koji je postao sopstveni književni lik, manje Ćosić iz neznane Velike Drenove, a više znameniti Katić iz ovekovečenog Prerova. Koreni su zasađeni u noći istorije, a izdanci dovedeni do naših dana u možda najdužem rukopisu posle naše nepisane poezije. Pesnik je nadživeo svoju ideologiju da bi ga nadživela poezija ispisana na stranicama koje nemaju strana.',0),(3,'Veliki juriš','Slobodan Vladušić','triler','487','978-86-521-3014-6','Laguna','2018','Roman o ljudima koji su se vratili iz zaborava. Na velika vrata vrativši u našu književnost temu srpskog stradanja i heroizma u Prvom svetskom ratu, Slobodan Vladušić pokazuje kako nacionalno i kosmopolitsko, upravo kao i tradicionalno i savremeno, mogu da imaju smisla jedino ukoliko koračaju zajedno. Veliki juriš je otelotvorenje tog prožimanja.',0),(4,'Hipi','Paulo Koeljo','drama','253','978-86-521-3092-4','Laguna','2018','Imali su dugu kosu, nosili šarenu odeću, nisu čitali novine, a smatralo se da su „opasnost za društvo i pretnja pristojnom ponašanju“...\n\nU svom novom romanu Hipi Koeljo ispreda priču o Paulu, brazilskom mladiću s kozjom bradicom i dugačkom kosom, koji želi da postane pisac i kreće na putovanje u potrazi za dubljim smislom svog života. Prvo odlazi poznatim „Vozom smrti\" u Boliviju, zatim u Peru, pa autostopom kroz Čile i Argentinu, i najzad stiže u Amsterdam, pun mladih ljudi koji nose živopisnu odeću i pale mirišljave štapiće, meditiraju i igraju uz muziku, dok razgovaraju o seksualnim slobodama, širenju svesti.\n',0),(5,'Dah života ','Pol Kalaniti','drama','224','978-86-521-2282-0','Laguna','2016','Memoari Pola Kalanitija, posthumno objavljeni pod naslovom Dah života, poseduju težinu i mudrost starogrčke tragedije. Kalaniti svoju hroniku pretače u svedenu, divnu prozu, a njegov pripovedački glas je toliko samopouzdan i moćan da očekujemo da će preživeti sopstvenu smrt i nastaviti da opisuje šta se događa s njegovim prijateljima i porodicom sad kada njega više nema.',0),(6,'Molitva moru','Haled Hoseini','drama','56','978-86-521-3128-0','Laguna','2018','Na mesečinom obasjanoj plaži otac drži usnulog sina u naručju dok čekaju svanuće i dolazak broda. Priča svom sinu o dugom letu njegovog detinjstva, seća se kuće svog oca u Siriji, njihanja maslina na vetru, meketanja majčinih koza, zveketa lonaca i šerpi. Seća se i živahnog grada Homsa, prepunih ulica, džamije i velike pijace iz vremena pre nego što je nebo počelo da bljuje bombe, pre nego što su morali da pobegnu.\n\nS izlaskom sunca oni i svi oko njih skupljaju svoje stvari i i polaze na opasnu plovidbu u potrazi za novim domom.',0),(7,'Čovek po imenu Uve','Fredrik Bakman','drama/komedija','360','978-86-521-2465-7','Laguna','2017','Bakmanova vedra priča o ogorčenom starom komšiji ujedno je i veoma promišljeno istraživanje o tome kako nečiji život može imati snažan uticaj na bezbroj drugih. Da postoji nagrada za najšarmantniju knjigu godine, ovaj roman švedskog blogera koji se preko noći pretvorio u senzaciju dobio bi je bez ikakve sumnje.',0),(8,'Misterija tri četvrtine','Agata Kristi','triler','344','97886-521-3326-0','Laguna','2019','Vraćajući se jednog dana s ručka, Herkul Poaro ispred svoje kuće zatiče besnu ženu. Ona zahteva da joj se objasni zašto joj je Poaro poslao pismo kojim je optužuje za ubistvo Barnabasa Pandija, čoveka za koga nikad nije čula niti ga je upoznala.\n\nNi Poaro nikad nije čuo za Barnabasa Pandija niti je koga optužio za ubistvo. Uzrujan, ulazi u kuću gde saznaje da ga čeka posetilac – muškarac koji takođe tvrdi da je tog jutra dobio pismo u kojem ga Poaro optužuje za ubistvo Barnabasa Pandija.\n\nPoaro se pita koliko je još takvih pisama poslato u njegovo ime. Ko ih je poslao i zašto? Što je još važnije, ko je Barnabas Pandi, da li je mrtav, a ako je mrtav, da li je ubijen? Može li Poaro pronaći odgovore a da pritom ne ugrozi još neki život? ',0),(9,'Feliks','Vladimir Kecmanović','drama','264','978-86-521-3224-9','Laguna','2019','Roman Feliks ima jedan mnogo širi kontekst od priče o dva lika koji lažima i obmanama dolaze do svojih ciljeva. Taj kontekst govori o celom svetu, ovom u kojem živimo. Svetu u kojem je sve postalo relativno, i istina i laž. U takvom svetu ovakva dva antiheroja postaju romantični junaci koji više vole da varaju nego da budu prevareni. A njihove sitne prevare možda su zapravo pobuna protiv sistema. Bez obzira na to da li smo ovde ili na nekom drugom kraju sveta.',0),(10,'Alef','Horhe Luis Borhes','priče','184','978-86-521-3220-1','Laguna','2019','Dvojica hrišćanskih teologa vode žučnu raspravu o Svetom pismu. Vojnik tek na bojnom polju shvata ko je on zapravo. Mlada žena priprema perfidnu osvetu navodnom ubici svog oca. Muškarac u jednoj gostionici u Buenos Ajresu čeka na svog ubicu. Nacista se – bez trunčice griže savesti i nagoveštaja pokajanja – priseća vremena kada je bio čuvar u koncentracionom logoru.\n\nIako su priče u Alefu ispunjene filozofskim zagonetkama i gotovo natprirodnim neobičnostima, one nam dočaravaju izgrađenije ljudske karaktere, možda i više nego ostale Borhesove pripovedačke knjige. Čak se ni pitanja besmrtnosti, večnosti, vremena i beskonačnosti ne gube u čistoj apstrakciji, već zadiru u zaplet i sintaksu ispitujući granice jezika i izrecivosti.',0),(11,'Pobednik je sam','Paulo Koeljo','drama','416','978-86-521-2641-5','Laguna','2017','Napeta priča koja sledi je ogledalo sveta u kojem živimo, gde nas trka za bogatstvom i uspehom često sprečava da čujemo ono što nam srce šapuće.\n\nKoeljo nas vodi na Kanski filmski festival, gde se okupljaju slavne ličnosti iz sveta mode i filma. Neke od njih su se uspele do samog vrha i strahuju da ne padnu sa tih visina. Jer novac, moć i slava za njih su ulozi zbog kojih su spremni na sve, po bilo koju cenu.\n\nU ovom savremenom vašaru taštine sreću se ruski milioner Igor Malev, modni kreator i magnat Hamid Husein, američka glumica Gabrijela, ambiciozni detektiv Savoj, koji se nada da će rešiti slučaj svog života, i Jasmin, manekenka na pragu uspešne modne karijere. Kome će od njih poći za rukom da prepozna svoj sopstveni, nepatvoren san među avetnim snovima koji ih okružuju, i ko će uspeti da ga na kraju i ostvari?',0),(12,'Biti kao reka','Paulo Koeljo','priče','266','978-86-521-2195-3','Laguna','2016','Obišao sam mnoga mesta i promenio više zemalja nego čarapa, kako bi rekao Bertolt Breht. Stranice koje slede sadrže neke trenutke koje sam proživeo, priče koje su mi drugi pričali ili misli koje su mi se javljale dok sam prevaljivao određene deonice reke svog života.\n\nSedam godina razmišljanja, putovanja i susreta dovelo je pisca ovih neodoljivih zapisa do otkrića fascinantne filozofije života. Koeljo je zavodljiv pripovedač koji inspiriše ljude širom sveta da iza običnog i pojavnog vidi nesvakidašnje i izuzetno. Stoga, 101 priča u ovoj knjizi je Koeljova 1001 noć.',0);
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_borrowing`
--

DROP TABLE IF EXISTS `book_borrowing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book_borrowing` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateOfBorrowing` datetime NOT NULL,
  `dateOfReturning` datetime DEFAULT NULL,
  `returned` tinyint(1) DEFAULT '0',
  `idMember` int(11) NOT NULL,
  `idBook` int(11) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_book_borrowing_member_idx` (`idMember`),
  KEY `fk_book_borrowing_book1_idx` (`idBook`),
  CONSTRAINT `fk_book_borrowing_book1` FOREIGN KEY (`idBook`) REFERENCES `book` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_book_borrowing_member` FOREIGN KEY (`idMember`) REFERENCES `member` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_borrowing`
--

LOCK TABLES `book_borrowing` WRITE;
/*!40000 ALTER TABLE `book_borrowing` DISABLE KEYS */;
INSERT INTO `book_borrowing` VALUES (1,'2019-04-10 00:00:00',NULL,0,2,1,0),(2,'2019-03-05 00:00:00','2019-03-13 00:00:00',1,3,5,0),(3,'2018-11-13 00:00:00',NULL,0,5,7,0),(4,'2019-02-19 00:00:00',NULL,0,4,11,0),(5,'2019-04-16 00:00:00',NULL,0,1,8,0),(6,'2019-02-18 00:00:00',NULL,0,11,10,0),(7,'2018-10-12 00:00:00',NULL,0,1,9,0),(8,'2019-01-23 00:00:00','2019-02-11 00:00:00',1,2,3,0),(9,'2018-11-15 00:00:00',NULL,0,2,3,0),(10,'2019-04-08 00:00:00',NULL,0,10,6,0),(11,'2019-04-19 00:00:00',NULL,0,7,4,0),(12,'2019-03-27 00:00:00',NULL,0,1,12,0),(13,'2019-03-01 00:00:00','2019-03-12 00:00:00',1,3,12,0),(14,'2019-04-11 00:00:00',NULL,0,10,5,0),(15,'2019-03-07 00:00:00',NULL,0,1,2,0),(16,'2019-02-19 00:00:00','2019-03-07 00:00:00',1,1,10,0),(17,'2019-04-12 00:00:00',NULL,0,3,7,0);
/*!40000 ALTER TABLE `book_borrowing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numberOfMembershipCard` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `address` varchar(150) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `telephone` varchar(100) DEFAULT NULL,
  `dateOfMembership` datetime NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `numberOfMembershipCard_UNIQUE` (`numberOfMembershipCard`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'201910051','Marko','Marković','Bulevar Cara Dušana 21, 78000 Banja Luka','marko92@marko.com','088993695','2018-10-05 00:00:00',0),(2,'201911031','Janko','Janković','Karađorđeva 8, 78000 Banja Luka','janko92@janko.com','098585585','2018-11-03 00:00:00',0),(3,'201903021','Milana','Ilić','Banjalučka 14, 74101 Doboj','milana93@milana.com','028696547','2019-03-02 00:00:00',0),(4,'201811141','Ivana','Dragović','Beogradska 75, 78000 Banja Luka','ivana81@ivana.com','057575758','2018-11-14 00:00:00',0),(5,'201707281','Siniša','Simić','Bistrica bb, 78000 Banja Luka','sinisa90@sinisa.com','054858479','2017-07-28 00:00:00',0),(6,'201707282','Nikolina','Stanić','Ulica pobjednika, 11000 Beograd','nikos@nikos.com','+38164528585','2017-07-28 00:00:00',0),(7,'201806251','Aleksandra','Marinić','Kosovska 7, Banja Luka','aleks@gmail.com','089548658','2018-06-25 00:00:00',0),(8,'201902241','Slaviša','Milić','Ulica vojvode Putnika 11, Banja Luka','slavisa@gmail.com','068458478','2019-02-24 00:00:00',0),(9,'201709061','Miloš','Slavnić','Ulica Karadjordjeva 85, Banja Luka','milosslv988@gmail.com','052525252','2017-09-06 00:00:00',0),(10,'201808081','Nikola','Iliev','','nikiliev@nikola.com','null','2018-08-08 00:00:00',0),(11,'201901251','Ana','Bjelica','Banjalucka 7, Prijedor','anabjelica92@gmail.com','null','2019-01-25 00:00:00',0);
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'library'
--

--
-- Dumping routines for database 'library'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-09 20:26:24
