import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import { connect } from 'react-redux';
import {handleModel} from './store/actionCreator';
import '../../style/header.less';

class Header extends Component {
  // 控制模态框展示
  modelShow(flag) {
    this.props.handleModel(flag);
  }
  render(){
    return(
      <header className="header">
        <div className="left">
          <img src="https://www.imooc.com/static/img/index/logo.png" alt=""/>
        </div>
        <div className="center">
          <div className="list">
            <ul>
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
            <Button onClick={()=>{this.modelShow(1)}} type="link">登录</Button>
            <Button onClick={()=>{this.modelShow(0)}} type="link">注册</Button>
          </div>
        </div>
      </header>
    )
  }
}

const mapDispatch = dispatch => ({
  handleModel(flag) {
    const visible = true;
    dispatch(handleModel(visible,flag));
  }
})

export default connect(null,mapDispatch)(Header);
