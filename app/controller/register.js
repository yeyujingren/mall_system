/*
 * @Author: Yifeng Tao
 * @Date: 2019-07-30 15:29:02
 * @Last Modified by: 
 * @Last Modified time: 2019-08-20 10:35:33
 */
'use strict';


const Controller = require('egg').Controller;

class RegesterController extends Controller {
  // 查询是否存在重名
  async searchName(){
    const {ctx} = this;
    const userName = ctx.params.name;
    const result = await ctx.service.registerServer.searchName(userName);
    ctx.set({
      'contentType':'json'
    })
    if(!result) {
      ctx.body = {
        'code': 200,
        'message': '会员昵称符合规范'
      }
    } else {
      ctx.body = {
        'code': 500,
        'message': '会员昵称重复！'
      }
    }
  }

  // 返回验证码
  async verify() {
    const {ctx} = this;
    const flag = ctx.params.flag;
    let captcha = await this.service.registerServer.verify(flag);
    ctx.response.type = 'image/svg+xml';
    ctx.body = captcha.data;
  }

  // 验证验证码是否正确
  async confVerify() {
    const {ctx} = this;
    const data = ctx.request.body;
    const result = await ctx.service.registerServer.confVerify(data);
    console.log(result)
    if(result){
      ctx.body = {
        code: 200,
        message:'验证成功！'
      }
    } else {
      ctx.body = {
        code: 403,
        message: '验证码错误！'
      }
    }
  }

  // 用户注册
  async logon() {
    const {ctx} = this;
    const userInfor = ctx.request.body;
    const result = await ctx.service.registerServer.logon(userInfor);
    ctx.set({
      'contentType':'json'
    });
    if(result){
      ctx.body = {
        'code': 200,
        'message': '注册成功，赶快去登录吧！'
      }
    } else {
      ctx.body = {
        'code': 500,
        'message': '注册失败，是不是验证码写错了？'
      }
    }
  }


  // 用户登录
  async login() {
    console.log(1111111111111)
    const {ctx} = this;
    const userInfor = ctx.request.body;
    const result = await ctx.service.registerServer.login(userInfor);
    ctx.set({
      'contentType':'json'
    });
    if(result) {
      const courses = []
      const hasPayCourse = await ctx.service.shop.orderManageServer.getOrderList(result.user_id,2);
      hasPayCourse.map(item => {
        item.comms.map(course => {
          courses.push(course.com_id);
        })
      })
      
      
      // 设置cookie
      let cookie = ctx.cookies.set('EGG_COOK',userInfor.user_name,{
        httpOnly: false,
        encrypt: true,
        maxAge: 1000*60*60*24
      })
      // 设置session
      let session =  ctx.session.user = userInfor.user_name;
      ctx.body = {
        'code': 200,
        'message': '登陆成功！',
        data: {result,courses},
        cookie,
        session
      }
    } else {
      ctx.body = {
        'code': 500,
        'message': '登陆失败！'
      }
    }
  }

  // 退出登录
  async logout(){
    const {ctx} = this;
    ctx.session = null;
    ctx.cookies.set('EGG_COOK', null);
    ctx.body = {
      'code': 200,
      'message': '您已经安全退出登录!'
    }
  }
}

module.exports = RegesterController;
