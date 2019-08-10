import React, { Component, Fragment } from 'react';
import { Icon, Button } from 'antd';
import { connect } from 'react-redux';
import { handleModel, getVerify, handleLogin, handleLogout } from './store/actionCreator';
import '../../style/header.less';

class Header extends Component {
  componentDidMount() {
    // 通过判断cookie判断用户是否登录
    let cookies = document.cookie.indexOf('EGG_COOK=');
    if(cookies !== -1){
      const isLogin = true;
      this.props.handleLogin(isLogin);
    }
  }
  // 控制模态框展示
  modelShow(flag) {
    this.props.handleModel(flag);
  }

  // 退出登录
  logout() {
    this.props.handleLogout();
  }
  render(){
    const {isLogin} = this.props;
    // 从localStorage中获取用户名和头像链接
    const user_name =  localStorage.getItem('user_name');
    const user_photo =  localStorage.getItem('user_photo');
    console.log(user_name,user_photo)
    return(
      <header className="header">
        <div className="left">
          <img src="https://www.imooc.com/static/img/index/logo.png" alt=""/>
        </div>
        <div className="center">
          <div className="list">
            <ul className="header-list">
              <li>课程<sup>HOT</sup></li>
              <li>专栏</li>
              <li>笔记</li>
            </ul>
          </div>
          <div className="search">
            <input type="text"/>
            <Icon type="search" />
          </div>
        </div>
        <div className="right">
          <div className="download">
            下载APP
          </div>
          <div className="shopping-cart">
            <Icon type="shopping-cart" />&nbsp;
            <span>
              购物车
            </span>
          </div>
          <div className="regest">
            {
              !isLogin
              ? <Fragment>
                  <Button onClick={()=>{this.modelShow(1)}} type="link">登录</Button>
                  <Button onClick={()=>{this.modelShow(0)}} type="link">注册</Button>
                </Fragment>
              : <Fragment>
                  <img className="user-photo" src={user_photo} alt=""/>
                  <sup></sup>
                </Fragment>
            }
            <div className="persion">
              <div className="top">
                <img src={user_photo} alt="会员头像"/>
                <div className="top-right">
                  <div className="user_name">
                    admin
                  </div>
                  <div className="core">
                    <span>
                      积分:<b>100</b>
                    </span>
                    <span>
                      等级:<b>2</b>
                    </span>
                  </div>
                </div>
              </div>
              <div className="middle">
                <ul className="list">
                  <li className="item">
                    <Icon type="bank" theme="filled" />已购课程
                  </li>
                  <li className="item">
                    <Icon type="database" theme="filled" />订单中心
                  </li>
                  <li className="item">
                    <Icon type="setting" theme="filled" />个人设置
                  </li>
                  <li className="item">
                    <Icon type="android" theme="filled" />开发ing
                  </li>
                </ul>
              </div>
              <div onClick={()=>{this.logout()}} className="bottom">
                安全退出
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

const mapState = state => ({
  isLogin: state.component.isLogin
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
  }
})

export default connect(mapState,mapDispatch)(Header);
