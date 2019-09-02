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
) ENGINE=InnoDB AUTO_INCREMENT=242 DEFAULT CHARSET=utf8 COMMENT='订单与商品关联表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assocform`
--

LOCK TABLES `assocform` WRITE;
/*!40000 ALTER TABLE `assocform` DISABLE KEYS */;
INSERT INTO `assocform` VALUES (217,128,23),(218,128,24),(219,128,25),(220,129,23),(221,129,24),(222,129,25),(223,129,26),(224,130,15),(225,130,16),(226,130,17),(227,131,15),(228,132,15),(229,132,16),(230,133,15),(231,134,17),(232,134,18),(233,135,17),(234,135,18),(235,135,19),(236,136,21),(237,137,21),(238,138,16),(239,139,16),(240,140,18),(241,141,29);
/*!40000 ALTER TABLE `assocform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `carts` (
  `assoc_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '关联表id',
  `user_id` int(10) NOT NULL COMMENT '用户',
  `com_id` int(10) NOT NULL COMMENT '商品id',
  PRIMARY KEY (`assoc_id`),
  KEY `user_id` (`user_id`),
  KEY `com_id` (`com_id`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`com_id`) REFERENCES `commodity` (`com_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=utf8 COMMENT='订单表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (119,22,17),(120,22,16),(121,22,18);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commentform`
--

DROP TABLE IF EXISTS `commentform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `commentform` (
  `comment_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `user_id` int(10) NOT NULL COMMENT '用户id',
  `com_id` int(10) NOT NULL COMMENT '课程id',
  `create_time` varchar(50) NOT NULL COMMENT '评论创建时间',
  `comment_value` varchar(300) NOT NULL COMMENT '评论类容',
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `com_id` (`com_id`),
  CONSTRAINT `commentform_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `commentform_ibfk_2` FOREIGN KEY (`com_id`) REFERENCES `commodity` (`com_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='评论表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commentform`
--

LOCK TABLES `commentform` WRITE;
/*!40000 ALTER TABLE `commentform` DISABLE KEYS */;
INSERT INTO `commentform` VALUES (2,25,24,'2019/8/31 下午4:05:21','也学过C和Java，相比之下Python语言简洁，更利于理解，语法上相对容易（尤其是作为动态语言），能够让开发者更专注于业务逻辑的实现。老师讲得重点突出，条理清晰，很多细节都有所涉及，对常见错误和误区也都十分详细地讲解。总之，无论是语言本身，还是课程设置对编程新手都非常友好。'),(3,25,24,'2019-9-1 10:34:07 AM','啊实打实'),(4,25,24,'2019-9-1 10:39:14 AM','这是一条测试数据2'),(5,25,24,'2019-9-1 12:11:14 PM','这是一门很好的课程。值得推荐！'),(6,25,24,'2019-9-1 1:46:22 PM','test2'),(7,25,24,'2019-9-1 8:12:37 PM','啊哈'),(8,25,24,'2019-9-1 8:17:09 PM','这是一条测试数据'),(9,25,24,'2019-9-1 8:24:42 PM','啦啦啦'),(10,25,18,'2019-9-2 9:42:59 AM','这是一条测试数据');
/*!40000 ALTER TABLE `commentform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commodity`
--

DROP TABLE IF EXISTS `commodity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `commodity` (
  `com_id` int(10) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `com_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '商品名称',
  `merchant` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '商家名称',
  `difficulty` varchar(100) NOT NULL DEFAULT '简单',
  `course_time` int(8) NOT NULL DEFAULT '0',
  `com_price` int(10) NOT NULL COMMENT '商品价格',
  `amount` int(10) NOT NULL DEFAULT '0' COMMENT '商品总数',
  `integral` int(10) DEFAULT '0' COMMENT '用户积分',
  `type` varchar(24) NOT NULL,
  `com_dec` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '商品介绍',
  `com_photo` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'https://github.com/fluidicon.png' COMMENT '商品照片',
  `flag` int(1) DEFAULT '0' COMMENT '是否被删除',
  PRIMARY KEY (`com_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='商品表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commodity`
--

LOCK TABLES `commodity` WRITE;
/*!40000 ALTER TABLE `commodity` DISABLE KEYS */;
INSERT INTO `commodity` VALUES (15,'react源码深度解析','Jokcy','难',20,400,3,400,'Web','React毫无疑问是前端界主流的框架，而框架本身就是热点。','/images/uw742316sp91567069199188.jpg',0),(16,'react16打造电商管理系统','Rosen','中等',10,203,1,203,'Web','课程针对有一些前端基础，但对前端框架还不够了解，不能灵活使用的同学，手把手带你用React＋React－Router','/images/t163xnkugrr1567070834757.jpg',0),(17,'React新特性Hooks','Dell','中等',22,476,1,476,'Web','对传统React开发方式的革命性改变。','/images/lntodr67q4i1567069352178.jpg',0),(18,'Vue全家桶实战精讲','Jokcy','难',33,330,3,330,'Web','应用开发，Vue+Webpack工作流搭建，Vue+Vue-Router+Vuex项目架构和Vue服务端渲染深度集成','/images/p4eblwcq5a1567069403121.jpg',0),(19,'Vue2.5开发去哪儿网App','Dell','中等',10,203,1,203,'Web','更好的掌握Vue各个基础知识点。','/images/bjfj3l1sxr91567069444319.jpg',0),(20,'Angular打造企业级协作平台','搬砖的王sir','难',10,123,0,123,'Web','学习 Angular 进阶知识点和技巧（Material、动画、依赖注入、表单控件、RxJS，Redux','/images/o2xl8v5dczq1567069535319.jpg',0),(21,' Angular8开发拼多多','陶涛涛','中等',10,203,1,203,'Web','Angular 学习路径','/images/vac0ibikrno1567069587606.jpg',0),(22,'剑指Java面试-Offer直通车','yeyujingren','简单',11,203,0,203,'Java','本课程中，百度资深面试官带你剖析Java面试流程，遍历Java面试知识技能，让你更高效更全面的进行面试准备','/images/gon6mhxed551567069683144.jpg',0),(23,' Java并发编程精讲','悟空','中等',22,400,1,400,'Java','涵盖并发必须跨越的“三座大山”：多线程并发的8大核心基础+Java内存模型+并发场景下的“死锁”问题。','/images/jcfy8587wya1567069725623.png',0),(24,'Spring Cloud Alibaba进阶','大目','中等',30,203,1,203,'Java','Spring Cloud Alibaba是阿里巴巴出品的Spring Cloud第二代实现，是阿里微服务的解决方案与精华沉淀','/images/azg6sk59ydr1567069822735.jpg',0),(25,' Spring Boot2.0深度实践','夜语惊人','中等',22,400,1,400,'Java','课程系统性地深度探讨 Spring Boot 核心特性，引导小伙伴对 Java 规范的重视，启发对技术原理性的思考','/images/x441u87hus1567069854666.png',0),(26,'Spring Boot 发送邮件','纯洁的微笑','难',22,300,1,300,'Java','Spring Boot 发送各种类型的邮件，掌握如何去设计一个邮件系统。','/images/c1vq5rsjz481567069915985.png',0),(27,'Android 高级应用与实战','陶涛涛','中等',33,476,0,476,'Android','本专题不仅有Android开发的高级控件，而且还有Android官方大力宣传推荐的开发语言---Kotlin','/images/0h1mwbuwk7xs1567069978527.jpg',0),(28,'冲击Android高级职位','fengyu','难',10,100,0,100,'Android','本次课程着重为大家讲解Android系统底层原理，补齐Android开发的Framework层知识短板','/images/eoynnsuv3on1567070077419.png',0),(29,'Android依赖管理与私服搭建','Jokcy','难',10,400,1,400,'Android','本课程讲的是Android依赖管理与私服搭建，首先会对Android依赖管理做一个简单介绍，让大家有个初步认识','/images/m5e9z55hev1567070106295.jpg',0),(30,'Android高级特效-3D画廊',' 李宁','中等',20,400,0,400,'Android','本课程将带领大家实现Android画廊特效，常用于各种电影APP展示页。','/images/4z0kaezszr1567070147020.jpg',0),(31,'Android面试解密',' hyman ','简单',6,100,0,100,'Android','本课程为Android面试系列第一课，短小精悍，切入要害','/images/iaoienqdv9f1567070179605.jpg',0),(32,' Python操作三大主流数据库',' NavCat','简单',10,100,0,100,'Python','在用Python做开发时，你不可避免的会与数据库打交道，这次，带你入门Python操作不同类型数据库的实用技术','/images/7bmez5jsjjj1567070320790.jpg',0),(33,'Python高级核心技术97讲',' bobby','难',46,506,0,506,'Python','万丈高楼平地起，学透了Python高级基础知识再学习其它框架，才会事半功倍，才会更好的理解和使用这些框架','/images/8drgldjmxzy1567070369291.jpg',0),(34,'Python服务端工程师','PegasusWang','中等',22,400,0,400,'Python','Python服务端工程师学什么，面试问什么，你该准备什么？','/images/vfp102nx6dr1567070406671.jpg',0),(35,'全面系统python3入门','夜语惊人','简单',10,100,0,100,'Python','掌握Python3.x 版本语法，并结合讲师实际工作经验讲解Python使用技巧以及数据结构等相关知识','/images/w1dfgxrard1567070443537.jpg',0),(36,' Python零基础入门','夜语惊人','简单',11,100,0,100,'Python','本阶段由浅入深学习Python基础语法及高级用法。','/images/84vo3nfab11567070485281.jpg',0),(37,'php工程师','陶涛涛','难',33,508,0,508,'PHP','php开发工程师是非常具有竞争性的岗位，就业前景广阔。php开发工程师主要从事Web/App后端开发工作。使用流行框架快速搭建企业项目架构，完成项目功能接口设计以及后台模块管理','/images/0ro892jhlbkf1567070995176.jpg',0),(38,'全面解读PHP面试','jason','中等',11,203,0,203,'PHP','全面剖析PHP面试考点及考官考察思路，帮助准备参加面试的学员系统复习面试考点，总结面试重难点，理解解题技巧和方法','/images/2tmpsbo0ucu1567071043300.jpg',0),(39,'PHP开发晋升课程','singwa','中等',22,400,0,400,'PHP','很多PHP工程师在工作中可以顺畅的使用TP框架进行业务开发,但当框架有升级或改动的时候就会不知所措。','/images/5l5mmzhxzgt1567071081250.jpg',0),(40,'PHP常用技术','qiuguo','中等',10,203,0,203,'PHP','初步认识PHP面向对象，运用PHP面向对象的编程思想，实现PHP常规应用操作，结合Linux项目环境部署','/images/8r2bk3u4i31567071117222.jpg',0),(41,'PHP小白零基础入门','夜语惊人','简单',5,50,0,50,'PHP','前端网页布局的搭建到后台PHP开发，助你从零基础到掌握主流开发语言，迈出职场第一步。','/images/v7kei50e3o1567071151286.jpg',0);
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
) ENGINE=InnoDB AUTO_INCREMENT=142 DEFAULT CHARSET=utf8 COMMENT='订单表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderform`
--

LOCK TABLES `orderform` WRITE;
/*!40000 ALTER TABLE `orderform` DISABLE KEYS */;
INSERT INTO `orderform` VALUES (128,21,'2019-8-29 5:58:08 PM',3),(129,21,'2019-8-29 5:58:37 PM',2),(130,22,'2019-8-29 6:07:09 PM',0),(131,22,'2019-8-29 6:07:15 PM',2),(132,23,'2019-8-30 2:35:10 PM',3),(133,23,'2019-8-30 2:35:20 PM',2),(134,23,'2019-8-30 2:35:44 PM',3),(135,23,'2019-8-30 2:35:54 PM',2),(136,25,'2019-9-2 9:25:40 AM',3),(137,25,'2019-9-2 9:25:52 AM',2),(138,25,'2019-9-2 9:35:44 AM',3),(139,25,'2019-9-2 9:42:02 AM',2),(140,25,'2019-9-2 9:43:16 AM',2),(141,25,'2019-9-2 9:43:33 AM',2);
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
  `psd` varchar(128) NOT NULL COMMENT '用户密码',
  `vip_level` int(10) NOT NULL DEFAULT '1' COMMENT '会员等级',
  `integral` int(10) DEFAULT '0' COMMENT '用户积分',
  `account_status` enum('normal','frozen','shuted_down') DEFAULT 'normal' COMMENT '账户状态',
  `user_photo` varchar(100) DEFAULT 'https://github.com/fluidicon.png' COMMENT '用户头像',
  `flag` int(1) DEFAULT '0' COMMENT '是否被删除',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COMMENT='用户表单';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (20,'admin','yeyujingren@gmail.com','3f4ef901e9f8109f59e0ca94678b93e2',1,0,'normal','https://github.com/fluidicon.png',2),(21,'test1','tyf@outlook.com','c778f32cb94dcfba4fb6b49f1a341a26',5,1303,'normal','/images/vm1axq8ysk1567071607693.png',0),(22,'test2','1234567890@163.com','f956a9ca8ff61f82e65903f74cf01f4f',3,400,'normal','https://github.com/fluidicon.png',0),(23,'test3','tyf@outlook.com','ef912a208125d5b7e1e35d4090142c0d',5,1409,'normal','https://github.com/fluidicon.png',0),(24,'test4','1234567890@163.com','f259a4e9460943693b4f2df5aae81466',1,0,'normal','https://github.com/fluidicon.png',0),(25,'qiuguo','qiuguo@outlook.com','2721fde795bdfc39fb01cf44eae1ee78',5,1136,'normal','https://github.com/fluidicon.png',0),(26,'yeyujingren','yeyujingren@gmail.com','a69ff2e11ba01836c925c126acd04e5a',1,0,'normal','https://github.com/fluidicon.png',0),(27,'陶壹丰','yifeng.tao@gmail.com','9b673465e58f5d763246ee09d95e1a32',1,0,'normal','https://github.com/fluidicon.png',0);
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

-- Dump completed on 2019-09-02 11:01:22
