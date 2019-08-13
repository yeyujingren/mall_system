/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-08 13:32:46 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-13 19:54:56
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store/index';
import Home from './pages/index';
import Header from './component/header';
import LogModel from './component/logModel';
class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <Header />
        <LogModel />
        <BrowserRouter basename="/">
          <Switch>
            <Route to="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
