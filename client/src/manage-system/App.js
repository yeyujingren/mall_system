import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import store from './store/index';
import Login from './pages/login/index';
import ManageIndex from './pages/main/index';

class App extends Component {
  render() {
    return(
      <Provider store={store}>
          <HashRouter>
            <Switch>
              <Route path="/" exact component={Login}></Route>
              <Route path="/index" exact component={ManageIndex}></Route>
            </Switch>
          </HashRouter>
      </Provider>
    );
  }
}

export default App;
