/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-07 16:28:36 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-15 18:19:12
 */

'use strict';

const Service = require('egg').Service;

class OrderManageServerService extends Service {
  // 获取订单列表
  async getList() {
    const result = await this.app.mysql.query(`select 
    orderform.order_id,user.user_name,commodity.com_price,commodity.com_name,orderform.create_time,orderform.ispay 
    from user join orderform on user.user_id = orderform.user_id 
    join assocform on orderform.order_id = assocform.order_id 
    join commodity on assocform.com_id = commodity.com_id `);
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
      orderInfo.comms.push(order.com_name);
      orderInfo.total_price += order.com_price;
      orderInfo.user_name = order.user_name;
      orderInfo.create_time = order.create_time;
      orderInfo.ispay = order.ispay;
    })
    return data;
  }

  /**
   * 更新订单状态
   * @param {number} order_id: 订单id
   */
  async handleStatus(order_id){
    const result = await this.app.mysql.update('orderform',{
      'ispay':2
    },{
      where: {
        order_id
      }
    });
    return result;
  }
}

module.exports = OrderManageServerService;
