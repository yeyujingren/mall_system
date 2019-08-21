import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon, Row, Col, Modal } from 'antd';
import {
  getOrderList,
  reaclPay,
  reaclCancel
} from './store/actionCreator';
import '../style/orderCenter.less';

const { confirm } = Modal;
const user_id = localStorage.getItem('user_id');
class OrderCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus:[1,0,0,0]
    }
  }
  componentDidMount() {
    this.handleverify();
    this.props.getOrderList(0);
  }
  // 验证用户身份，若未登录则跳转到首页
  handleverify() {
    let cookies = document.cookie.indexOf('EGG_COOK_U=');
    if (cookies === -1) {
      this.props.history.push('/')
    }
  }
  // 点击切换背景
  handleFocus(index) {
    const data = [0,0,0,0];
    for(let i=0;i<4; i++){
      if(i===index){
        data[i] = 1;
      }
    }
    this.setState({'isFocus': data});
    this.props.getOrderList(index);
  }

  // 订单操作栏返回值
  handleAction(flag,order_id,total_price){
    switch (flag) {
      case 0:
        return(
          <Fragment>
            <span onClick={() => this.verifyPay(this,order_id,total_price)} className="pay">立即支付</span>
            <span onClick={() => this.verifyCancel(this,order_id)} className="cancel-order">取消订单</span>
          </Fragment>
        )
      case 1:
        return(
          <span className="appending">审核中...</span>
        )
      case 2:
        return(
          <span className="appending">已完成</span>
        )
      default:
        return(
          <span className="appending">已取消</span>
        )
    }
  }

  // 用户点击立即支付后弹出确认框，进一步确认
  verifyPay(e,order_id,total_price) {
    confirm({
      title: '确认支付？',
      content: '支付成功后等待管理员审核，通过后您将解锁商品，如果不满意可以发起退货请求。',
      cancelText: '我再想想',
      okText: '确认支付',
      onOk(){
        e.props.reaclPay(e,order_id,user_id,total_price);
      },
      oncancel(){}
    })
  }
  verifyCancel(e, order_id){
    confirm({
      title: '确认取消？',
      content: '取消后，如您想再买，需要重新拍卖，请您再次确认是否取消',
      cancelText: '我再想想',
      okText: '确认取消',
      onOk(){
        e.props.reaclCancel(e,order_id);
      },
      oncancel(){}
    })
  }
  render() {
    const { orderList } = this.props;
    return (
      <div className="c-myorder">
        <div className="c-list">
          <span className="c-item c-title">我的订单</span>
          <span className="c-item c-black"></span>
          <span
              onClick={()=>this.handleFocus(0)}
              className={this.state.isFocus[0]?'c-focus c-item':'c-item'}
          >全部</span>
          <span
              onClick={()=>this.handleFocus(1)}
              className={this.state.isFocus[1]?'c-focus c-item':'c-item'}
          >未支付</span>
          <span
              onClick={()=>this.handleFocus(2)}
              className={this.state.isFocus[2]?'c-focus c-item':'c-item'}
          >待审核</span>
          <span
              onClick={()=>this.handleFocus(3)}
              className={this.state.isFocus[3]?'c-focus c-item':'c-item'}
          >已完成</span>
          <Link to="/cart" className="to-mycart">
            去购物车
          </Link>
        </div>
        <div className="c-desc">
          {
            orderList.length !== 0
            ?orderList.map(item=>{
              return(
                <div key={item.order_id} className="order-list">
                  <div className="order-title">
                    <span className="order-icon">
                      <Icon type="profile" theme="filled" />
                    </span>
                    <span className="order-id">
                      订单编号：{item.order_id}
                    </span>
                    <span className="order-create-time">
                      {item.create_time}
                    </span>
                  </div>
                  <div className="c-table">
                    <Row>
                      <Col className="col-left" span={15}>
                        {item.comms.map(course => {
                          return(
                            <div key={course.com_id} className="c-col-show">
                              <img className="course-img"
                                  src={course.com_photo}
                                  alt="img"
                              />
                              <div className="c-main-desc">
                                <p className="course-name">
                                  {course.com_name}
                                </p>
                                <p className="course-price">
                                  价格￥{course.com_price}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </Col>
                      <Col className="col-mid" span={4}>
                        <p>原价：￥{item.total_price}</p>
                        <p>实付：<i className="real-pay">￥{item.total_price}</i></p>
                      </Col>
                      <Col className="col-right" span={5}>
                        {this.handleAction(item.ispay,item.order_id,item.total_price)}
                      </Col>
                    </Row>
                  </div>
                </div>
              )
            })
            : <div className="order-none">您还没有相关订单呦，去首页看看吧</div>
          }
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  orderList: state.main.orderList
});

const mapDispatch = dispatch => ({
  getOrderList(flag) {
    dispatch(getOrderList(flag));
  },
  reaclPay(e,order_id,user_id,total_price) {
    dispatch(reaclPay(e,order_id,user_id,total_price));
  },
  reaclCancel(e,order_id) {
    dispatch(reaclCancel(e,order_id));
  }
})

export default connect(mapState,mapDispatch)(OrderCenter);
