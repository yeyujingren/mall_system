import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './store/index';
import Home from './pages/home';
import Header from './component/header';
import LogModel from './component/logModel';
import OrderCenter from './pages/orderCenter';
import ShopCart from './pages/shopCart';
import HasPay from './pages/hasPay';
import Persion from './pages/persion';
import Success from './component/success';
import Fail from './component/fail';
import Classify from './pages/classify';
import SearchPage from './pages/searchPage';
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
              <Route path="/haspay" component={HasPay} />
              <Route path="/success/:order" exact component={Success} />
              <Route path="/fail/:order" component={Fail} />
              <Route path="/persion" component={Persion} />
              <Route path="/type/:type" exact component={Classify} />
              <Route path="/search/:key" exact component={SearchPage} />
              <Route path="/" component={Home} />
            </Switch>
          </Fragment>
          
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
