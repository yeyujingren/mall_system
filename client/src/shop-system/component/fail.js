import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
class Fail extends Component {
  render(){
    return (
      <Result
          status="error"
          title="支付失败"
          subTitle="支付过程中出现未知错误，导致支付失败，您的订单已经暂时保存至订单中心，请稍后重试！"
          style={{'marginTop':'80px'}}
          extra={[
            <Link to="/" key="home">
              <Button type="primary">返回首页</Button>
            </Link>,
            <Link to="/order" key="buy">
              <Button>去订单中心</Button>
            </Link>
          ]}
      />
    )
  }
}

export default Fail;
