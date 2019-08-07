import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import store from './store/index';
import Login from './pages/login/index';
import ManageIndex from './pages/main/main';

class App extends Component {
  render() {
    return(
      <Provider store={store}>
          <BrowserRouter
              basename="/admin"
              history={createBrowserHistory()}
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
