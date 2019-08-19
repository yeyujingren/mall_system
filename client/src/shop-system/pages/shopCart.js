import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Icon, Modal, message } from 'antd';
import axios from 'axios';
import {
  reaclPay
} from './store/actionCreator';
import { getCartList, delCourse, removeMyCart } from '../component/store/actionCreator';
import '../style/shopCart.less';

const { confirm } = Modal;
class ShopCart extends Component {
  componentDidMount() {
    this.handleverify();
    this.props.getMyCart();
  }
  // 验证用户身份，若未登录则跳转到首页
  handleverify() {
    let cookies = document.cookie.indexOf('EGG_COOK=');
    if (cookies === -1) {
      this.props.history.push('/')
    }
  }

  // 删除删除按钮删除购物车中的课程
  delSourse(com_id) {
    this.props.delCom(com_id);
  }

  // 用户点击去结算后弹出确认框，进一步确认
  verifyPay(e,cartList) {
    // 封装请求头
    const headers = {
      'contentType': 'json',
      'x-csrf-token': window._csrf
    }
    const user_id = localStorage.getItem('user_id');
    axios.post('/createOrder',{user_id,cartList},{headers})
      .then(res => {
        if(res.data.code === 200 ) {
          confirm({
            title: '已生成订单，确认支付？',
            content: '支付成功后等待管理员审核，通过后您将解锁商品，如果不满意可以发起退货请求。',
            cancelText: '我再想想',
            okText: '确认支付',
            onOk(){
              e.props.reaclPay(e,res.data.order_id);
              e.props.comfirmPay();
            },
            onCancel(){
              message.info('您的订单已存放到订单中心!');
              e.props.cancelOrder(e);
            }
          })
        } else {
          message.error('订单生成失败，请稍后重试')
        }
      })
      .catch((e) => {message.error('订单生成失败，请稍后重试');console.log(e)});
  }
  render() {
    const { cartList, totalPrice } = this.props;
    const columns = [
      {
        title:'课程',
        key: 'com_name',
        className: 'course-list',
        render: (record) => {
          return (
            <div className="list">
              <img className="course-img"
                  src={record.com_photo}
                  alt="img"
              />
              <p className="course-name">
                【{record.type}】{record.com_name}
              </p>
            </div>
          )
        }
      },
      {
        title:'金额/￥',
        dataIndex: 'com_price',
        key: 'com_price'
      },
      {
        title: '操作',
        dataIndex: '',
        key: 'action',
        render: (record) => {
          return(
            <Icon
                className="delCourse"
                type="close-circle"
                onClick={() => this.delSourse(record.com_id)}
            />
          )
        }
      }
    ];
    return(
      <div className="shop">
        <div className="shop-title">
          <span className="name">
            我的购物车
          </span>
          <span className="sum">
            您已经添加了<i>3</i>门
          </span>
          <Link to="/order">
            <span className="myorder">我的历史订单</span>
          </Link>
        </div>
        <div className="cart-body">
          <Table
              columns={columns}
              dataSource={cartList}
              pagination={false}
              rowKey={record => record.com_id}
          />
        </div>
        {
          cartList
          ?<div className="cart-bottom">
            <div className="settle-account">
            <span className="totle-money">
                您总计选择：{cartList.length}门
              </span>
              <span className="totle-money">
                总计金额：
                <i className="money">
                  ￥ {totalPrice}
                </i>
              </span>
              <span
                  className="btn-to-pay"
                  onClick={() => this.verifyPay(this,cartList)}
              >
                去结算
              </span>
            </div>
            </div>
          :null
        }
      </div>
    )
  }
}

const mapState = state => ({
  cartList: state.component.cartList,
  totalPrice: state.component.totalPrice
});

const mapDispatch = dispatch => ({
  getMyCart() {
    dispatch(getCartList())
  },
  delCom(com_id) {
    dispatch(delCourse(com_id))
  },
  reaclPay(e,order_id){
    dispatch(reaclPay(e,order_id));
  },
  cancelOrder(){
    dispatch(removeMyCart());
  },
  comfirmPay() {
    dispatch(removeMyCart());
  }
})

export default connect(mapState,mapDispatch)(withRouter(ShopCart));
