import React, { Component } from 'react';

class OrderCenter extends Component {
  componentDidMount() {
    this.handleverify()
  }
  // 验证用户身份，若未登录则跳转到首页
  handleverify() {
    let cookies = document.cookie.indexOf('EGG_COOK=');
    if (cookies === -1) {
      this.props.history.push('/')
    }
  }
  render() {
    return (
      <div>
        this is order center
      </div>
    )
  }
}

export default OrderCenter;
