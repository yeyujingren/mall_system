'use strict';

const Service = require('egg').Service;

class OrderManageServerService extends Service {
  select(user_id, flag){
    switch (flag) {
      case 0:
        return `user.user_id=${user_id}`;
      case 1:
        return `user.user_id=${user_id} and orderform.ispay=0`;
      case 2:
        return `user.user_id=${user_id} and orderform.ispay=1`;
      case 3:
        return `user.user_id=${user_id} and orderform.ispay=2`;  
      default:
        break;
    }
  }
  /**
   * 查询订单信息
   * @param {number} user_id 用户id
   * @param {number} flag 标识获取订单种类： 0标识全部，1标识未支付，2标识待审核，3标识已完成
   */
  async getOrderList(user_id, flag) {
    let select = this.select(user_id, flag)
    const result = await this.app.mysql.query(`select 
    orderform.order_id,user.user_name,commodity.com_price,commodity.com_name,commodity.com_photo,commodity.com_id,orderform.create_time,orderform.ispay
    from user join orderform on user.user_id = orderform.user_id 
    join assocform on orderform.order_id = assocform.order_id 
    join commodity on assocform.com_id = commodity.com_id where ${select}`);
    const data = [];
    result.map((order) => {
      let orderInfo = data.find(item => order.order_id === item.order_id);
      if(!orderInfo) {
        orderInfo = {
          order_id:order.order_id,
          comms: [],
          total_price: 0,
          user_name:'',
          create_time:'',
          ispay: 0
        }
        data.push(orderInfo);
      }
      let com ={};
      com.com_name = order.com_name;
      com.com_price = order.com_price;
      com.com_photo = order.com_photo;
      com.com_id = order.com_id;
      orderInfo.comms.push(com);
      orderInfo.total_price += order.com_price;
      orderInfo.user_name = order.user_name;
      orderInfo.create_time = order.create_time;
      orderInfo.ispay = order.ispay;
    })
    return data;
  }
}

module.exports = OrderManageServerService;
