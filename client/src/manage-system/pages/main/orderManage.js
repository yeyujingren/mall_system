/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-07 14:26:10 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-07 15:39:06
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Popconfirm
} from 'antd';
import {} from './store/actionCreator';

class OrderManage extends Component {
  render(){
    const dataSource =[{
      'order_id': 1,
      'user_name': 'tyf',
      'comms': ['nodejs','vue','react'],
      'create_time': '2019/8/6 下午2:25:34',
      'ispay': 0
    }]
    // 设置表头
    const columns = [
      {
        title: '订单号',
        dataIndex: 'order_id',
        key: 'order_id'
      },
      {
        title: '下单用户',
        dataIndex: 'user_name',
        key: 'user_name'
      },
      {
        title: '购买商品',
        dataIndex: '',
        key: 'comms',
        render: (record) => {
          const comms = record.comms;
          return comms.map(item=>{
            return item;
        }).join(',');
        }
      },
      {
        title: '下单时间',
        dataIndex: 'create_time',
        key: 'create_time'
      },
      {
        title: '订单状态',
        dataIndex: '',
        key: 'ispay',
        render: (record) => (
          record.ispay === 1
            ? <Button disabled type="primary">已支付</Button>
            : <Popconfirm
                title="确认将订单状态修改为已支付？"
                onConfirm={() => this.confirmDelete(record.user_id)}
                onCancel={()=>{}}
                okText="确认"
                cancelText="取消"
              >
                <Button type="danger">待支付</Button>
              </Popconfirm>
        )
      }
    ]
    return (
      <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={record => record.order_id}
      />
    )
  }
}

const mapState = state => ({
  
})

const mapDispatch = dispatch => ({
  
})

export default connect(mapState, mapDispatch)(OrderManage);
