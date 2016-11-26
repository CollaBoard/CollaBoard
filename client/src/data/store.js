import { createStore, compose, applyMiddleware } from 'redux';
/* eslint-disable */
// require redux-logger only in development mode
if (process.env.NODE_ENV === 'production' && process.env.NODE_ENV !== 'test') {
  import logger from 'redux-logger';
}
/* eslint-enable */
import rootReducer from './reducers';

if (process.env.NODE_ENV === 'production' && process.env.NODE_ENV !== 'test') {
  const finalCreateStore = compose(
    applyMiddleware(logger())
  )(createStore);
} else {
  const finalCreateStore = compose(
    applyMiddleware()
  )(createStore);
}

export default function configureStore(initialState = {}) {
  return finalCreateStore(rootReducer, initialState);
}
