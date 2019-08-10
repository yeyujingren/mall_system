/*
 * @Author: Yifeng Tao
 * @Date: 2019-07-24 09:34:32
 * @Last Modified by: 
 * @Last Modified time: 2019-08-09 18:04:38
 */
'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');

class RegisterServerService extends Service {
  // 查询用户名是否存在
  async searchName(userName){
    const result = await this.app.mysql.get('user',{ 'user_name':userName });
    return result;
  }
  // 生成验证码
  async verify(flag) {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 85,
      height: 32,
      background: '#ffefdb'
    });
    // 通过flag判定是登录验证码，还是注册验证码：0标识注册验证码，1标识登录验证码
    if(!flag){
      this.ctx.session.regester_code = captcha.text;
    } else {
      this.ctx.session.login_code = captcha.text;
    }
    this.ctx.session.maxAge = 1000 * 60 * 3;
    return captcha;
  }

  // 图片验证
  async confVerify(data) {
    const {ctx} = this;
    const { flag, code } = data;
    const { login_code, regester_code } = ctx.session;
    let result = null;
    if(!flag){
      result = regester_code === code ? true : false;
    } else {
      result = login_code === code ? true : false;
    }
    return result;
  }

  // 注册用户
  async logon(userInfor) {
    const user_name = userInfor.user_name;
    const psd = userInfor.psd;
    const email = userInfor.email;
    const result = await this.app.mysql.insert('user',{ user_name, psd, email });
    return result;
  }

  // 登录时向数据库查询用户名和用户密码是否存在，一致
  async login(userInfor) {
    let user_name = userInfor.user_name;
    let psd = userInfor.psd;
    const result = await this.app.mysql.get('user',{user_name,psd})
    return result
  }
}

module.exports = RegisterServerService;
