import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Main from './components/main/';
import Pricing from './components/pricing/';
import Tutorials from './components/tutorials/';
import Shop from './components/shop/';

export default (
	<Route path="/" component={App} >
		<IndexRoute component={Main} />
		<Route path="/pricing" component={Pricing} /> 
		<Route path="/tutorials" component={Tutorials} /> 
		<Route path="/shop" component={Shop} /> 
	</Route> 
)