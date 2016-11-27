import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers';

const finalCreateStore = compose(applyMiddleware())(createStore);

export default function configureStore(initialState = {}) {
  return finalCreateStore(rootReducer, initialState);
}
