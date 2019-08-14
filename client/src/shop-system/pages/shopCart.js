import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class ShopCart extends Component {
  componentDidMount() {
    this.handleverify()
  }
  // 验证用户身份，若未登录则跳转到首页
  handleverify() {
    let cookies = document.cookie.indexOf('EGG_COOK=');
    console.log(cookies)
    if (cookies === -1) {
      this.props.history.push('/')
    }
  }
  render() {
    return(
      <div>
        this is shop cart
      </div>
    )
  }
}

export default withRouter(ShopCart);
