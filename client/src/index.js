import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components';
import configureStore from './data/store';

const initialState = {
  currentTeam: '',
  connectedUsers: [],
  canvasState: {},
  editorState: null,
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
