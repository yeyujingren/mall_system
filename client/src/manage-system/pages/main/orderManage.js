import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Table,
  Button,
  Popconfirm
} from 'antd';
import { getOrderList, comfirmPay } from './store/actionCreators/orderActionCreator';

class OrderManage extends Component {
  // 加载订单数据
  componentDidMount() {
    this.props.getOrderList(this);
  }
  // 修改订单状态
  confirmPay(order_id){
    this.props.comfirmPay(order_id,this)
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
        render: (record) => {
          switch (record.ispay) {
            case 0:
              return(
                <Button disabled style={{'backgroundColor':'rgba(230, 162, 60,0.3)','borderColor':'rgba(230, 162, 61,0.3)'}}>未支付</Button>
              );
            case 1:
              return(
                <Popconfirm
                    title="确认将订单状态修改为已支付？"
                    onConfirm={() => this.confirmPay(record.order_id)}
                    onCancel={()=>{}}
                    okText="确认"
                    cancelText="取消"
                >
                  <Button type="danger">待审核</Button>
                </Popconfirm>
              )
            case 2:
              return (
                <Button disabled style={{'backgroundColor':'rgba(103, 194, 58,0.3)','borderColor':'rgba(103, 194, 58,0.3)'}}>已支付</Button>
              )
            default:
              return(
                <Button disabled>已取消</Button>
              )
          }
        }
      }
    ]
    // 配置每页展示数量
    const pagination = {
      pageSize: 5
    }
    return (
      <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={record => record.order_id}
          pagination={pagination}
      />
    )
  }
}

const mapState = state => ({
  dataSource: state.main.orderData
})

const mapDispatch = dispatch => ({
  getOrderList(_this) {
    dispatch(getOrderList(_this));
  },
  comfirmPay(order_id,_this) {
    dispatch(comfirmPay(order_id,_this));
  }
})

export default connect(mapState, mapDispatch)(withRouter(OrderManage));
