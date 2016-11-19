// now created in board.js component (to have individual stores for each board)
import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';

// const createStoreWithMiddleWare = applyMiddleware()(createStore);
// const createStoreWithMiddleware = applyMiddleware()(createStore);

const store = applyMiddleware()(createStore)(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
