import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';
/* eslint-disable */
// require redux-logger only in development mode
let finalCreateStore;
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  const logger = require('redux-logger');
  finalCreateStore = compose(
    applyMiddleware(logger())
  )(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware()
  )(createStore);
}
/* eslint-enable */


export default function configureStore(initialState = {}) {
  return finalCreateStore(rootReducer, initialState);
}
