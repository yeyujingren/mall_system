import React, { Component } from 'react';
import { Carousel } from 'antd';
import '../style/home.less';

class CarouselModel extends Component {
  render() {
    return (
      <Carousel className="slideshow" autoplay>
        <div className="item">
          <img src="https://img1.sycdn.imooc.com/5d28472e0001f8fb18720632.jpg" alt="1"/>
        </div>
        <div className="item">
          <img src="https://img1.sycdn.imooc.com/5d50d40b0001636518720632.jpg" alt="2"/>
        </div>
        <div className="item">
          <img src="https://img1.sycdn.imooc.com/5cbfcfd70001efb716000540.jpg" alt="3"/>
        </div>
        <div className="item">
          <img src="https://img1.sycdn.imooc.com/5d28472e0001f8fb18720632.jpg" alt="4"/>
        </div>
      </Carousel>
    )
  }
}

export default CarouselModel;
