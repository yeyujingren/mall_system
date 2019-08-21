-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: mall_system
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `assocform`
--

DROP TABLE IF EXISTS `assocform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `assocform` (
  `assoc_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '关联表id',
  `order_id` int(10) NOT NULL COMMENT '订单id',
  `com_id` int(10) NOT NULL COMMENT '商品id',
  PRIMARY KEY (`assoc_id`),
  KEY `order_id` (`order_id`),
  KEY `com_id` (`com_id`),
  CONSTRAINT `assocform_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orderform` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `assocform_ibfk_2` FOREIGN KEY (`com_id`) REFERENCES `commodity` (`com_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=utf8 COMMENT='订单与商品关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assocform`
--

LOCK TABLES `assocform` WRITE;
/*!40000 ALTER TABLE `assocform` DISABLE KEYS */;
INSERT INTO `assocform` VALUES (1,4,6),(2,1,6),(4,2,1),(5,3,1),(6,5,10),(7,5,8),(9,6,10),(152,85,1),(153,86,4),(154,87,5),(155,88,1),(156,89,1),(157,90,1),(158,91,4),(159,91,5),(160,91,6);
/*!40000 ALTER TABLE `assocform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commodity`
--

DROP TABLE IF EXISTS `commodity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `commodity` (
  `com_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `com_name` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '商品名称',
  `merchant` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '商家名称',
  `difficulty` varchar(100) NOT NULL DEFAULT '简单',
  `course_time` int(8) NOT NULL DEFAULT '0',
  `com_price` int(10) NOT NULL COMMENT '商品价格',
  `amount` int(10) NOT NULL DEFAULT '0' COMMENT '商品总数',
  `integral` int(10) DEFAULT '0' COMMENT '用户积分',
  `type` varchar(24) NOT NULL,
  `com_dec` varchar(150) CHARACTER SET utf8 NOT NULL DEFAULT '' COMMENT '商品介绍',
  `com_photo` varchar(100) CHARACTER SET utf8 DEFAULT 'https://github.com/fluidicon.png' COMMENT '商品照片',
  `flag` int(1) DEFAULT '0' COMMENT '是否被删除',
  PRIMARY KEY (`com_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='商品表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commodity`
--

LOCK TABLES `commodity` WRITE;
/*!40000 ALTER TABLE `commodity` DISABLE KEYS */;
INSERT INTO `commodity` VALUES (1,'Nodejs','陶壹丰','简单',0,123,6,123,'web','nodejs实战课程','https://img2.mukewang.com/szimg/5afb8aa900014cc705400300.jpg',0),(2,'vue','陶壹丰','简单',0,123,0,100,'web','vue实战课程','https://img3.mukewang.com/szimg/5c18d2d8000141c506000338.jpg',1),(4,'reactNative','陶壹丰','难',0,123,6,123,'web','reactNative实战课程','https://img1.mukewang.com/szimg/5d36a6000837a91d06000338.jpg',0),(5,'从0到1学习react','tyf','简单',0,203,6,203,'web','react实战课程','https://img1.mukewang.com/szimg/5d08d0b308c9749706000338.jpg',0),(6,'test12','夜语惊人','简单',0,100,4,100,'web','SADSADSA','https://img1.mukewang.com/szimg/5d2e7ada09946f6f12000676.jpg',0),(8,'vue','陶壹丰','中等',0,123,1,123,'Python','vue实战课程','https://img1.mukewang.com/szimg/5d1032ab08719e0906000338.jpg',0),(9,'vue','陶壹丰','简单',0,123,0,100,'web','vue实战课程','https://img1.mukewang.com/szimg/5cbf00c608f52a3b06000338.jpg',1),(10,'react','陶壹丰','简单',0,123,0,123,'web','react实战课程','https://img3.mukewang.com/5c18cf540001ac8206000338-240-135.jpg',0),(12,'从0到1学习react','夜语惊人','中等',11,100,1,100,'Android','这是一门简单的react native入门课程','https://img1.mukewang.com/5a73f54f000190d206000338-240-135.jpg',0);
/*!40000 ALTER TABLE `commodity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderform`
--

DROP TABLE IF EXISTS `orderform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `orderform` (
  `order_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `user_id` int(10) NOT NULL COMMENT '用户id',
  `create_time` varchar(50) NOT NULL COMMENT '订单创建时间',
  `ispay` tinyint(1) DEFAULT NULL COMMENT '订单状态',
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orderform_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8 COMMENT='订单表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderform`
--

LOCK TABLES `orderform` WRITE;
/*!40000 ALTER TABLE `orderform` DISABLE KEYS */;
INSERT INTO `orderform` VALUES (1,1,'2019/8/6 下午2:25:34',2),(2,2,'2019/8/8 下午2:25:34',2),(3,1,'2019/7/25 下午2:25:34',3),(4,4,'2019/5/6 下午2:25:34',2),(5,1,'2019/8/15 下午4:06:11',2),(6,1,'2019/8/15 下午4:57:22',2),(85,16,'2019-8-20 1:09:23 PM',0),(86,16,'2019-8-20 1:09:37 PM',0),(87,16,'2019-8-20 1:10:01 PM',1),(88,16,'2019-8-20 1:21:53 PM',1),(89,1,'2019-8-20 5:00:17 PM',1),(90,1,'2019-8-20 5:01:12 PM',1),(91,1,'2019-8-20 5:02:11 PM',1);
/*!40000 ALTER TABLE `orderform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `user_name` varchar(100) NOT NULL DEFAULT '' COMMENT '用户姓名',
  `email` varchar(50) NOT NULL DEFAULT '' COMMENT '用户邮箱',
  `psd` varchar(25) NOT NULL COMMENT '用户密码',
  `vip_level` int(10) NOT NULL DEFAULT '1' COMMENT '会员等级',
  `integral` int(10) DEFAULT '0' COMMENT '用户积分',
  `account_status` enum('normal','frozen','shuted_down') DEFAULT 'normal' COMMENT '账户状态',
  `user_photo` varchar(100) DEFAULT 'https://github.com/fluidicon.png' COMMENT '用户头像',
  `flag` int(1) DEFAULT '0' COMMENT '是否被删除',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='用户表单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin@gmail.com','admin_super',4,772,'normal','https://github.com/fluidicon.png',2),(2,'test1','123@gmail.com','123test1',1,10,'normal','https://img3.mukewang.com/5458640c0001b0a702200220-100-100.jpg',1),(3,'test2','yeyujingren@gmail.com','yeyujingren',1,0,'normal','https://github.com/fluidicon.png',1),(4,'test3','yifeng.tao@gmail.com','yifeng.tao',1,0,'normal','https://github.com/fluidicon.png',1),(5,'test1234567','1234@outlook.com','qwertyuiop',5,1000,'normal','https://github.com/fluidicon.png',0),(6,'qiuguo.zheng','1234@outlook.com','qwertyuiop',1,0,'normal','https://github.com/fluidicon.png',0),(7,'qiuguo','1234@outlook.com','qwertyuiop',3,356,'normal','https://github.com/fluidicon.png',0),(14,'test4s334','yifeng.tao@gmail.com','qqqqqqqqqq',1,0,'normal','https://github.com/fluidicon.png',0),(15,'陶壹丰','yifeng.tao@gmail.com','123456',1,0,'normal','https://img2.mukewang.com/5458640c0001b0a702200220-140-140.jpg',0),(16,'秋果','yeyujingren@gmail.com','1234567890',11,5996,'frozen','https://github.com/fluidicon.png',0);
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

-- Dump completed on 2019-08-21  9:25:51
