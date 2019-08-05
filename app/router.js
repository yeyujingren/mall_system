module.exports = app => {
  const { router, controller } = app;
  var userauthMiddleware = app.middleware.userauth({}, app);
  // apps
  router.get('/admin(/?)**', controller.home.admin);
  // 登录注册路由控制
  router.post('/login', controller.register.login);
  router.get('/logout',userauthMiddleware,controller.register.logout);
  // 会员管理界面路由控制
  router.get('/getUserList',userauthMiddleware,controller.userManage.getUserList);
  router.post('/upDateUser',userauthMiddleware,controller.userManage.handleUserStatus);
  router.post('/deleteUser',userauthMiddleware,controller.userManage.deleteUser);
  // 商品管理路由控制
  router.get('/getCommList',controller.commManage.getCommList);
  router.post('/addComm',controller.commManage.addComm);
  router.post('/deleteComm',controller.commManage.deleteComm);
  router.post('/upDateComm',controller.commManage.changeComm);
  router.post('/upload',controller.commManage.upload)
  router.get('/(/?)**', controller.home.shop);
}
