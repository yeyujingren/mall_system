/*
 * @Author: Yifeng Tao 
 * @Date: 2019-08-08 13:32:46 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-14 10:18:27
 */

import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store/index';
import Home from './pages/home';
import Header from './component/header';
import LogModel from './component/logModel';
import OrderCenter from './pages/orderCenter';
import ShopCart from './pages/shopCart';
class App extends Component {
  render() {
    return(
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Fragment>
            <Header />
            <LogModel />
            <Switch>
              <Route path="/order" component={OrderCenter} />
              <Route path="/cart" component={ShopCart} />
              <Route path="/" component={Home} />
            </Switch>
          </Fragment>
          
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
