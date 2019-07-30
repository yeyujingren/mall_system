module.exports = app => {
  const { router, controller } = app;
  // apps
  router.get('/admin(/?)**', controller.home.admin);
  router.post('/login', controller.register.login);
  router.get('/getUserList',controller.userManage.getUserList);
  router.post('/changeUserStatus',controller.userManage.handleUserStatus)
  router.post('/deleteUser',controller.userManage.deleteUser)
  router.get('/(/?)**', controller.home.shop);
}
