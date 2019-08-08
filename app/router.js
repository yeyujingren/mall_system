module.exports = app => {
  const { router, controller } = app;
  var userauthMiddleware = app.middleware.userauth({}, app);
  // apps
  // 登录注册路由控制
  router.get('/searchName/:name',controller.register.searchName);
  router.post('/logon',controller.register.logon);
  router.post('/login', controller.register.login);
  router.get('/logout',userauthMiddleware,controller.register.logout);
  // 会员管理界面路由控制
  router.get('/getUserList',userauthMiddleware,controller.userManage.getUserList);
  router.put('/upDateUser',userauthMiddleware,controller.userManage.handleUserStatus);
  router.delete('/deleteUser/:id',userauthMiddleware,controller.userManage.deleteUser);
  // 商品管理路由控制
  router.get('/getCommList',controller.commManage.getCommList);
  router.post('/addComm',controller.commManage.addComm);
  router.delete('/deleteComm/:id',controller.commManage.deleteComm);
  router.post('/upDateComm',controller.commManage.changeComm);
  router.post('/upload',controller.commManage.upload);
  // 订单管理路由控制
  router.get('/getOrderList',controller.orderManage.getOrderList);
  router.put('/upDateOrderStatus',controller.orderManage.handleOrderStatus);

  // 访问未知路径或者更目录时指向路径
  router.get('/admin(/?)**', controller.home.admin);
  router.get('/(/?)**', controller.home.shop);
}
