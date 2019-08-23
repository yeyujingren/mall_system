'use strict';

const Service = require('egg').Service;

class CartManageServerService extends Service {
  // 更新购物车数据
  async upDateCartList(data) {
    const user_id = data.user_id;
    const coms = data.coms;
    let result =[];
    try {
      await  this.app.mysql.delete('carts',{user_id});
      for(let item of coms){
        result.push(await this.app.mysql.insert('carts',{user_id,com_id:item}));
      }
    } catch (err) {
      console.log(err);
    }
    if(result.length !== coms.length){
      return false
    }
    return true;
  }

  // 获取购物车数据
  async getMycart(user_id) {
    console.log(user_id)
    const result = await this.app.mysql.query(`select
    commodity.com_price,commodity.com_name,commodity.com_photo,commodity.com_id,commodity.type,commodity.course_time,commodity.merchant
    from user join carts on user.user_id = carts.user_id 
    join commodity on carts.com_id = commodity.com_id where user.user_id=${user_id}`);
    return result;
  }
}

module.exports = CartManageServerService;
