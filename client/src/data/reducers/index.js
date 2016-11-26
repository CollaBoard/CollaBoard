
import { combineReducers } from 'redux';

import editorState from './editorReducer';

const rootReducer = combineReducers({
  editorState,
});

export default rootReducer;
