module.exports = app => {
  const { router, controller } = app;
  var userauthMiddleware = app.middleware.userauth({}, app);
  // apps
  router.get('/admin(/?)**', controller.home.admin);
  router.post('/login', controller.register.login);
  router.get('/getUserList',userauthMiddleware,controller.userManage.getUserList);
  router.post('/upDateUser',userauthMiddleware,controller.userManage.handleUserStatus)
  router.post('/deleteUser',userauthMiddleware,controller.userManage.deleteUser)
  router.get('/logout',userauthMiddleware,controller.register.logout)
  router.get('/(/?)**', controller.home.shop);
}
