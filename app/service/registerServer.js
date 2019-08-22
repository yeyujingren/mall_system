/*
 * @Author: Yifeng Tao
 * @Date: 2019-07-24 09:34:32
 * @Last Modified by: 
 * @Last Modified time: 2019-08-22 13:19:55
 */
'use strict';

const Service = require('egg').Service;
const svgCaptcha = require('svg-captcha');
const  crypto = require('crypto');

class RegisterServerService extends Service {
  // 查询用户名是否存在
  async searchName(userName){
    const result = await this.app.mysql.get('user',{ 'user_name':userName });
    return result;
  }
  // 使用MD5（加盐）
  saltPassword(psd,user_name){
    const saltPassword = psd + ':' + user_name;
    const md5 = crypto.createHash('md5');
    let password = md5.update(saltPassword).digest('hex')
    return password;
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
    if(flag == 0){
      this.ctx.session.regester_code = captcha.text;
    } else {
      this.ctx.session.login_code = captcha.text;
    }
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
    const {regester_code} = this.ctx.session;
    const user_name = userInfor.user_name;
    const psd = userInfor.psd;
    const email = userInfor.email;
    let saltPassword = this.saltPassword(psd,user_name);
    if(userInfor.code === regester_code){
      const result = await this.app.mysql.insert('user',{ user_name, psd:saltPassword, email });
      // 判断是否修改成功
      const isSuc = result.affectedRows === 1;
      return isSuc;
    } else {
      return false
    }
  }

  // 登录时向数据库查询用户名和用户密码是否存在，一致
  async login(userInfor) {
    const {login_code} = this.ctx.session;
    let user_name = userInfor.user_name;
    let psd = userInfor.psd;
    if(userInfor.code){
      let code = userInfor.code;
      if(login_code===code){
        let saltPassword = this.saltPassword(psd,user_name);
        const userResult = await this.app.mysql.get('user',{user_name,psd:saltPassword,'flag':[0,2]});
        return userResult
      }
      return false;
    } else {
      let saltPassword = this.saltPassword(psd,user_name);
      const adminResult = await this.app.mysql.get('user',{user_name,psd:saltPassword,'flag':2});
      return adminResult;
    }
  }
}

module.exports = RegisterServerService;
