/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-31 14:17:25 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-16 09:18:01
 */

module.exports = app => {
  const { router, controller } = app;
  var userauthMiddleware = app.middleware.userauth({}, app);
  // apps
  // 登录注册接口
  router.get('/searchName/:name',controller.register.searchName);
  router.get('/verify/:flag', controller.register.verify);
  router.post('/confVerify', controller.register.confVerify);
  router.post('/logon',controller.register.logon);
  router.post('/login', controller.register.login);
  router.get('/logout',userauthMiddleware,controller.register.logout);
  // 会员管理界面接口
  router.get('/getUserList',userauthMiddleware,controller.admin.userManage.getUserList);
  router.put('/upDateUser',userauthMiddleware,controller.admin.userManage.handleUserStatus);
  router.delete('/deleteUser/:id',userauthMiddleware,controller.admin.userManage.deleteUser);
  // 商品管理接口
  router.get('/getCommList',controller.admin.commManage.getCommList);
  router.post('/addComm',controller.admin.commManage.addComm);
  router.delete('/deleteComm/:id',controller.admin.commManage.deleteComm);
  router.post('/upDateComm',controller.admin.commManage.changeComm);
  router.post('/upload',controller.admin.commManage.upload);
  // 订单管理接口
  router.get('/getOrderList',controller.admin.orderManage.getOrderList);
  router.put('/upDateOrderStatus',controller.admin.orderManage.handleOrderStatus);

  // 订单查询以及修改接口
  router.get('/getAllOrder/:id',controller.shop.orderManage.getAllOrder);
  router.get('/getWillPayOrder/:id',controller.shop.orderManage.getWillPayOrder);
  router.get('/getWillSendOrder/:id',controller.shop.orderManage.getWillSendOrder);
  router.get('/getHasFinishOrder/:id',controller.shop.orderManage.getHasFinishOrder);
  router.put('/confirmPay',controller.shop.orderManage.confirmPay);

  // 访问未知路径或者更目录时指向路径
  router.get('/admin(/?)**', controller.home.admin);
  router.get('/(/?)**', controller.home.shop);
}

