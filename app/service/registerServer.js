/*
 * @Author: Yifeng Tao
 * @Date: 2019-07-24 09:34:32
 * @Last Modified by: 
 * @Last Modified time: 2019-08-08 14:24:51
 */
'use strict';

const Service = require('egg').Service;

class RegisterServerService extends Service {
  // 查询用户名是否存在
  async searchName(userName){
    const result = await this.app.mysql.get('user',{ 'user_name':userName });
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
    const result = await this.app.mysql.select('user',{
      where: {user_name, psd},
      columns: ['user_name', 'psd']
    });
    return result
  }
}

module.exports = RegisterServerService;
