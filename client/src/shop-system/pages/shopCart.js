import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Icon, Modal, message } from 'antd';
import '../style/shopCart.less';

const { confirm } = Modal;
class ShopCart extends Component {
  componentDidMount() {
    this.handleverify();
    // this.props.getMyCart();
  }
  // 验证用户身份，若未登录则跳转到首页
  handleverify() {
    let cookies = document.cookie.indexOf('EGG_COOK=');
    if (cookies === -1) {
      this.props.history.push('/')
    }
  }

  // 用户点击去结算后弹出确认框，进一步确认
  verifyPay(e) {
    confirm({
      title: '已生成订单，确认支付？',
      content: '支付成功后等待管理员审核，通过后您将解锁商品，如果不满意可以发起退货请求。',
      cancelText: '我再想想',
      okText: '确认支付',
      onOk(){
        return new Promise((resolve, reject) => {
          setTimeout(() => resolve(),1000);
        })
          .then(() => {
            if(Math.random()>0.5){
              e.props.history.push('/success');
            } else {
              e.props.history.push('/fail');
            }
          })
      },
      oncancel(){
        message.info('您的订单已存放到订单中心!');
      }
    })
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
          return(<Icon type="close-circle" />)
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
          />
        </div>
        {
          cartList.length !== 0
          ?<div className="cart-bottom">
            <div className="settle-account">
              <span className="totle-money">
                总计金额：
                <i className="money">
                  ￥ {totalPrice}
                </i>
              </span>
              <span
                  className="btn-to-pay"
                  onClick={() => this.verifyPay(this)}
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
  // getMyCart() {
  //   dispatch
  // }
})

export default connect(mapState,mapDispatch)(withRouter(ShopCart));
