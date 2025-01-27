import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
class Success extends Component {
  constructor(props){
    super(props);
    this.state = {
      orderId:''
    }
  }
  componentDidMount(){
    const orderId = this.props.match.params.order;
    this.setState({orderId});
  }
  render() {
    return(
      <Result
          status="success"
          title="您已经成功支付！"
          subTitle={`您的订单号为${this.state.orderId}，如有任何疑问，请联系客服`}
          style={{'marginTop':'80px'}}
          extra={[
            <Link to="/" key="home">
              <Button type="primary">返回首页</Button>
            </Link>
          ]}
      />
    )
  }
}

export default Success;
