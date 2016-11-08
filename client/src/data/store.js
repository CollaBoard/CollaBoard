import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';

// const createStoreWithMiddleWare = applyMiddleware()(createStore);
// const createStoreWithMiddleware = applyMiddleware()(createStore);



// const store = createStoreWithMiddleware(reducers);


const store = applyMiddleware()(createStore)(rootReducer);

// const store = createStore(reducers);

export default store;

