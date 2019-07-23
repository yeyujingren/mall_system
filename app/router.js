module.exports = app => {
  const { router, controller } = app;
  // apps
  router.get('/admin(/?)**', controller.home.admin);
  router.get('/(/?)**', controller.home.shop);
}
