module.exports = (opt,app) => {
  return async function init(ctx,next){
    // 判断用户是否登录
    let userInfo = ctx.session.admin;
    if(userInfo) {
      // 查询数据库判断是否存在当前用户
      let result = await app.mysql.select('user',{
        where:{user_name:userInfo,flag:2}
      })
      if(result.length){
        await next();
      } else {
        ctx.body = {
          'code': 403,
          'message': '非管理员'
        }
      }
    } else {
      ctx.body = {
        'code': 403,
        'message': '非管理员'
      }
    }
  }
}
