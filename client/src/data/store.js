import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
// import createSocketIoMiddleware from 'redux-socket.io';

// let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

import rootReducer from './reducers';

// const createStoreWithMiddleWare = applyMiddleware()(createStore);
// const createStoreWithMiddleware = applyMiddleware()(createStore);

const finalCreateStore = compose(
  applyMiddleware(logger())
)(createStore);

export default function configureStore(initialState = {}) {
  return finalCreateStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
