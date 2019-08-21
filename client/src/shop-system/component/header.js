import React, { Component, Fragment } from 'react';
import { Icon, Button, message, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  handleModel,
  getVerify,
  handleLogin,
  handleLogout,
  getMycartLen,
  delCourse,
  getCartList
} from './store/actionCreator';
import '../style/header.less';

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      handleCartShow: false,
      handleperShow: false,
      shopTimer: null,
      perTimer: null
    }
  }
  componentDidMount() {
    this.verifyLogin();
    this.props.getMycartLen();
  }
  // 通过判断cookie判断用户是否登录
  verifyLogin() {
    let cookies = document.cookie.indexOf('EGG_COOK_U=');
    if(cookies !== -1){
      const isLogin = true;
      this.props.handleLogin(isLogin);
    }
  }
  // 鼠标悬浮显示用户详情框
  // flag用来标识在头像上滑出还是滑入：0标识滑入、1标识滑出
  handlePersionDisplay =(flag)=>{
    if(!flag){
      clearTimeout(this.state.perTimer);
      this.setState({'handleperShow':true})
    } else {
      const timer = setTimeout(() => this.setState({'handleperShow':false}),300);
      this.setState({'perTimer': timer});
    }
  }
  handleCartDisplay =(flag)=>{
    if(!flag){
      // const data = JSON.parse(localStorage.getItem('mycart'));
      this.props.getCartList();
      clearTimeout(this.state.shopTimer);
      // this.setState({'mycart': data});
      this.setState({'handleCartShow':true});
    } else {
      const timer = setTimeout(() => this.setState({'handleCartShow':false}),300);
      this.setState({'shopTimer': timer});
    }
  }
  // 控制模态框展示
  modelShow(flag) {
    this.props.handleModel(flag);
  }

  // 退出登录
  logout() {
    let persion = document.getElementById('persion');
    this.props.handleLogout();
    persion.style.display = 'none';
  }

  // 控制跳转
  handleLink(url) {
    // 验证用户是否登录，登录成功后跳转到所到界面，若未登录，提示登录
    let cookies = document.cookie.indexOf('EGG_COOK_U=');
    if (cookies === -1) {
      message.error('您还未登录呦！请登录再试')
    } else {
      this.props.history.push(url);
    }
  }

  // 购物车中点击删除时删除相应课程
  handleDelCourse(com_id) {
    this.props.delCourse(com_id);
  }

  render(){
    const { isLogin, mycartLen, cartList } = this.props;
    // 从localStorage中获取用户名和头像链接
    const user_name =  localStorage.getItem('user_name');
    const user_photo =  localStorage.getItem('user_photo');
    const vip_level =  localStorage.getItem('vip_level');
    const integral =  localStorage.getItem('integral');
    return(
      <header className="header">
        <div className="left">
          <Link to="/">
            <img src="https://www.imooc.com/static/img/index/logo.png" alt=""/>
          </Link>
        </div>
        <div className="center">
          <div className="list">
            <ul className="header-list">
              <li>课程<sup>HOT</sup></li>
              <li onClick={() => {message.info('暂未开放，敬请期待！')}}>专栏</li>
              <li onClick={() => {message.info('暂未开放，敬请期待！')}}>笔记</li>
            </ul>
          </div>
          <div className="search">
            <input type="text"/>
            <Icon type="search" />
          </div>
        </div>
        <div className="right">
          <div onClick={() => {message.info('攻城狮正在努力开发中，请期待！')}} className="download">
            下载APP
          </div>
          <div
              className="shopping-cart"
              onMouseEnter={() => this.handleCartDisplay(0)}
              onMouseLeave={() => this.handleCartDisplay(1)}
          >
            <Icon type="shopping-cart" />&nbsp;
            <span>
              购物车
              {
                mycartLen === 0 ? null : <i className="has-add">{mycartLen}</i>
              }
            </span>
          </div>
          {
            this.state.handleCartShow
            ?
            <div
                className="shopping-cart-show"
                id="shoppingCart"
                onMouseEnter={() => this.handleCartDisplay(0)}
                onMouseLeave={() => this.handleCartDisplay(1)}
            >
              <div className="cart-top">
                <span className="mycart">
                  我的购物车
                </span>
                <span className="hascourse">
                  已加入{mycartLen}门课程
                </span>
              </div>
              <div className="cart-middle">
                {
                  !cartList.length
                  ?<Fragment>
                    <Icon className="icon" type="shopping-cart" />
                    <p className="tit">天呐，购物车竟然空空如也</p>
                    <p className="adver">快去选购你中意的课程吧</p>
                   </Fragment>
                  :cartList.map(item => {
                    return(
                      <Row
                          align="middle"
                          className="cart-item"
                          key={item.com_id}
                      >
                        <Col span={8}>
                          <img className="item-img" src={item.com_photo} alt=""/>
                        </Col>
                        <Col className="item-desc" span={16}>
                          <p className="item-title">
                            {item.com_name}
                          </p>
                          <p className="item-footer">
                            <span className="item-prise">￥{item.com_price}</span>
                            <span onClick={() => this.handleDelCourse(item.com_id)} className="item-action">删除</span>
                          </p>
                        </Col>
                      </Row>
                    )
                  })
                }
              </div>
              <div className="cart-bottom">
                <span onClick={() => this.handleLink('/order')} className="myorder">我的订单中心</span>
                <span onClick={() => this.handleLink('/cart')} className="gocart">去购物车</span>
              </div>
            </div>
            :
            null
          }
          <div className="regest">
            {
              !isLogin
              ? <Fragment>
                  <Button onClick={()=>{this.modelShow(1)}} type="link">登录</Button>
                  <Button onClick={()=>{this.modelShow(0)}} type="link">注册</Button>
                </Fragment>
              : <Fragment>
                  <img
                      className="user-photo"
                      src={user_photo}
                      alt=""
                      onMouseEnter={() => this.handlePersionDisplay(0)}
                      onMouseLeave={() => this.handlePersionDisplay(1)}
                  />
                  <sup></sup>
                </Fragment>
            }
            {
              this.state.handleperShow
              ?
              <div
                  id="persion"
                  className="persion"
                  onMouseEnter={() => this.handlePersionDisplay(0)}
                  onMouseLeave={() => this.handlePersionDisplay(1)}
              >
                <div className="top">
                  <img src={user_photo} alt="会员头像"/>
                  <div className="top-right">
                    <div className="user_name">
                      {user_name}
                    </div>
                    <div className="core">
                      <span>
                        积分:<b>{integral}</b>
                      </span>
                      <span>
                        等级:<b>{vip_level}</b>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="middle">
                  <ul className="list">
                    <Link className="link" to="/haspay">
                      <li className="item">
                        <Icon type="bank" theme="filled" />已购课程
                      </li>
                    </Link>
                    <Link className="link" to="/order">
                      <li className="item">
                        <Icon type="database" theme="filled" />订单中心
                      </li>
                    </Link>
                    <Link className="link" to="/persion">
                      <li className="item">
                        <Icon type="setting" theme="filled" />个人设置
                      </li>
                    </Link>
                    <li className="item" onClick={() => {message.info('嘘，别提需求啦，小心攻城狮咬人，超凶的！')}}>
                      <Icon type="android" theme="filled" />开发ing
                    </li>
                  </ul>
                </div>
                <div onClick={()=>{this.logout()}} className="bottom">
                  安全退出
                </div>
              </div>
              :
              null
            }
          </div>
        </div>
      </header>
    )
  }
}

const mapState = state => ({
  isLogin: state.component.isLogin,
  mycartLen: state.component.mycartLen,
  cartList: state.component.cartList
})

const mapDispatch = dispatch => ({
  handleModel(flag) {
    const visible = true;
    dispatch(handleModel(visible,flag));
    dispatch(getVerify(flag))
  },
  handleLogin(isLogin){
    dispatch(handleLogin(isLogin));
  },
  handleLogout(){
    dispatch(handleLogout());
  },
  getMycartLen(){
    dispatch(getMycartLen());
  },
  delCourse(com_id){
    dispatch(delCourse(com_id));
  },
  getCartList(){
    dispatch(getCartList())
  }
})

export default withRouter(connect(mapState,mapDispatch)(Header));
