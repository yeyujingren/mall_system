import React, { Component } from 'react';
import '../style/persion.less';

class Persion extends Component {
  render() {
    return (
      <div className="persional">
        <div className="item">
          <span>
            <img className="per-photo" src="https://img.mukewang.com/5458640c0001b0a702200220-200-200.jpg" alt=""/>
          </span>
          <span>
            更改头像
          </span>
        </div>
        <div className="item">
          ID: 123456
        </div>
        <div className="item">
          积分： 1024
        </div>
        <div className="item">
          <span className="userName">
            昵称：夜雨惊人
          </span>
        </div>
        <div className="item">
          <span className="email">
            电子邮箱：1234@gamil.com
          </span>
          <span>
            解除绑定
          </span>
        </div>
        <div className="item">
          <span>
            修改密码
          </span>
        </div>
      </div>
    )
  }
}

export default Persion;
