import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './data/store';
import App from './components';

const initialState = {
  currentTeam: '',
  connectedUsers: [],
  canvasState: {},
  editorState: {},
  socketName: '',
  socket: '',
  display: {},
};

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app')
);
