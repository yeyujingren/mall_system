import React, { Component } from 'react';
import Header from './component/header';
import LogModel from './component/logModel';
class Home extends Component {
  render() {
    return(
      <div>
        <Header />
        <LogModel />
      </div>
    )
  }
}

export default Home;
