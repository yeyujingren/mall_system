use mall_system;
-- 建立用户表 --  
DROP TABLE IF EXISTS `user`;
create table user(
user_id int(10) not null auto_increment primary key comment '用户id',
user_name varchar(100) not null default '' comment '用户姓名',
email varchar(50) not null default '' comment '用户邮箱',
psd varchar(25) not null comment'用户密码',
vip_level int(10) not null default 1 comment'会员等级',
integral int(10) default 0 comment'用户积分',
account_status enum('normal', 'frozen', 'shuted_down') default 'normal' comment'账户状态',
user_photo varchar(100) default 'https://github.com/fluidicon.png' comment'用户头像',
flag int(1) default 0 comment'是否被删除'
)engine=InnoDB,default char set=utf8 comment='用户表单';

-- 建立商品明细表 --  
DROP TABLE IF EXISTS `commodity`;
create table commodity(
com_id int(10) not null auto_increment primary key comment '商品id',
com_name varchar(100) not null default '' comment '商品名称',
merchant varchar(50) not null default '' comment '商家名称',
com_price int(10) not null comment'商品价格',
amount int(10) not null  comment'商品总数',
com_dec varchar(150) not null default '' comment'商品介绍',
com_photo varchar(100) default 'https://github.com/fluidicon.png' comment'商品照片'
)engine=InnoDB,default char set=utf8 comment='商品表';

-- 建立订单表 --  
DROP TABLE IF EXISTS `orderForm`;
create table orderForm(
user_id int(10) not null comment '用户id',
com_id int(10) not null comment '商品id',
com_num int(10) not null comment'商品数量',
com_prise int(10) not null comment'商品价格',
ispay boolean comment'订单状态',
primary key(user_id,com_id),
foreign key(user_id) references user(user_id),
foreign key(com_id) references commodity(com_id)
)engine=InnoDB,default char set=utf8 comment='订单表';