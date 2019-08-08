/*
 * @Author: Yifeng Tao 
 * @Date: 2019-07-24 10:19:39 
 * @Last Modified by: 
 * @Last Modified time: 2019-08-08 13:28:54
 */
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
));
export default store;
