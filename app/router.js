/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-31 14:17:25 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-20 15:05:27
 */

module.exports = app => {
  const { router, controller } = app;
  var adminauthMiddleware = app.middleware.adminAuth({}, app);
  var userauthMiddleware = app.middleware.userAuth({}, app);
  var verifyUserStatusMiddleware = app.middleware.verifyUserStatus({}, app);
  // apps
  // 登录注册接口
  router.get('/searchName/:name',controller.register.searchName);
  router.get('/verify/:flag', controller.register.verify);
  router.post('/confVerify', controller.register.confVerify);
  router.post('/logon',controller.register.logon);
  router.post('/login', controller.register.login);
  router.get('/logout',userauthMiddleware,controller.register.logout);
  // 会员管理界面接口
  router.get('/getUserList',adminauthMiddleware,controller.admin.userManage.getUserList);
  router.put('/upDateUser',adminauthMiddleware,controller.admin.userManage.handleUserStatus);
  router.delete('/deleteUser/:id',adminauthMiddleware,controller.admin.userManage.deleteUser);
  // 商品管理接口
  router.get('/getCommList',adminauthMiddleware,controller.admin.commManage.getCommList);
  router.post('/addComm',adminauthMiddleware,controller.admin.commManage.addComm);
  router.delete('/deleteComm/:id',adminauthMiddleware,controller.admin.commManage.deleteComm);
  router.post('/upDateComm',adminauthMiddleware,controller.admin.commManage.changeComm);
  router.post('/upload',adminauthMiddleware,controller.admin.commManage.upload);
  // 订单管理接口
  router.get('/getOrderList',adminauthMiddleware,controller.admin.orderManage.getOrderList);
  router.put('/upDateOrderStatus',adminauthMiddleware,controller.admin.orderManage.handleOrderStatus);

  // 订单生成接口
  router.post('/createOrder',controller.shop.orderManage.createOrder);

  // 订单查询以及修改接口
  router.get('/getAllOrder/:id',controller.shop.orderManage.getAllOrder);
  router.get('/getWillPayOrder/:id',controller.shop.orderManage.getWillPayOrder);
  router.get('/getWillSendOrder/:id',controller.shop.orderManage.getWillSendOrder);
  router.get('/getHasFinishOrder/:id',controller.shop.orderManage.getHasFinishOrder);
  router.put('/confirmPay',controller.shop.orderManage.confirmPay);

  // 已购商品数据接口
  router.get('/getHasPayCourse/:id',controller.shop.orderManage.getHasPayCourse);
  // 首页课程数据获取
  router.get('/getCommList',controller.admin.commManage.getCommList);
  // 访问未知路径或者更目录时指向路径
  router.get('/admin(/?)**', controller.home.admin);
  router.get('/(/?)**', controller.home.shop);
}

