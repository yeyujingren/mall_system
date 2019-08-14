import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
class Fail extends Component {
  render(){
    return (
      <Result
          status="error"
          title="支付失败"
          subTitle="支付过程中出现未知错误，导致支付失败，请稍后重试！"
          extra={[
            <Link to="/" key="home">
              <Button type="primary">返回首页</Button>
            </Link>,
            <Link to="/cart" key="buy">
              <Button>重新购买</Button>
            </Link>
          ]}
      />
    )
  }
}

export default Fail;
