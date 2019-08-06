use mall_system;
-- 初始化用户表，flag用于标识用户类型，其中0为正常用户，1已删除用户，2为管理员 --
insert into user(user_name,email,psd,vip_level,integral,account_status,user_photo,flag) values
('admin','admin@gmail.com','admin',2,100,'normal','https://github.com/fluidicon.png',2),
('test1','123@gmail.com','123',1,0,'normal','https://github.com/fluidicon.png',0),
('test2','yeyujingren@gmail.com','yeyujingren',1,0,'normal','https://github.com/fluidicon.png',0),
('test3','yifeng.tao@gmail.com','yifeng.tao',1,0,'normal','https://github.com/fluidicon.png',0);

-- 初始化商品表 --
insert into commodity(com_name,merchant,com_price,amount,integral,com_dec,com_photo) values
('Nodejs','陶壹丰',123,50,123,'nodejs实战课程','https://github.com/fluidicon.png'),
('vue','陶壹丰',123,50,100,'vue实战课程','/images/n8hnsuig2e1564991268576.png'),
('react','陶壹丰',123,50,100,'react实战课程','https://github.com/fluidicon.png'),
('reactNative','陶壹丰',123,50,100,'reactNative实战课程','/images/033mgtfe7gj11564991184373.png'),
('从0到1学习react','tyf',203,203,11111,'react实战课程','https://img1.mukewang.com/szimg/59b8a486000107fb05400300.jpg'),
('test12','夜语惊人',100,100,0,'SADSADSA','https://github.com/fluidicon.png');

-- 初始化订单表 --
insert into orderform(user_id,create_time,ispay) values
(1,'2019/8/6 下午2:25:34',0),
(2,'2019/8/8 下午2:25:34',0),
(1,'2019/7/25 下午2:25:34',0),
(4,'2019/5/6 下午2:25:34',0);

-- 初始化订单商品关联表 --
insert into assocform(order_id,com_id) values
(4,6),
(1,6),
(1,3),
(2,1),
(3,1);