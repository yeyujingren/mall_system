module.exports = (opt,app) => {
  return async function init(ctx,next){
    // 判断用户是否登录
    let userInfo = ctx.session.user;
    if(userInfo) {
      // 查询数据库判断是否存在当前用户
      let result = await app.mysql.select('user',{
        where:{user_name:userInfo,flag:0,account_status:'frozen'}
      })
      if(result){
        ctx.body = {
          'code': 403,
          'message': '您的账号已被冻结，请联系管理员解冻，再选择购买商品！'
        }
      } else {
        await next();
      }
    } else {
      ctx.body = {
        'code': 500,
        'message': '操作出现未知错误，请稍后重试'
      }
    }
  }
}
