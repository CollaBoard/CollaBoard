import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';

// const createStoreWithMiddleWare = applyMiddleware()(createStore);
// const createStoreWithMiddleware = applyMiddleware()(createStore);

const store = applyMiddleware()(createStore)(rootReducer);

export default store;
