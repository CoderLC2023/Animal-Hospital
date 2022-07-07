/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.5.62 : Database - hospital
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`hospital` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `hospital`;

/*Table structure for table `appointments` */

DROP TABLE IF EXISTS `appointments`;

CREATE TABLE `appointments` (
  `Aid` varchar(50) NOT NULL COMMENT '预约管理的id',
  `phone` varchar(50) NOT NULL COMMENT '联络电话',
  `name` varchar(20) NOT NULL COMMENT '预约者姓名',
  `categoryId` varchar(100) NOT NULL COMMENT '预约对应科室ID',
  `time` varchar(50) NOT NULL COMMENT '预约时间段',
  `createTime` varchar(60) NOT NULL COMMENT '预约的时间',
  `special` varchar(50) NOT NULL COMMENT '宠物品种',
  `body` text NOT NULL COMMENT '症状描述',
  PRIMARY KEY (`Aid`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `appointments` */

insert  into `appointments`(`Aid`,`phone`,`name`,`categoryId`,`time`,`createTime`,`special`,`body`) values ('246ba150','12345678','文档','23c4e510','11.30 AM','2019-09-22T06:20:58.386Z','是','<p>大武当</p>'),('34289830','23321323','张三','23c4e510','11.30 AM','2019-09-21T09:43:01.829Z','伟大撒','<p>额为我去额为全额</p>'),('7dcc26a0','12345678','23','0d9e7130','10.00 AM','2019-09-22T03:38:49.923Z','2321','<p>让我去</p>'),('84e70640','23321332','李四','23c4e510','2.00 PM','2019-09-20T09:43:01.829Z','撒旦倒萨','<p>的撒旦撒旦</p>'),('93f621b0','12345678','32','3cdc49a0','5.00 PM','2019-09-22T03:39:27.098Z','爽肤水','<p>恶趣味</p>'),('9e0a6490','12345678','32','3cdc49a0','5.00 PM','2019-09-22T03:39:44.313Z','爽肤水','<p>恶趣味</p>'),('bf2ac520','12345678','的而','d81e9ca0-c804-11e9-9fb4-5fa354c6e8fd','3.30 PM','2019-09-22T03:40:39.578Z','的','<p>父方式</p>'),('cdbfffb0','32132133','王五','23c4e510','3.30 PM','2019-09-18T09:43:01.829Z','上的','<p>大撒大撒</p>');

/*Table structure for table `categories` */

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` varchar(100) NOT NULL COMMENT '科室的id值',
  `Categoryname` varchar(20) NOT NULL COMMENT '科室的名称',
  `icon` varchar(350) NOT NULL COMMENT '科室的图标',
  `url` varchar(200) NOT NULL COMMENT '科室对应的路由',
  `description` varchar(1000) DEFAULT NULL COMMENT '科室的描述信息',
  PRIMARY KEY (`id`),
  UNIQUE KEY `url` (`url`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `categories` */

insert  into `categories`(`id`,`Categoryname`,`icon`,`url`,`description`) values ('0','人事部','http://localhost:3000/uploads/6452126127d0bf944adad70bf75ecf4a','/categories/human','这是人事科，其不会应该被显示在用户界面上'),('0d9e7130','中兽医科','http://localhost:3000/uploads/fc25f16486a315d7a1678e7f520db0b5','/categories/chinese','宠物某些疾病可以通过针灸、按摩、水疗等中医治疗方法来预防治疗。现在临床上比较常用的就是中医针灸，治疗瘫痪、运动障碍这一方面的疾病。此外，像动物传染病、慢性疾病、脾胃功能、消化功能障碍等疾病也能通过中药、针灸、按摩来进行治疗，从而改善宠物的生活状况，提高它们生活质量。				        			'),('23c4e510','猫科','http://localhost:3000/uploads/285451b7e0d5387ca8f2b578312cc60e','/categories/cat','安新宠物是国内先进的猫专科服务连锁医院，按照国际标准建立猫诊所，以猫为本，致力于减少猫咪到诊所而导致的应激，也让猫主人拜访宠物医生变得更容易更舒适。猫专用诊室和候诊区，“无犬环境”，隔绝噪音打扰，更温和就诊体验。猫专用住院部，单独笼位，复式设计，实现一室一厅一卫，更宽敞舒适的活动空间。猫寄养乐园，分豪华玻璃笼位和散放笼位，与猫乐园无缝连接，活动时间单独出来玩耍，满足喵星人上下跳跃的需求。'),('3cdc49a0','软组织外科','http://localhost:3000/uploads/ce33fb826ab11464e7f1de1eb90a2f96','/categories/soft','软组织是与其他身体部分和器官相连、支撑或包围的组织。此外，软组织包括腱、韧带、膜、纤维组织、脂肪、滑膜、肌肉、神经和血管。故此，医治软组织疾病可能须要做手术，比如常见的软组织手术、尿道造口术、会阴疝修补术。安安宠医拥有多名专家在软组织外科方面手术成熟。				        			'),('6826dd40','内科','http://localhost:3000/uploads/32aa5f8908f46cd19e037c94a20ca2f7','/categories/internal','包括脏器心、肝、脾、肺、肾都在宠物内科体检范围之内，借助完整的专业检测设备，如生化分析仪、内分泌分析仪、超声仪、数位化X射线、核磁共振等，并与其他科室如心脏科、神经科、影像科、肿瘤科的协同会诊提供强大的内科支持。对于呼吸道、消化道、泌尿系统、老年综合性疾病等方面的诊断与治疗有著丰富的经验与专业素养，安安宠医在内科方面已成为疑难杂症的转诊中心医院。				        			'),('9f418160','心脏科','http://localhost:3000/uploads/7883ff225351c08e86d1b7c5ee0ca029','/categories/heart','心脏血管系统是维持生命活动的重要器官，它主要参与机体的血液循环代谢，因此与其他系统关系非常为密切。心脏血管系统原发病虽不多，但当发病时必然要引起其他系统机能障碍，其他系统疾病，也常常影响心脏血管系统的机能。某些特定品种的宠物、超过8岁的老年宠物，罹患心脏血管系统的可能性都比较高。\n安安宠医心脏病专科配备心脏专用听诊器、血压仪、数字X线诊断系统、大型彩超诊断系统等高端设备，还拥有专业的心脏病专科医疗团队支持，给宠物提供精准的诊疗和贴心的服务。				        			'),('d81e9ca0-c804-11e9-9fb4-5fa354c6e8fd','骨科','http://localhost:3000/uploads/54673a7e14f39283634c5645885833e1','/categories/bone','伴随着宠物走入人们的身边，宠物已经成为家庭的一员，车祸、咬伤、高空坠落造成的骨折病例在临床上也逐渐增多，骨折发生后，宠物主人愿意让宠物接受好的治疗。安安拥有从事小动物骨科手术多年的骨科宠物专家队伍，掌握高超的诊疗技术，引进先进的仪器设备，所有的患病动物都会在恒温手术台，无菌手术室被细心检查，并进行术前的血液生化和血液分析检查，及时发现宠物的各种功能变化，对手术麻醉提供科学的依据，麻醉用药均为进口麻药或呼吸麻醉使用，根据爱宠的实际情况来选用。安安在骨外科手术中有着丰富的经验和成功案例，为您的爱宠提供完善的手术服务和有力保证。				        			'),('dfa137e0','影像科','http://localhost:3000/uploads/33890dd4cda4a59c66a916c2d561cf08','/categories/xImage','影像科室是所有其他科室所依赖的中心科室。无论内外科，在诊断上都高频率的需要借助影像科专业人才的精准判读与建议。X光射线、B超、彩超、核磁、内视镜、DR、C型臂，搭配外科进行为病患做更准确与及时的治疗。			        			'),('f3a0fd70','肿瘤科','http://localhost:3000/uploads/f00880f8e61ec41201424d06888d2017','/categories/tumour','犬猫肿瘤病为常见多发病，近年来呈上升趋势。是目前危害宠物健康的主要杀手之一。随着宠物年龄的增长，特别是犬龄、猫龄10年以上，50%终死于癌症。当您发现爱宠体表有包块时，要立即去医院就诊。因为任何肿瘤未转移是可以治疗，发生转移也可以延长生命，提高生活质量。安安宠医拥有专业的医生和先进的设备，提供宠物生命质量。				        			');

/*Table structure for table `customers` */

DROP TABLE IF EXISTS `customers`;

CREATE TABLE `customers` (
  `Cid` varchar(50) NOT NULL COMMENT '用户的主键',
  `phone` varchar(30) NOT NULL COMMENT '用户的联络方式',
  `password` varchar(100) NOT NULL COMMENT '用户的登录密码',
  PRIMARY KEY (`Cid`),
  UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `customers` */

insert  into `customers`(`Cid`,`phone`,`password`) values ('1c2805f0','123456789','$2b$10$rGejmtZWNnuGnLIyrf2OvOeedai1fUB/9XxYms0iOgVgKUp9s8T5q'),('b25862c0','12345678','$2b$10$rGejmtZWNnuGnLIyrf2OvOeedai1fUB/9XxYms0iOgVgKUp9s8T5q'),('c1c10f20','123456789123','$2b$10$nbu3ho2aGP..YO2Ok11jGetF.pJSLPc0bULdymGUiqFYlGu4MNGk.'),('d9b351a0','123321123','$2b$10$BxLL9BbANyNFhRWob3FprOBIRSpDuPNpvUlyQZ1oneEaUKIrVjlO2'),('dccfadd0','987654321','$2b$10$rGejmtZWNnuGnLIyrf2OvOeedai1fUB/9XxYms0iOgVgKUp9s8T5q');

/*Table structure for table `doctors` */

DROP TABLE IF EXISTS `doctors`;

CREATE TABLE `doctors` (
  `docId` varchar(50) NOT NULL COMMENT '名医展示的id',
  `email` varchar(50) NOT NULL COMMENT '创建者的email',
  `createTime` varchar(50) NOT NULL COMMENT '创建的时间',
  `photo` varchar(120) NOT NULL COMMENT '名医展示的缩略图',
  `title` varchar(150) NOT NULL COMMENT '名医展示的标题',
  `route` varchar(100) NOT NULL COMMENT '对应路由',
  `body` text NOT NULL COMMENT '名医展示的主体内容',
  PRIMARY KEY (`docId`),
  UNIQUE KEY `route` (`route`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `doctors` */

insert  into `doctors`(`docId`,`email`,`createTime`,`photo`,`title`,`route`,`body`) values ('115d4b60','admin@admin.com','2019-09-17T15:44:43.249Z','http://localhost:3000/uploads/7c4b80bde5acfff9e88817fdb5d07677','郑志农','/doctors/doctor_1','<p>擅长：熟练各种软组织手术、骨外科、脊椎神经外科等。执业兽医师，从业近20年。热爱宠物医疗行业的郑志农，一直不断努力探索，从未停下学习的脚步，曾参加国内外著名专家的培训近百场。除了在专业上不断耕耘，他还身兼苏州市动物诊疗协会会长，把针对专业医生的培训活动做到了“月月见”，努力推进行业的整体水平。周围人都说他在专业上是个很“拼”的人，而他却说做自己喜欢的事就是大的快乐。</p>'),('251227c0','admin@admin.com','2019-09-17T15:45:16.305Z','http://localhost:3000/uploads/cc3ca2984d3cec139bdd72e911872613','屈小平','/doctors/doctor_2','<p>擅长：小动物疑难病、皮肤病、猫病 执业兽医师，从业25年，中国农业大学临床兽医硕士，荣获北京市杰出青年兽医奖。现兼任中国兽医协会宠物诊疗分会理事、小动物皮肤病协会会员，临床兽医继续教育讲师等；曾多次担任小动物大会讲师，并在日本、韩国、澳大利亚及台湾等地区参访交流；在兽医相关刊物上发表多篇文章，并受邀到全国多个城市进行兽医专题讲座70多场。</p>'),('36e6d270','admin@admin.com','2019-09-17T15:45:46.225Z','http://localhost:3000/uploads/d9e957695e743639e842b60f810bf03f','赖孔继','/doctors/doctor_3','<p>擅长：小动物疑难杂症诊治、内科、外科、骨科，对猫科有特别研究。执业兽医师，从业21年。中国农业大学兽医专业毕业，现兼任中国畜牧兽医协会理事、广东省畜牧兽医协会小动物医疗委员会理事、深圳市宠物医疗协会副会长。曾从业深圳出入境检验检疫局和平动物医院院长；创建深圳市罗湖区中心动物医院和深圳市南山区伴侣动物医院并任院长。了解猫猫狗狗的需求和对临床的爱好，是赖孔继院长一直以来作为宠物医生的不变初心。</p>'),('5655d980','admin@admin.com','2019-09-17T15:46:38.552Z','http://localhost:3000/uploads/a0176cdffa35c3581c1004a3b73af036','钱小亮','/doctors/doctor_4','<p>擅长科目：骨科手术、神经外科、眼科手术、异宠诊疗。执业兽医师，从业15年，毕业于扬州大学兽医专业，现兼任江苏省农牧科技职业学院客座教授、无锡动物园外聘专家。他是团队口中的“工作狂”，生活中的贴心“院长”，以用心换取安心，行动积攒口碑，获得了周边新老客户的一致好评，锦旗不断，夸奖不断，好评不断，口碑不断，这是对钱小亮院长的肯定和不断努力的动力。</p>'),('6f7d3610','admin@admin.com','2019-09-17T15:47:21.073Z','http://localhost:3000/uploads/bc217adfc52c03fcccd7fec882a5b311','李开江','/doctors/doctor_5','<p>擅长科目：骨科手术、神经外科、眼科手术、异宠诊疗。执业兽医师，从业15年，毕业于扬州大学兽医专业，现兼任江苏省农牧科技职业学院客座教授、无锡动物园外聘专家。他是团队口中的“工作狂”，生活中的贴心“院长”，以用心换取安心，行动积攒口碑，获得了周边新老客户的一致好评，锦旗不断，夸奖不断，好评不断，口碑不断，这是对钱小亮院长的肯定和不断努力的动力。</p>'),('84acf2a0','admin@admin.com','2019-09-17T15:47:56.697Z','http://localhost:3000/uploads/b004ff94e91ef2f2a2deeead5d3618a9','王琦','/doctors/doctor_6','<p>擅长：骨外科、骨关节疾病的诊断与手术、神经外科。 执业兽医师，从业13年。热爱宠物医疗行业，专注骨外科，力求精益求精，在医院不少高精尖设备如C型臂、超声骨刀、数字影像系统（DR）、DPO骨板系统等为王院长的诊疗技术更加如虎添翼。王琦院长是上海畜牧兽医协会小动物医学分会理事，也是国际兽医骨科协会Aovet会员，曾参加国际兽医骨科协会Aovet高级骨科系列培训、中国兽医高级学院Csavs骨科系列培训、中国兽医高级学院Csavs微创内镜系列培训；赴日参加高阶影像学培训，师从宫林孝仁教授；赴美参加Brain Beale教授的骨科专科医院实习及手术培训并参加美国BioMedtrix公司所有体型THR全髋置换课程荣获全髋置换认证。</p>');

/*Table structure for table `employee` */

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `Eid` varchar(20) NOT NULL COMMENT '员工的id',
  `Username` varchar(50) NOT NULL COMMENT '名称',
  `email` varchar(50) NOT NULL COMMENT '用户邮箱',
  `gender` varchar(3) NOT NULL DEFAULT '1' COMMENT '性别(0表示女，1表示男)',
  `CreateDate` varchar(100) NOT NULL COMMENT '创建时间',
  `Identity` varchar(20) NOT NULL DEFAULT '医师' COMMENT '职位',
  `Password` varchar(100) NOT NULL COMMENT '用户密码',
  `categoryID` varchar(100) NOT NULL COMMENT '科室的id值(管理员的科室id默认为0)',
  `Phone` varchar(12) NOT NULL COMMENT '联系方式(手机号)',
  `Address` varchar(100) NOT NULL COMMENT '联系方式(住址)',
  `remark` varchar(200) DEFAULT NULL COMMENT '备注信息',
  `avatar` varchar(200) DEFAULT 'http://localhost:3000/uploads/avatar-default.png' COMMENT '用户的头像地址',
  PRIMARY KEY (`Eid`),
  KEY `categoryID` (`categoryID`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `employee` */

insert  into `employee`(`Eid`,`Username`,`email`,`gender`,`CreateDate`,`Identity`,`Password`,`categoryID`,`Phone`,`Address`,`remark`,`avatar`) values ('1','admin','admin@admin.com','1','2019-08-31T17:16:48.819Z','管理员','$2b$10$rGejmtZWNnuGnLIyrf2OvOeedai1fUB/9XxYms0iOgVgKUp9s8T5q','0','13166093357','上海市浦东新区湖城环路1111号',NULL,'http://localhost:3000/uploads/e6ff3756f9c383821e961867b2ae8dfc'),('1e353840','修改','222@ww.com','0','2019-08-31T17:16:48.819Z','管理员','$2b$10$zXUq5Aq88vESx3LEB0jV4.gT6V1dvpBGIqm3BivotuVstK3DUpruW','0','2321321','222','','http://localhost:3000/uploads/avatar-default.png'),('1f18eb70','的的','dwd@dd.com','0','2019-09-04T06:06:22.590Z','医师','$2b$10$X/7RyR2KwHPaxYys1eXY.eJpUIoMs6cGHCymPhF0Rpoc7.titmY3C','0d9e7130','3213213','233dsdc','','http://localhost:3000/uploads/avatar-default.png'),('25d28e10','杀手','ew@ds.com','0','2019-08-31T18:14:17.443Z','管理员','$2b$10$KdNcgxqe014FzGPy.m0Ym.LiEvWrP0bQk0shwPlFJpkxWJpN91oIS','0','3213213','3saadc','','http://localhost:3000/uploads/avatar-default.png'),('292a1150','得的','EE@dd.com','0','2019-09-04T08:08:20.187Z','医师','$2b$10$kgt/Y.YZUU9Jwuqm6tuJFu4MGZ45dkaePMgUYq39x4021I7163Klu','23c4e510','32132132','dsdsads','','http://localhost:3000/uploads/avatar-default.png'),('2ba64870','案例','22@dd.com','0','2019-08-31T17:52:58.813Z','管理员','$2b$10$PVAdLcnVAeKx3Irx0EBcUOfso0X.IRWvZuiRbUvcrd35GjcNcrGQq','0','3213213213','eqweqwe','','http://localhost:3000/uploads/avatar-default.png'),('44df7f50','这可','22@ew.com','0','2019-08-31T17:53:41.080Z','管理员','$2b$10$7Q4N9fGS/Mypolyzj/oHSeYPUTTUgWlBKUFxWxprjTa02DD25ZYSO','0','32131321','223123','','http://localhost:3000/uploads/avatar-default.png'),('493ebf00','哈哈哈','hh@hh.com','0','2019-08-30T17:40:40.730Z','医师','$2b$10$w3OgATAEQxoBGMdLbR6PC.V/mTopT3YbJLap6CR5PTr7UZg3NPj9i','d81e9ca0-c804-11e9-9fb4-5fa354c6e8fd','23123231','213123213','213131231232131\nhhhhhhh\nHH\n哈哈哈哈哈哈','http://localhost:3000/uploads/avatar-default.png'),('4cd6e470','发送','asdas@asda.com','0','2019-08-30T17:47:56.138Z','医师','$2b$10$OtKLDsDW/yQS8MBSh9W5AO7QX5r.a1RRMlomLPrXSM5ZBfDlsuE26','23c4e510','32133213','231313','','http://localhost:3000/uploads/avatar-default.png'),('527e84b0','文档','231@eq.com','0','2019-08-31T18:08:22.959Z','医师','$2b$10$neBXzDwjXG9Hiwk.K6SjvO44g6P8Jd0gxN3r7fNlFXQd0uTJlkcSi','23c4e510','3213213','23wd','','http://localhost:3000/uploads/avatar-default.png'),('55e5af10','大萨达','22@sadasdc.com','0','2019-08-31T18:15:38.215Z','管理员','$2b$10$IFDBlHrCVSyP2hJY0BzeCuiORjs4lRjPBTLuZUyWfXfF855LuCR0m','0','3213231','sdsa','','http://localhost:3000/uploads/avatar-default.png'),('65e42950','王云','wy@wy.com','1','2019-08-30T17:48:38.298Z','医师','$2b$10$L30MKt2eFsK/qFPIERFy8uHDpTla9filPWIGxFA4DKMY7CBWmjxf6','3cdc49a0','2312312312','3213213adas','','http://localhost:3000/uploads/avatar-default.png'),('694f3c90','测温范围的的','dsa@sdsa.com','1','2019-08-30T18:38:50.348Z','管理员','$2b$10$GplRLT2QUvmdWUbIHPR8k.oNzXmUwUfLg9s2SQcR1x4qT6Fs7UdKq','23c4e510','23131231','3123','','http://localhost:3000/uploads/avatar-default.png'),('6e87b010','长春市','ee@sda.com','男','2019-08-30T17:34:33.818Z','管理员','$2b$10$SQG7aqH78VNW/wTm/n4tRO/ef.vuW2HRJy2Iyx.summ5VBxm7C5eW','0','213312321321','321312321312','21312312','http://localhost:3000/uploads/avatar-default.png'),('707d0bd0','白若','231@dad.com','0','2019-08-31T18:09:13.320Z','医师','$2b$10$SE9VmeUC7q2.fkbeaC.kXuY0pekPRJi5GuDcqx.YI5I.PpfFosyWC','0','32132132','321dw','','http://localhost:3000/uploads/avatar-default.png'),('72d4afe0','十六','21@23.com','1','2019-08-31T14:05:54.256Z','医师','$2b$10$lckl2fQpkVqbMFvKqWDS/u5cEYWHRFcm2K/Wj9eI7xIe0j3f9JFTW','23c4e510','3213312323','3213cda','','http://localhost:3000/uploads/avatar-default.png'),('768f8df0','test','test@test.com','0','1997-02-13','医师','$2b$10$5WT51FAJ/OBmkvFhw5eyUObqiEr84jMRdnIAZK7441tUl2ObMgG.e','23c4e510','021-58137788','上海市浦东新区沪城环路1111号',NULL,'http://localhost:3000/uploads/92857b306373ff397151fb7194c8b4dc'),('84820b60','新人','ew@das.com','1','2019-08-31T17:48:18.360Z','管理员','$2b$10$0IOGJwL3.tjOM1LPTTSA3.EP0GYUBrsAmutmVxTUP45dWfmwnDOpu','23c4e510','3231222312','312qweqwewq','','http://localhost:3000/uploads/avatar-default.png'),('8b492350','这是测试','demotest@qq.com','男','2019-08-30T17:35:22.043Z','管理员','$2b$10$kyr5/lJkoNWCSvFYy49XWuuE1f2TST5V0L5j9tE1pH3lJgJDH1ZCe','0','1261528','hkhihuh','','http://localhost:3000/uploads/avatar-default.png'),('8c94c780','车程','dsd@sad.com','男','2019-09-05T09:14:21.367Z','医师','$2b$10$G2wuZuQxmspNSGrXzwkwBuOlm/Iqt70JMf9q74jxyg0F/4BczfNJu','23c4e510','23213213213','ssdssdas','','http://localhost:3000/uploads/avatar-default.png'),('8f1667e0','传递','cd@cd.com','0','2019-08-30T19:58:38.343Z','管理员','$2b$10$OIba67apOvzk1tb5A40XpuAzQqf6zVuNAvY6N9TTHx/uR28dQorE.','0','213232131','23213','','http://localhost:3000/uploads/avatar-default.png'),('8f60eb20','先人','x@x.org','1','2019-08-30T21:53:10.798Z','管理员','$2b$10$nst8pjkdmmu99XKwY/BKZe/WeDAgkTlQPF4E0vGM.UA7RcvxaNt5e','23c4e510','32131332','23123123e','','http://localhost:3000/uploads/avatar-default.png'),('98b60500','但是','we@dsa.com','1','2019-08-31T19:36:14.734Z','管理员','$2b$10$EU6dFOmmTDw26HLKUWP9GObc5fz5sH7l2xFqas5die7zfCJHgk6ni','0','32132132','2312wew','','http://localhost:3000/uploads/avatar-default.png'),('a267c870','新参数','222@4323.com','0','2019-08-31T18:03:27.393Z','医师','$2b$10$re162vtTFfmJM8UpZKgfHuqCjHSZtRyGyerXgTxrf84YPLOzCEHbK','23c4e510','32133232','21312的','','http://localhost:3000/uploads/avatar-default.png'),('a3c63ea0','车市','231321@weq.com','男','2019-08-31T19:43:42.770Z','管理员','$2b$10$ZJrsFQJsFhbPcjgq6GUXr.nabxJ0xrzgnPW0dmwIy3dmNunKQDXuK','0','23132132','sdsdsdsd','','http://localhost:3000/uploads/avatar-default.png'),('aa86c5e0','我的失误','321@2331.com','1','2019-08-30T20:49:30.822Z','管理员','$2b$10$WkQ3TMmuPlRUEOCupiUVWecd1VskKDhAwvxFL17TQH3TMu1KakUAy','d81e9ca0-c804-11e9-9fb4-5fa354c6e8fd','32131232','321312','','http://localhost:3000/uploads/avatar-default.png'),('bee25130','蚕食','we@sdadsad.com','1','2019-08-31T19:30:09.314Z','管理员','$2b$10$mT0dSgqn4OELfZFYKZ1Pte5rgrcpqK/bhIoZi26Fx6OpDtrCllIhG','0','3231312','weqwe','','http://localhost:3000/uploads/avatar-default.png'),('d22cdfa0','委屈而去','dasd@sdas.com','0','2019-08-30T17:37:21.033Z','管理员','$2b$10$VjzB01vTOgQdVTTzjFADu.dCCesELLEr3P3ym0litR9qE29sdj1fy','0','3121232','3213123','123123','http://localhost:3000/uploads/avatar-default.png'),('f02ff070','人才','ewqe@dasd.com','1','2019-09-09T10:02:30.926Z','医师','$2b$10$O2XZk//LCos/MDZmuu5Yc.qNg8fP3BdLUywCf2a/F9s6LvZT7RLoa','23c4e510','3213213','dsadsa','','http://http://localhost:3000/uploads/avatar-default.png'),('f34f85e0','响应','22@33.com','0','2019-08-31T17:51:24.288Z','医师','$2b$10$5lVRHrmjQmWjo4wnFzoHtuBqhIolCtCNHQGivZ1xW40jUuVXbtNyO','3cdc49a0','3231232','3213省道','','http://localhost:3000/uploads/avatar-default.png'),('f6fc7000','实验','222@222.com','0','2019-08-31T17:08:33.284Z','管理员','$2b$10$qCKHryyZoh/G5bCFphlXuuuZF.TrFvJcZdnzXu0EWBMDpk2E5WR.y','0','2313123123','22222','','http://localhost:3000/uploads/avatar-default.png');

/*Table structure for table `messages` */

DROP TABLE IF EXISTS `messages`;

CREATE TABLE `messages` (
  `messageId` varchar(50) DEFAULT NULL COMMENT '留言的ID',
  `name` varchar(50) DEFAULT '(匿名用户)' COMMENT '留言者姓名',
  `createTime` varchar(50) NOT NULL COMMENT '留言时间',
  `phone` varchar(50) DEFAULT '(用户未设置)' COMMENT '留言者的手机',
  `email` varchar(50) DEFAULT '(用户未设置)' COMMENT '留言者的邮箱',
  `address` varchar(50) DEFAULT '(用户未设置)' COMMENT '留言者的联络地址',
  `body` text NOT NULL COMMENT '留言内容'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `messages` */

/*Table structure for table `news` */

DROP TABLE IF EXISTS `news`;

CREATE TABLE `news` (
  `Nid` varchar(50) NOT NULL COMMENT '新闻ID',
  `email` varchar(100) NOT NULL COMMENT '操作者邮箱',
  `title` varchar(100) NOT NULL COMMENT '新闻标题',
  `createTime` varchar(50) NOT NULL COMMENT '新闻创建时间',
  `body` text NOT NULL COMMENT '新闻的主体内容',
  `route` varchar(50) NOT NULL COMMENT '新闻对应的路由',
  PRIMARY KEY (`Nid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `news` */

insert  into `news`(`Nid`,`email`,`title`,`createTime`,`body`,`route`) values ('1','admin@admin.com','总是买到星期猫怎么办？','2019-08-31T17:16:48.819Z','<p>大多数养猫或者想要养猫还在观望的朋友们对“星期猫”这个名词并不陌生，什么是“星期猫”呢?顾名思义，即在猫舍或者宠物店里看到猫咪的时候，还是非常活蹦乱跳的，领回家一周左右，便出现异样。从最开始的怀疑是到新家的还未适应才导致猫咪蔫蔫的，到后面竟然开始不吃不喝，还呕吐拉稀便血，打喷嚏流眼泪，再到最后连急救都无法挽回它的生命。</p><p>遇到这些情况，对于养猫的朋友来说，无疑是非常糟糕的一次经历。明明都计划好了要怎么照顾和陪伴它的一生，却还没来得及熟络起来，便又急着回喵星球了。但是，请不要担心，小编决定给大家支几招，有助大家辨别“星期猫”。</p><p>一、注意观察眼鼻口耳爪。</p><p>眼睛：清澈明亮，炯炯有神，眼皮没有发红，眼球没有浑浊的情况。</p><p>猫</p><p>鼻子：微微湿润而不黏手，没有流鼻涕打喷嚏的症状。</p><p>口腔：牙齿洁白且锋利，无口臭。如果是牙齿发黄的情况，预示猫咪口腔内隐藏的细菌很多，需要注意清洁牙齿;如果是有口臭的情况，一个可能是消化功能弱，另一个可能是有口腔感染或者牙结石。</p><p>牙齿比较黄的情况</p><p>耳朵：耳廓和外耳道干净、干燥、无异味。这个是最容易出现问题的，但往往是大家容易检查疏漏地方。如果耳道内有比较多的黑色分泌物，且有异味，那很有可能是有耳螨或者马拉色菌的感染，另外这也预示着猫咪的抵抗力比较差以及所生活的环境卫生和猫咪的护理工作并没有做的很好。</p><p>给猫咪清洁耳朵</p><p>爪子：重点观察肉垫和指甲情况，如果是肉垫和指甲都比较糙，而且还有干裂的情况，说明猫咪缺乏维生素，也预示着猫咪可能是有营养不良，抵抗力差的情况。</p><p>二、注意辨别卖家承诺的真伪。</p><p>“我们家猫咪都打过疫苗了的，你就放心好啦!”，当卖家跟你说猫咪免疫情况的时候，千万要留个心眼，多问一问猫咪疫苗是在哪里打的，打了几针，谁来打的，有没有免疫证明。</p><p>再有需要牢记这个关键点，猫咪的免疫一般是需要在满2月龄及以上的时候才能开始接种疫苗，首次免疫一般是需要接种3针，每针时间间隔是21天(科学测试得出免疫效果较好的免疫接种程序)，所以如果老板告诉你，猫咪已经3个月了，并且已经打完疫苗，这个可信度不是很高。</p><p>三、选择可提供售后保障的卖家。</p><p>一个商家，一个企业想要在市场上屹立不倒，它的口碑和优质服务是基础。如果是要选择购买一只猫咪，建议选择可提供以下服务的卖家：</p><p>对于纯种猫可提供相关血统证书;</p><p>须签订相关购买须知协议;</p><p>售后服务到位。如2周内出现传染病无理由更换;包1个月的健康;1个月内出现相关疾病可补偿对应医疗费用……</p><p>四、领养代替购买，很多宠物医院都有和这个服务</p><p>如果对于猫咪血统没有太多要求的朋友们，可以通过领养的方式来选择一只和自己看对眼的猫咪，从而给它们一个温馨的家。最后总结道，养猫乐趣多，奈何选猫有风险，糖衣炮弹不能信，眼鼻口耳爪，一个都不能放过。所以，你知道怎么去选择一只猫咪了吗?</p>','/news_01'),('2','admin@admin.com','宠物医院，它更多的是在占有你','2019-08-31T17:16:48.819Z','<p>猫咪是一种神奇的动物，可爱的外表之下，有着一颗让人难以捉摸的心。越是如此，越是激发了我们的好奇心，总想去解读一下猫咪一系列行为表现背后所隐藏的意思。</p><p>“高冷”、“敏感”、“无法捉摸”等词常被我们用来形容猫咪，尤其是在我们刚把猫咪带到一个新环境的时候，在我们欣喜若狂地迎接新成员的时候，猫咪的表现却让人有些捉摸不透。躲避、逃离人群是猫咪最常有的表现，当如果猫咪突然变得喜欢粘你，蹭你的时候，那恭喜你，猫咪对你的警惕心开始慢慢放下。</p><p>不过，这不完全是一种爱意的表达方式。</p><p>大多数的猫科动物，在没有被驯化前，都是喜独居的。然而，至今为止，对猫咪的驯化虽已经有了几百年的历史，但是其天性也是难以改变的。</p><p>当你家的猫咪开始变得喜欢蹭你的时候，作为它的主人，想必内心是非常欣喜的，猫咪终于开窍了，喜欢我了，爱上我了，终于不再是自己追着它跑，强迫它和我们亲近了。然而，科学研究数据解释，可能和我们理解的有所偏差。</p><p>猫咪皮肤上有非常多的腺体，这些腺体可以分泌一些外激素，用来向同类的其他猫咪传达某些信息以及标记领地，而这些腺体主要是集中在猫咪脸颊、肉垫附近以及肛门周围。</p><p>由于猫咪有非常发达的嗅觉感觉系统，所以某些微妙的气味，是我们人类无法感知的到的，但是对猫咪来说，它们却可以根据这些微妙的气味来读取到很多信息，比如判断出它的领地在什么时候，在什么地方，有入侵者出现;再比如寻找到配偶等等。</p><p>而猫咪会每天在自己界定的领地范围内进行巡逻，并不断增强自己留下的气味，以维护自己的领地。当然，也有这么一种现象，即不同猫咪在不同时间段同享一块领地的现象，但是前提是不能在同一时间出现并占领了同一位置，往往这时候，战争很有可能一触即发。</p><p>虽不能强行解释为爱意的表达，但是这也是猫咪接纳我们的一种方式。</p><p>在猫咪真正的想法当中，强行将喜欢蹭人的行为解释成为一种爱意的表达，确实掺杂了太多我们的主观意愿，毕竟猫咪除了蹭人之外，还喜欢蹭桌子，蹭墙角，还有蹭沙发。不过呢，作为猫咪的主人们知道这个残酷的真相也不要太失落，这对于警惕性超高的猫咪来说，当它向我们展示这种行为时，也是认可和宣誓主权的表现。</p><p>安新宠物医院医生最后，告诉大家一个辨别猫咪是不是爱你的行为表现。如果是你家猫咪，在你靠近它的时候，向你发出“喵呜~”的叫声，并且尾巴直直的竖起时，科学家给出的可能解释是猫咪视你为自己的伙伴，接受你的靠近和触摸，这可能是猫咪对主人的一种友好、需要的爱意表现。</p>','/news_02'),('2a4d69b1','admin@admin.com','猫咪感冒了应该怎么办?','2019-09-08T19:30:50.077Z','<p>猫感冒了怎么办，症状体温升高，精神不振，嗜睡懒动，呼吸增数，眼睑半闭，结膜潮红。有鼻液，初期浆液性，后期黏液性或脓性，有咳嗽、喷嚏、食欲减少或不食等症状。猫咪感冒了应该怎么办呢？ 吃什么药见效快？下面跟着安安小编一起来看吧。</p><p>猫咪感冒原因：</p><p>1.流行性病毒引起的：就是流感，流感是一种病毒性疾病，通常是由于猫咪之间接触传播而来的，呈流行性发生。主要表现为发高热。除具有感冒症状外，常伴发结膜炎和肠卡他。</p><p>2.气候变化抵抗力差：多发于早春、晚秋和气候变化骤然的时候。寒冷季节露宿、被雨淋、给猫猫洗澡后没有及时将毛吹干等情况，幼猫老猫抵抗力比较差。</p><p>猫咪感冒症状：</p><p>精神不振，身体发抖、难受；四肢末端、耳尖发凉；眼半睁，眼结膜潮红、流泪；打喷嚏、流鼻涕，鼻涕初期为浆液状，之后变为黄色粘稠状，鼻粘膜痒，常抓挠；心跳、呼吸加快，食欲降低或完全不进食。</p><p>猫咪感冒治疗方法：</p><p>如果只是单纯性的感冒，可以试着建议把儿童感冒冲剂取出人剂量的四分之一，或者柴胡颗粒、板蓝根冲剂等溶解放在无针头的针筒中喂猫咪，另外也可以服用阿莫西林来帮助消炎。</p><p>猫咪恢复过程中多注意保证营养，可以选择谷登营养膏这类综合营养补充剂，特别适合虚弱的猫咪恢复体力。尽量给它喝多点水，制造安静的环境，不要再此让它着凉。注意避免亮光直射猫咪，感冒中的猫咪会变得怕光。猫感冒当猫鼻支来治可以好，但是猫鼻支当成感冒治的话就不行了。另外，要注意饮食卫生，一定要清淡，不能给猫咪吃太过油腻的食物。</p><p>&nbsp;&nbsp;上海安安宠物有限公司（简称“安安宠医”），总部位于上海，是一家长期致力于推动中国宠物医疗事业发展的专业宠物医院连锁品牌。目前，安安宠医已在全国8个省份与直辖市、24座城市开设超过260家连锁宠物医院，本着“因为严谨、所以安心”的宗旨，拥有数十载宠物行业管理经营经验，把宠物当家人，为爱宠提供全面、科学、透明的医疗服务，重新定义每个小生命的尊严和价值。</p>','/news_03'),('4','admin@admin.com','肿瘤学课程培训圆满结束','2019-08-31T17:16:48.819Z','<p><span>2018</span>年4月16日—18日，为使员工可以掌握更坚实的肿瘤学基础知识、在临床中可以正确有信心的诊断及应用化学疗法治疗犬猫常见的肿瘤疾病及副作用的控制与管理，特邀伊利诺伊大学厄巴纳—香槟分校临床兽医学博士、	ACVIM	小动物肿瘤学专科医师Rodriguez博士，在南京金丝丽喜来登酒店进行了为期3	天的肿瘤学专题培训。</p><p><span>&nbsp;此次培训招集了包括连锁宠物医院优秀医师，南农、华农、扬大、金科、安农、句容农校等高校老师及优秀的研究生本科生在内的36位学员参加，培训涉及了肿瘤的生物及病理学、细胞学诊断、化疗药物特点及应用原则等肿瘤学基础知识，并重点讲解了小动物临床常见的肿瘤性疾病(如：犬、猫淋巴瘤、肥大细胞瘤、乳腺肿瘤、血管肉瘤的诊断及治疗方式)，与患有肿瘤疾病的动物主人的沟通技巧等内容。为了更好地使培训贴近实际，Dr.Rodriguez特意重点邀请大家带病例或临床中遇到的问题一起交流分享。</span></p>','/news_04'),('5','admin@admin.com','宠物出境流程详情','2019-08-31T17:16:48.819Z','<p>&nbsp;出境伴侣动物的体检流程：</p><p>1.宠物出入境办理时间：</p><p>体检：周一至周日8:30-16:30</p><p>海关报检：周一至周五8:30—11:30；</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;13:30—16:30</p><p>2.拟入境国家对入境伴侣动物有检疫要求的，根据对方国家要求提供服务（芯片植入、血清检测、驱虫证明等）。对方国家无特别检疫要求的，按以下流程进行检疫。</p><p>3.动物医生检查狂犬疫苗注射记录，免疫本及狂犬病疫苗要求：</p><p>✦狂犬疫苗注射时间需在一年以内，一个月以上。</p><p>✦于农业部指定官方400家狂犬免疫点医院免疫，并持有北京市统一狂犬免疫证明上（A4纸张）有动物医院、上级动物卫生监督章和免疫牌编号且在一年有效期内的，经我院验证合格后后，在该免疫证明上加盖我院公章。</p><p>✦部分国家需连续两次狂犬注射证明，且两次注射证明间隔至少1个月，但不长于12个月。</p><p>✦不满3个月的幼猫/幼犬不注射狂犬疫苗，但须根据入境国要求可能进行相关隔离。</p><p>4.若拟入境国家有狂犬血清抗体检测要求，需提供有效抗体检测证明，审核合格后在体检表相应位置填写采血日期。</p><p>5.主人填写健康体检申请表，姓名须与护照名一致（英文需全称大写、中文全称），联系地址及电话均为北京的住址和电话。</p><p>6.体检医生进行常规临床检查：</p><p>✦临床检查完毕后，记录呼吸、心率、体温情况。若无异常在健康表相应位置盖未见异常章；若医生发现宠物皮肤或耳内异常的，须进行实验室检查，如检测出螨虫或真菌，治疗后方可出境，并填写在健康表相应位置。</p><p>✦动物医生开具化验单，动物主人交费进行化验室检查。</p><p>7.实验室检查项目包括：</p><p>✦血常规检查；</p><p>✦犬需进行犬瘟病毒、犬细小病毒、犬冠状病毒及心丝虫进行抗原快速检测；</p><p>✦猫需要进行猫瘟病毒、猫传染性腹膜炎、白血病检测。</p><p>8.体检不合格的处理：</p><p>检测结果血常规明显异常或传染病检测为阳性但无临床症状的动物，可复检一次；如复检结果正常，按体检合格办理。如复检仍异常，不予出具体检合格表；复检结果异常的，经过治疗后（最少三天）可再次检测，检测正常后，按体检合格办理。</p><p>9.体检结果合格的，体检医生给予驱虫、验证、换证等处方，如有芯片信息则进行芯片扫描并记录，同时将体检结果和驱虫情况录入电子版健康表并为犬猫拍照，打印出境体检表，主人确认无误后签字。</p><p>10.动物主人将体检表及犬猫疫苗注射证交于前台，由前台集中交医院指定人员审核盖章。第二天体检表送回前台备取。体检结果有效期7天，超过7天需重新办理。</p><p>11.动物主人取回体检表送至伴侣动物出入境检疫办公室进行出境报检登记，登记完毕后，去欧盟国家的动物主人在3~4个工作日后在伴侣动物出入境检疫办公室领取通关证明和体检证明。去其他国家的动物主人在2~3个工作日后领取。</p><p>12.若入境国家有文件需要我院医生填写并签字盖章的，按不同要求收取一定费用，日本要求在海关换证后，通关单复印并在我院由医生签字再盖章。</p><p>伴侣动物出境体检各环节的收费标准和收费依据：</p><p>动物医院收费标准由动物医院自行制定，符合国家物价局明码标价的规定。北京观赏动物医院作为宠物医院的领军企业为北京市小动物诊疗行业提供收费标准，各医院会参照制定。我院执行的收费标准在行业内处于平均水平，对伴侣动物出境体检收费与通用收费一致无特殊标准。</p><p>具体收费详情请致电或到院咨询。</p><p>伴侣动物体检需准备哪些材料：</p><p>1.符合农业部要求的狂犬注射免疫证明；</p><p>2.芯片植入信息；</p><p>3.相关国家如日本、欧盟等国家需提供狂犬抗体检测报告（同时附带血清采集证明），并且抗体滴度大于0.5IU/mL；</p><p>4.携带动物出境者的护照复印件。</p><p>健康体检表的有效期：</p><p>1.《中华人民共和国北京国际伴侣动物健康检查表》自出具之日起7天有效；</p><p>2.《中华人民共和国出入境检验检疫动物卫生许可证》自出具之日起14天有效，前往欧盟国家的该证10天有效。</p><p>真假狂犬疫苗接种证书要不要鉴别，怎么鉴别：</p><p>真假狂犬疫苗接种证书需要进行鉴别，防止弄虚作假存在，严格控制狂犬病的发生；可通过以下手段进行检测：</p><p>1.对于犬，具有《北京市狂犬免疫证明》的，可根据该证明上的免疫信息编号前往“北京市防疫信息管理平台”进行验证，并且严格要求加盖疫苗注射医院免疫专用章；</p><p>2.对于猫，不具有《北京市狂犬免疫证明》的，需严格验证免疫本上的疫苗标签，并且查看是否加盖有疫苗注射医院免疫专用章，必要时可向注射医院电话查询。</p>','/new_05'),('6','admin@admin.com','宠物衰老的迹象：认知衰退还是身体疾病？','2019-08-31T17:16:48.819Z','<p>&nbsp;如果与您关系亲密的狗狗朋友陪伴您已有数年之久，那么，您很可能已经注意到它的身体出现了一些变化。例如，随着年龄的增长，很多狗狗的皮毛会变成灰色或白色，尤其是面部周围。您还可能会注意到，它最近起身的动作越来越迟缓，或者相比于它年轻的时候，打盹的频率更高、时间更长。</p><p>&nbsp;&nbsp;&nbsp;虽然衰老的体征很容易辨认，很多宠物主人却未能注意到由于狗狗年龄增长而导致的行为变化，也没有为这些变化做好相应的准备。对于一只没有出现过行为问题的狗狗，其行为变化通常是由于潜在的疾病或认知能力衰退。因此，如果您的年迈狗狗最近行为发生一些变化，您首先要做的，是带它去兽医诊所进行老龄健康检查。</p><p>我希望老年狗狗每年可以到我这里就诊两到三次，因为在 8 岁以后（对于部分大型犬以及所有巨型犬，这个年龄还可能更小），每隔四到六个月就要对狗狗的健康和营养需求进行细微调整。对于老龄宠物，还有一点至关重要，那就是每半年检查一次体重、肌肉张力、关节活动度、饮食、补充剂方案以及锻炼习惯。</p><p>疾病导致狗狗行为变化的迹象</p><p>&nbsp;&nbsp;&nbsp;对于年迈的宠物，任何潜在的疾病都可能导致行为问题。例如，如果您的狗狗感觉疼痛或不适，这种疼痛通常由肌肉骨骼或胃肠道 (GI) 问题引起，就可能导致它反复踱步，焦躁不安，在夜间醒来，甚至是表现出侵略性。</p><p>根据 Nicola Parry 医生为《兽医行业新闻》(Veterinary Practice News) 撰写的文章：</p><p>“出现潜在肌肉骨骼问题的狗狗可能通过很多种行为表现出来，比如躺下或迫使离开某件家具的时候变得具有侵略性，过度舔舐自己的足部和关节，以及对家中的其他狗狗表现出外面才有的侵略性。</p><p>肠道问题可能导致护食行为。尤其要注意的是，最新出现的针对人类的护食行为可能预示着一些问题······可用来确定或排除潜在 GI 问题的可能性——例如，如果狗狗拒绝进食，但又不想主人拿走盛放食物的碗。”</p><p>您的狗狗可能出现肌肉骨骼问题的一部分迹象包括在光滑的地面容易滑行，或者躺下之后起身的速度非常缓慢。它的活跃度也可能降低，并因此而逐渐增加体重。如果出现肠道问题，它可能会感到反胃，在狗狗身上，这通常表现为咀嚼食物，以及过度吞咽和/或挑食。</p><p>内分泌问题同样可能导致狗狗行为变化。动物行为学家 Marsha Reich 医生指出，肾上腺皮质机能亢进（库兴氏综合征）可能导致嗜睡、过度口渴和排尿，甚至是护食。</p><p>“根据我的经验，库兴氏综合征是与行为问题有关的最常见的内分泌疾病之一，”Reich 在接受《兽医行业新闻》(Veterinary Practice News) 采访时表示，“虽然甲状腺功能减退也是狗狗非常常见的内分泌问题，但我很少看到它会导致行为问题。”</p><p>就和老年人一样，老年狗狗也更有可能患上各种疾病，由于这些疾病也可能导致行为变化，因此，我再重申一下：您务必要带上您的宠物，定期前往兽医诊所接受老年健康检查。</p>','/news_06');

/*Table structure for table `success` */

DROP TABLE IF EXISTS `success`;

CREATE TABLE `success` (
  `sid` varchar(20) NOT NULL COMMENT '成功案例的id值',
  `createTime` varchar(30) NOT NULL COMMENT '案例创建的时间',
  `email` varchar(50) NOT NULL COMMENT '操作者的职工邮箱',
  `route` varchar(20) NOT NULL COMMENT '案例对应的路由',
  `title` varchar(100) NOT NULL COMMENT '案例对应的标题',
  `photo` varchar(100) NOT NULL COMMENT '案例的展示图片',
  `body` text NOT NULL COMMENT '案例对应的主体内容',
  PRIMARY KEY (`sid`),
  UNIQUE KEY `route` (`route`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `success` */

insert  into `success`(`sid`,`createTime`,`email`,`route`,`title`,`photo`,`body`) values ('1','2019-08-31T17:16:48.819Z','admin@admin.com','/demo1','脊髓开创术以及脊髓减压术','http://localhost:3000/uploads/9b232b6fd0b65c97a59ad6b39cdaad8e','<p>2018年5月27日，2岁多的巴哥犬“妹妹”，一直饮食欲正常，精神状态良好，无外伤，无外力撞击，体重偏胖，于晚间突发性瘫痪。送完安安宠医·无锡安美宠物医院，经钱小亮院长临床检查发现“妹妹”后肢神经反射较弱，呼吸频率较快。钱院长通过DR检查之后，结合自己多年的临床经验第一时间建议“妹妹”主人陆女士带其到安安宠医·苏州中心医院进行核磁共振检查（MRI）检查，当天陆女士便带着“妹妹”到了苏州中心医院进行了核磁检查，晚上便带着检查结果回来，钱小亮院长考虑到体重等影响手术麻醉，为降低麻醉风险，对“妹妹”术前进行了心肺血压评估，生化肝功能显示（肝细胞损伤），这对于术后用药起到重要作用。麻醉之后，钱院长当晚便进行了脊髓开创术以及脊髓减压术，术后第一晚钱院长安排医生进行24小时监护，对“妹妹”血压、体温、呼吸状况进行监护，整晚状态良好。如今，“妹妹”已经完全恢复健康。</p>'),('2','2019-08-31T17:16:48.819Z','admin@admin.com','/demo2','淘气的lucky 也是“幸运”的lucky','http://localhost:3000/uploads/8e2c70dd2bc813014909bf7644c1a3b4','<p>Lucky的小柯基，尽管才六个月大，Lucky却是一个不折不扣的“混世大魔王”，在家里活泼的像一只兔子、活生生的是一个拆迁队队长，连家里40kg的大阿拉也要让步。在一次和阿拉斯加追逐的过程中，Lucky不小心一头撞在了车上。发生“车祸”之后，主人发现Lucky无法站立，出现瘫痪症状，情况十分危急。</p><p>但是主人折返多家动物医院就诊，都无法诊断病因，后主人带Lucky来到了安新宠物·杭州派希德动物医院。</p><p>经过核磁后，医生们发现在有疑似骨碎片嵌入颈椎（C1-寰椎），综合主诉和临床检查，医生初步诊断Lucky为因冲击而导致脊髓挫伤。经过和Lucky主人的沟通后，医生们决定给Lucky进行颈部腹侧开槽（Ventral Slot）手术。手术过程中医生成功在寰椎取出了数个小的骨碎片。术后第六天，Lucky已经可以自己站起来，饮食饮水已基本恢复正常，变回大魔王，指日可待~</p><p>在家里的宝贝发生撞伤、车祸、咬伤时，请动物主人保持冷静、保持动物平躺姿势，用纸箱或者木板平稳搬运受伤的动物，及时就医。在这期间，请保持冷静，观察动物意识和状态：是否有明显的出血部位；</p><p>是否有呼吸困难（张嘴）的表现；是否有明显肚子变大的表现。您所提供的描述，都将为医生进行急诊提供有效的参考，越早就医，治疗效果会越好！</p>'),('3','2019-08-31T17:16:48.819Z','admin@admin.com','/demo3','CT检查肿瘤切除术','http://localhost:3000/uploads/9a64bb3e50869d4eea2c9b0f858872d7','<p>12岁的亨利，是一只老年犬。有一个非常爱他的主人，一直陪伴着彼此。但近亨利过得很不开心，因为下颌居然长了一个恶性肿瘤。</p><p>因为亨利已经很老了，所以牙齿很不好了主人看他近胃口不好，就带着去安安宠物医院检查并洁牙，安新宠物·竹辉路分院的王剑松院长是主人信任的医生，也是朋友，在洗牙过程中，细心的王院长发现了亨利的口腔有一个异常的团块。在通过采样证实是口腔黑色素瘤，口腔的黑色素瘤是非常恶性的肿瘤，而且有很高的转移几率（80%），王院长建议做更精准的检查，随后主人带着亨利转诊到了安新宠物·苏州中心医院进行治疗，这里有苏州专业的诊疗设备，还有来自台湾的影像学专家张安琦医生。</p><p>通过CT断层扫描亨利头部，骨窗可以明显看到其右侧下颌骨有骨溶解与骨膜反应，这是明显的异常现象；经过软组织造影之后可以看到团块已经跨越中线但尚未影响对侧的下颌；与肿瘤同一侧的下颌淋巴结相对较大，即使大小正常也仍有40%发生转移。因为CT相较于X光对肺脏结节的侦探更加敏感，所以医生进行胸腔的CT扫描，确定没有远端转移到肺脏器官的小团块。CT断层扫描确诊亨利病状后，王院长与主人沟通确认了局部切除下颌骨手术，手术由王院长亲自操刀并顺利完成，后配合药物治疗加上医助对其细心的看护，亨利恢复很好，现在又是一只吃嘛嘛香的好狗啦。</p>'),('4','2019-08-31T17:16:48.819Z','admin@admin.com','/demo4','尼莫：我重获自由奔跑能力的那些事','http://localhost:3000/uploads/e74c7bd88d5364830ca70d71fe228c83','<p>一个多月前，狗狗尼莫突然不能走路，主人立马就带他去医院检查，从济南飞北京，跑了几家医院就诊检查打针吃药药，但是半个月过去了，尼莫还是不能走路，症状并没有得到好转。而且尼莫本来英俊的背上长出了包，通过生化检查，指标显示尼莫贫血，肝功能异常，肝衰。</p><p>2016年5月19号，主人抱着尼莫转诊来到安新宠物·上海岛戈宠物医院。徐国兴院长和主人沟通完病情便对尼莫进行术前检查，通过核磁共振检查（MRI)发现，（尼莫的身体症状是什么样）随后，徐院长和主人沟通尼莫的病情危险性并制定了详细的治疗方案。</p><p>徐院长亲自为尼莫顺利做了手术，术后，医院24小时监护尼莫身体状况，并通过给保健球锻炼（治疗什么）；针灸（治疗什么），冲击波理疗”SPA”（治疗什么）。尼莫就在岛戈宠物医院经过一段时间的治疗，心情和身体一天天都在变好。又恢复往日的神采。</p>'),('5','2019-08-31T17:16:48.819Z','admin@admin.com','/demo5','眼睛上长肉瘤！肉瘤是不是和癌症一样可怕？！','http://localhost:3000/uploads/c495ca2382b5cfa423672f0facbe55a4','<p>差不多半年前，秋田皮皮右眼角长了个小肿物，青春期嘛，麻麻以为是类似人的麦粒肿或者痘痘之类的东西，还笑皮皮荷尔蒙旺盛呢。可时间越来越长，这个小东西越长越吓人，用了眼药没好，还弄得眼睛总是有血色的分泌物。麻麻多方打听，带着皮皮找到了芭比堂动物医院济南千佛山路分院。</p><p>田振院长接诊了皮皮。皮皮的体格检查很正常，但眼检查显示，结膜充血，虹膜肿瘤，角膜轻度水肿。综合血常规、生化10项等实验室检查数据，初诊为虹膜肿瘤。肿瘤刻不容缓，做完各项检查后，安排了手术切除。</p><p><br></p><p>什么是肿瘤</p><p>正常的身体组织细胞是会新陈代谢的，动态地维持在一定的数量水平，而肿瘤是指身体细胞组织不正常的增生，当生长的数量庞大，便会成为肿瘤。肿瘤可以是良性或恶性的。</p><p>良性肿瘤生长速度缓慢，表面较光滑，并不侵入邻近的正常组织内。瘤体周围常形成包膜，因此与正常组织分界明显。除非长在要害部位，良性肿瘤一般不会致命，大多数可被完全切除，很少有复发。</p><p>恶性肿瘤分为上皮源性的“癌”和间质源性的“肉瘤”。在恶性肿瘤中，这一些增生的细胞，除了会集结成为肿块，还会扩散至其他部位增生。癌症即是最常见的恶性肿瘤。</p>'),('ef6e79e0','2019-09-07T19:16:03.787Z','admin@admin.com','/demo6','哈士奇身患子宫蓄脓和肾衰竭，只因一句话改变安乐死命运','http://localhost:3000/uploads/287495ad200b9c75d7bc584031b4b974','<p>性格豪爽的东北裴女士养了一只9岁大的母哈士奇淘淘。对于裴女士来说，淘淘曾是当年女儿送给她作为陪伴的精神寄托，也是这些年视如己出，关爱备至的毛孩子。即使今年2月，已远嫁上海的女儿因怀孕需要她去照料，一家人都一致决定带着淘淘一起来到上海。然而令裴女士一家未曾料到的是，曾经的溺爱却成了往后的伤害。</p><p>2017年10月下旬一天，裴女士发现淘淘屁股流脓，便赶紧带着淘淘前去医院就医。经过医院诊断，淘淘患有子宫蓄脓、肾衰竭以及较严重的体内炎症，因手术风险较高及不确定因素较大，医院没有进一步给出治疗方案，建议裴女士带回家观察或安乐。</p><p>9年的养育，让裴女士一家并没有因此放弃对淘淘的救治希望，通过网上搜索来到了涞坊路1105号安安宠医.堡辈宠物诊所。</p><p>安安宠医·堡辈宠物诊所的蒋剑医生在和裴女士认真沟通淘淘病史后，当即对淘淘进行再次检查，结果如之前医院诊断一样：子宫蓄脓、肾衰竭以及体内炎症较高。</p><p>蒋医生深知病情的严重性，更需要告知裴女士淘淘手术的高风险。蒋医生说：“淘淘手术风险非常高，很有可能手术不能成功甚至无法下手术台，但与其等死，不如尝试着争取下50%的存活性；如果不做手术的话，那么淘淘的死亡率基本上是90%以上了”。正是蒋医生这番真诚话语和负责精神深深打动了裴女士。</p><p>经医院反复确认，裴女士再三考虑后表示知晓并愿意承担手术的高风险，希望蒋医生为淘淘做手术。万幸的是，淘淘的病理性子宫切除术非常成功，淘淘终于从死神手上救了回来。</p><p>术后一星期，在医护人员日夜悉心照料看护下，在裴女士的高度配合下，淘淘的病情很快得到控制并安排出院回家。同时，裴女士对蒋医生把淘淘从死神手里救回来以及医院热情到位的服务多次表达感激之情。</p>');

/*Table structure for table `swiper` */

DROP TABLE IF EXISTS `swiper`;

CREATE TABLE `swiper` (
  `Sid` varchar(50) NOT NULL COMMENT '轮播图的主键',
  `title` varchar(50) NOT NULL COMMENT '轮播图的标题',
  `imgUrl` varchar(150) NOT NULL COMMENT '轮播图地址',
  `route` varchar(50) NOT NULL COMMENT '轮播图的路由地址',
  `ctreateTime` varchar(50) NOT NULL COMMENT '创建时间',
  `description` varchar(120) NOT NULL COMMENT '轮播图的简述信息',
  `useful` varchar(5) NOT NULL DEFAULT 'false' COMMENT '是否启用',
  PRIMARY KEY (`Sid`),
  UNIQUE KEY `route` (`route`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `swiper` */

insert  into `swiper`(`Sid`,`title`,`imgUrl`,`route`,`ctreateTime`,`description`,`useful`) values ('0d378070','TREATMENT ITEMS','http://localhost:3000/uploads/26e2f1223d17f5670b98c230c5e77be5','/categories/cat','2019-09-16T17:25:59.919Z','诊疗项目','true'),('3e4d3290','OUR INFORMATION','http://localhost:3000/uploads/00fdf9825a628c93db21cc038d17766f','/news','2019-09-14T18:55:38.929Z','院内资讯','true'),('5fc5cfd0','RESERVATION SERVICES','http://localhost:3000/uploads/9dc873dc69917fc1aabb605512883a9c','/appointment/service','2019-09-14T19:03:44.539Z','预约服务','true'),('6c0d89f0','REHABILITATION STORY','http://localhost:3000/uploads/192604edb5975464611ef34b7fb9814a','/story','2019-09-14T18:56:55.673Z','康复故事','true'),('9d52c250','MEDICAL TEAM','http://localhost:3000/uploads/bb590b4ca2bb4d5bca587f75b2de1caa','/doctors/all','2019-09-14T18:58:18.345Z','医疗团队','true'),('a420d050','CONNECT US','http://localhost:3000/uploads/d199e21dafc29c05de03f4e2cd1cee02','/connectus','2019-09-14T18:51:20.353Z','联系我们','true'),('bf194df0','ABOUT US','http://localhost:3000/uploads/084f48e67ff3b3616fa698c5c7b9adaf','/aboutus/product','2019-09-14T18:59:15.000Z','关于我们','true'),('d16328a0','因为严谨 所以安心','http://localhost:3000/uploads/5e13d4064bc02c451ec3a9dc94b810df','/main','2019-09-14T18:59:45.768Z','以保障爱宠的健康为宗旨，重新定义每个小生命的尊严和价值','true'),('e8585860','TALENT DEVELOPMENT','http://localhost:3000/uploads/25c0cea5b01320c20d5d7acca9b7616d','/joinus/training','2019-09-14T18:53:14.808Z','招贤纳士','true');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `Uid` varchar(50) NOT NULL COMMENT '用户的id',
  `name` varchar(50) NOT NULL COMMENT '用户的姓名',
  `createTime` varchar(50) NOT NULL COMMENT '创建时间',
  `phone` varchar(50) NOT NULL COMMENT '用户的联络电话',
  `address` varchar(50) NOT NULL COMMENT '用户的联络地址',
  `email` varchar(50) NOT NULL COMMENT '用户的联络邮箱',
  `categoryId` varchar(50) NOT NULL COMMENT '用户宠物对应的科室',
  `special` varchar(50) NOT NULL COMMENT '用户的宠物类别',
  PRIMARY KEY (`Uid`),
  UNIQUE KEY `phone` (`phone`),
  KEY `categoryId` (`categoryId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `users` */

insert  into `users`(`Uid`,`name`,`createTime`,`phone`,`address`,`email`,`categoryId`,`special`) values ('04a2f130','大萨达所','2019-09-23T03:41:24.981Z','123456785','武当山','qweqw@qq.com','0d9e7130','地方'),('288af480','2222','2019-09-22T20:32:55.292Z','2312323213','32132132','2321321@11.com','23c4e510','232133'),('44a32f70','22221','2019-09-22T20:33:42.851Z','2312323212','32132132','2321321@11.com','3cdc49a0','232133');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
