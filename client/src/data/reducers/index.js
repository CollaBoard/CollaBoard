
import { combineReducers } from 'redux';

import modal from './modals';

const rootReducer = combineReducers({
  // this is default boilterplate:
  // state: (state = {}) => state
  modal,
});

export default rootReducer;
