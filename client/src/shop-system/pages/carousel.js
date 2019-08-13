import React, { Component } from 'react';
import { Carousel } from 'antd';
import '../style/home.less';

class CarouselModel extends Component {
  render() {
    return (
      <div className="homeshow">
        <Carousel className="slideshow" autoplay>
          <div className="item-img">
            <img src="https://img1.sycdn.imooc.com/5d28472e0001f8fb18720632.jpg" alt="1"/>
          </div>
          <div className="item-img">
            <img src="https://img1.sycdn.imooc.com/5d50d40b0001636518720632.jpg" alt="2"/>
          </div>
          <div className="item-img">
            <img src="https://img1.sycdn.imooc.com/5cbfcfd70001efb716000540.jpg" alt="3"/>
          </div>
          <div className="item-img">
            <img src="https://img1.sycdn.imooc.com/5d28472e0001f8fb18720632.jpg" alt="4"/>
          </div>
        </Carousel>
        <div className="list-type">
          <ul className="item-ul">
            <li className="item-li">
              <i className="i-web "></i>
              <p className="title">Web前端攻城狮</p>
              <p className="desc">从未接触编程依然有你天地</p>
            </li>
            <li className="item-li">
              <i className="i-java"></i>
              <p className="title">Java攻城狮</p>
              <p className="desc">听说综合就业排名第一呦</p>
            </li>
            <li className="item-li">
              <i className="i-python"></i>
              <p className="title">Python攻城狮</p>
              <p className="desc">数据发掘领域哪家强</p>
            </li>
            <li className="item-li">
              <i className="i-android"></i>
              <p className="title">Android攻城狮</p>
              <p className="desc">移动设备市场的大哥大</p>
            </li>
            <li className="item-li">
              <i className="i-php"></i>
              <p className="title">PHP攻城狮</p>
              <p className="desc">世界上最好的语言没有之一</p>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default CarouselModel;
