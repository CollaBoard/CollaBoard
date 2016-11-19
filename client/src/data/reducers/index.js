
import { combineReducers } from 'redux';

import editorState from './editor';
// import modal from './modals';

const rootReducer = combineReducers({
  // this is default boilterplate:
  // state: (state = {}) => state
  // modal,
  editorState,
});

export default rootReducer;
