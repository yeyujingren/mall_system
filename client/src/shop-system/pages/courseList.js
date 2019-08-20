import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Row, Col, message, Modal } from 'antd';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { getCourseList } from './store/actionCreator';
import { getMycartLen } from '../component/store/actionCreator';
import {
  reaclPay
} from './store/actionCreator';
const { confirm } = Modal;
class CourseList extends Component {
  componentDidMount(){
    this.props.getCourseList();
  }
  // 验证是否已经购买
  isPay (com_id) {
    let hasPay = JSON.parse(localStorage.getItem('hasPay'));
    for(let i=0; i<hasPay.length; i++){
      if(com_id === hasPay[i]){
        message.info('您已经购买这门课程啦，快去已购课程学习吧');
        return true;
      }
    }
  }
  // 用户点击去结算后弹出确认框，进一步确认
  buyCourseNow(e,course) {
    let coursesList = JSON.parse(localStorage.getItem('mycart'));
    if(this.isPay(course.com_id)){
      return;
    }
    if(coursesList){
      for(let j=0;j<coursesList.length;j++){
        if(course.com_id === coursesList[j].com_id){
          message.info('您已经添加这门课到购物车啦，去购物车一起结算吧');
          return;
        }
      }
    }
    let cartList = [];
    // 封装请求头
    const headers = {
      'contentType': 'json',
      'x-csrf-token': window._csrf
    }
    const user_id = localStorage.getItem('user_id');
    cartList.push(course);
    axios.post('/createOrder',{user_id,cartList},{headers})
      .then(res => {
        if(res.data.code === 200 ) {
          confirm({
            title: '已生成订单，确认支付？',
            content: '支付成功后等待管理员审核，通过后您将解锁商品，如果不满意可以发起退货请求。',
            cancelText: '我再想想',
            okText: '确认支付',
            onOk(){
              e.props.reaclPay(e,res.data.order_id,user_id,course.com_price);
            },
            onCancel(){
              message.info('您的订单已存放到订单中心!');
            }
          })
        } else if (res.data.code === 403 ){
          message.info('您的账号已被冻结，请联系管理员解冻，再选择购买商品！');
        } else {
          message.error('订单生成失败，请稍后重试')
        }
      })
      .catch((e) => {message.error('订单生成失败，请稍后重试');console.log(e)});
  }

  // 向localStorage中添加数据
  pushCart(com_id) {
    const data = this.props.courseList;
    if(this.isPay(com_id)){
      return;
    }
    let coursesList = JSON.parse(localStorage.getItem('mycart'));
    let course = {}
    for(let i=0;i<data.length;i++){
      if(data[i].com_id === com_id) {
        course = data[i];
        break;
      }
    }
    if(!coursesList){
      localStorage.setItem('mycart',JSON.stringify([course]));
    } else {
      for(let j=0;j<coursesList.length;j++){
        if(course.com_id === coursesList[j].com_id){
          message.info('您已经添加这门课啦，快去购物车结算吧');
          return;
        }
      }
      coursesList.push(course);
      localStorage.setItem('mycart',JSON.stringify(coursesList));
    }
  }

  // 向购物车添加商品
  addToCart(com_id){
    // 验证用户是否登录，若未登录，提示登录
    let cookies = document.cookie.indexOf('EGG_COOK=');
    if (cookies === -1) {
      message.error('您还未登录呦！请登录再试')
    } else {
      this.pushCart(com_id);
      this.props.getMycartLen();
    }
  }
  
  render() {
    const { courseList } = this.props;
    return(
      <div className="home-list">
        <header className="course-header">
          <Icon className="course-icon" type="dingding" /><i>实战课程</i><Icon className="header-right course-icon" type="dingding" />
        </header>
        <div className="course-body">
          <Row className="course-row">
            {
              courseList.map(item => {
                return(
                  <Col key={item.com_id} className="course" span={6}>
                    <img className="course-photo" src={item.com_photo} alt=""/>
                    <p className="course-top">
                      {item.com_name}
                    </p>
                    <p className="course-middle">
                      <span>{item.type}</span>
                      <span><Icon type="user" /> {item.amount}</span>
                      <span>{item.difficulty}</span>
                    </p>
                    <p className="course-bottom">
                      <span className="money">￥ {item.com_price}</span>
                      <span onClick={() => this.buyCourseNow(this,item)} className="buy-now">立即购买</span>
                      <span onClick={() => {this.addToCart(item.com_id)}} className="add-to-cart">加入购物车</span>
                    </p>
                  </Col>
                )
              })
            }
          </Row>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  courseList: state.main.courseList
});

const mapDispatch = dispatch => ({
  getCourseList() {
    dispatch(getCourseList());
  },
  getMycartLen(){
    dispatch(getMycartLen());
  },
  reaclPay(e,order_id,user_id,totalPrice){
    dispatch(reaclPay(e,order_id,user_id,totalPrice));
  }
})

export default connect(mapState, mapDispatch)(withRouter(CourseList));
