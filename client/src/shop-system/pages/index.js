import React, { Component } from 'react';
import Header from './component/header';
import LogModel from './component/logModel';
import CarouselModel from './carousel';
class Home extends Component {
  render() {
    return(
      <div>
        <Header />
        <LogModel />
        <CarouselModel />
      </div>
    )
  }
}

export default Home;
