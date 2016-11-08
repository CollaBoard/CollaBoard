import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { promise } from 'redux-promise';
import routes from './src/routes';
import store from './src/data/store'



ReactDOM.render(
	<Provider store={ store }> 
		<Router history={ browserHistory } routes={ routes } />
	</Provider>
	, document.getElementById('app')
);
