import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { batchedSubscribe } from 'redux-batched-subscribe';

import reducer from './reducers';
import initState from "./initState";

const logger = createLogger({
  collapsed: true,
});

const middleWares = [
];

if (__DEVELOPMENT__ && __CLIENT__) {
  middleWares.push(logger);
}

const enhancer = compose(
  applyMiddleware(...middleWares),
  // batchedSubscribe((notify: any) => {
  //   notify();
  // })
)

export const configStore = (cookies: any) => {
  const initialState = __CLIENT__ ? window.__INITIAL_STATE__ : initState(cookies);
  return createStore(reducer, initialState, enhancer);
}
