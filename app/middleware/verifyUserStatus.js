/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-20 16:58:25 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-21 12:10:49
 */

module.exports = (opt,app) => {
  return async function init(ctx,next){
    // 判断用户是否登录
    let userInfo = ctx.session.user;
    if(userInfo) {
      // 查询数据库判断是否存在当前用户
      let result = await app.mysql.select('user',{
        where:{user_name:userInfo,flag:[0,2],account_status:'frozen'}
      })
      if(result.length){
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
        'message': '您尚未登录！'
      }
    }
  }
}
