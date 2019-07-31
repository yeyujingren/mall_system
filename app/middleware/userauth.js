module.exports = (opt,app) => {
  return async function init(ctx,next){
    // 判断用户是否登录
    let userInfo = ctx.session.user;
    if(userInfo) {
      // 查询数据库判断是否存在当前用户
      let result = await app.mysql.get('user',{user_name:userInfo});
      if(result){
        await next();
      } else {
        ctx.redirect('/admin');
      }
    } else {
      ctx.redirect('/admin')
    }
  }
}
