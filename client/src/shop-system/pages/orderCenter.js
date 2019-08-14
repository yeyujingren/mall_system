import React, { Component } from 'react';
import { Icon, Row, Col } from 'antd';
import '../style/orderCenter.less';
class OrderCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus:[1,0,0,0]
    }
  }
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
  // 点击切换背景
  handleFocus(index) {
    const data = [0,0,0,0];
    for(let i=0;i<4; i++){
      if(i===index){
        data[i] = 1;
      }
    }
    this.setState({'isFocus': data});
  }
  render() {
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
          >待发货</span>
          <span
              onClick={()=>this.handleFocus(3)}
              className={this.state.isFocus[3]?'c-focus c-item':'c-item'}
          >已支付</span>
        </div>
        <div className="c-desc">
          <div className="order-list">
            <div className="order-title">
              <span className="order-icon">
                <Icon type="profile" theme="filled" />
              </span>
              <span className="order-id">
                订单编号：123456
              </span>
              <span className="order-create-time">
                2019/8/6 下午2:25:34
              </span>
            </div>
            <div className="c-table">
              <Row>
                <Col span={12}>
                  <div>
                    <img className="course-img"
                        src="https://szimg.mukewang.com/5c18d2d8000141c506000338-160-90.jpg"
                        alt="img"
                    />
                    <p className="course-name">
                      Electron开发仿网易云音乐播放器
                    </p>
                  </div>
                  <div>
                    <img className="course-img"
                        src="https://szimg.mukewang.com/5c18d2d8000141c506000338-160-90.jpg"
                        alt="img"
                    />
                    <p className="course-name">
                      Electron开发仿网易云音乐播放器
                    </p>
                  </div>
                </Col>
                <Col span={6}>
                  原价：￥ 206
                  实付：￥ 206
                </Col>
                <Col span={6}>
                  <span className="pay">
                    立即支付
                  </span>
                  <span className="cancel-order">
                    取消订单
                  </span>
                </Col>
              </Row>
              {/* <div className="c-table-left">
                <ul>
                  <li className="t-item">
                    <i></i>
                  </li>
                  <li className="t-item">

                  </li>
                </ul>
              </div>
              <div className="c-table-mid">
                
              </div>
              <div className="c-table-right">
                
              </div> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default OrderCenter;
