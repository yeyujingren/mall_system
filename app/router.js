/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-31 14:17:25 
 * @Last Modified by: 
 * @Last Modified time: 2019-09-01 14:04:27
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
  router.get('/logout/:type',controller.register.logout);
  // 会员管理界面接口
  router.get('/admin/getUserList',adminauthMiddleware,controller.admin.userManage.getUserList);
  router.put('/admin/upDateUser',adminauthMiddleware,controller.admin.userManage.handleUserStatus);
  router.delete('/admin/deleteUser/:id',adminauthMiddleware,controller.admin.userManage.deleteUser);
  // 商品管理接口
  router.get('/admin/getCommList',adminauthMiddleware,controller.admin.commManage.getCommList);
  router.post('/admin/addComm',adminauthMiddleware,controller.admin.commManage.addComm);
  router.delete('/admin/deleteComm/:id',adminauthMiddleware,controller.admin.commManage.deleteComm);
  router.post('/admin/upDateComm',adminauthMiddleware,controller.admin.commManage.changeComm);
  router.post('/admin/upload',adminauthMiddleware,controller.admin.commManage.upload);
  // 订单管理接口
  router.get('/admin/getOrderList',adminauthMiddleware,controller.admin.orderManage.getOrderList);
  router.put('/admin/upDateOrderStatus',adminauthMiddleware,controller.admin.orderManage.handleOrderStatus);

  // 订单生成接口
  router.post('/shop/createOrder',userauthMiddleware,verifyUserStatusMiddleware,controller.shop.orderManage.createOrder);

  // 订单查询以及修改接口
  router.get('/shop/getAllOrder/:id',userauthMiddleware,controller.shop.orderManage.getAllOrder);
  router.get('/shop/getWillPayOrder/:id',userauthMiddleware,controller.shop.orderManage.getWillPayOrder);
  router.get('/shop/getWillSendOrder/:id',userauthMiddleware,controller.shop.orderManage.getWillSendOrder);
  router.get('/shop/getHasFinishOrder/:id',userauthMiddleware,controller.shop.orderManage.getHasFinishOrder);
  router.put('/shop/confirmPay',userauthMiddleware,verifyUserStatusMiddleware,controller.shop.orderManage.confirmPay);
  router.put('/shop/confirmCancel',userauthMiddleware,verifyUserStatusMiddleware,controller.shop.orderManage.confirmPay);

  // 退出登录时保存购物车数据
  router.put('/shop/saveMycart',userauthMiddleware,verifyUserStatusMiddleware,controller.shop.cartManage.upDateCartList);

  // 更改个人信息
  router.get('/shop/getUserInfor',userauthMiddleware,verifyUserStatusMiddleware,controller.shop.persionManage.getUserInfor);
  router.put('/shop/changeEmail',userauthMiddleware,verifyUserStatusMiddleware,controller.shop.persionManage.changeEmail);
  router.put('/shop/changePsd',userauthMiddleware,verifyUserStatusMiddleware,controller.shop.persionManage.changePsd);
  router.put('/shop/pushImg',userauthMiddleware,verifyUserStatusMiddleware,controller.shop.persionManage.pushImg);

  // 课程详情页相关
  router.get('/shop/getCourseDetal/:id',controller.shop.commonManage.getCourseDetal);
  router.get('/shop/getCommentList/:id',controller.shop.commonManage.getCommentList);
  router.post('/shop/write',userauthMiddleware,verifyUserStatusMiddleware,controller.shop.commonManage.writeCommon);
  // 已购商品数据接口
  router.get('/shop/getHasPayCourse/:id',userauthMiddleware,controller.shop.orderManage.getHasPayCourse);
  // 课程数据获取
  router.get('/shop/fuzzySearch/:key',controller.admin.commManage.fuzzySearch);
  router.get('/shop/getCommList/:type',controller.admin.commManage.getCommList);
  // 访问未知路径或者更目录时指向路径
  router.get('/admin(/?)**', controller.home.admin);
  router.get('/(/?)**', controller.home.shop);
}

