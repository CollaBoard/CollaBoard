import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components';
import configureStore from './data/store';

const initialState = {
  currentTeam: '',
  connectedUsers: [],
  canvasState: {},
  editorState: '{"entityMap":{},"blocks":[{"key":"1l7tf","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
  socketName: '',
  display: {},
};
const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store} >
    <App />
  </ Provider>
  , document.getElementById('app')
);
