/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-07 14:26:10 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-07 19:36:04
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Popconfirm
} from 'antd';
import {getOrderList} from './store/actionCreator';

class OrderManage extends Component {
  // 加载订单数据
  componentDidMount() {
    this.props.getOrderList();
  }
  render(){
    const { dataSource } = this.props;
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
          const comms = record.comms?record.comms:[];
          return comms.map(item=>{
            return item;
        }).join(',');
        }
      },
      {
        title: '总金额（/￥）',
        dataIndex: 'total_price',
        key: 'total_price'
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
  dataSource: state.main.data
})

const mapDispatch = dispatch => ({
  getOrderList() {
    dispatch(getOrderList());
  }
})

export default connect(mapState, mapDispatch)(OrderManage);
