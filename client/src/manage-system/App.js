/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-24 10:19:39 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-08 13:33:37
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store/index';
import Login from './pages/login/index';
import ManageIndex from './pages/main/main';

class App extends Component {
  render() {
    return(
      <Provider store={store}>
          <BrowserRouter
              basename="/admin"
          >
            <Switch>
              <Route path="/index" component={ManageIndex}></Route>
              <Route path="/" component={Login}></Route>
            </Switch>
          </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
