import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import NavBar from './nav-bar';
import { connect } from 'react-redux';
import * as actions from '../data/actions';

//TODO: Abstract away app state logic to a Container

const App = (props) => {

	// Hides main Navbar when in either Whiteboard or Text Editor views
	const showNavbar = () => {
		return !(props.location.pathname === '/whiteboard' || props.location.pathname === '/texteditor');
	}
	
	return (
	  <div>
	  	{ showNavbar() && <NavBar props={ props } /> }
	  	{ props.children }
	  </div>
		);
};

App.propTypes = {
	showModal: PropTypes.func.isRequired
};

const bindDispatchToProps = () => ({
	showModal: actions.showModal
})

export default connect(null, bindDispatchToProps)(App);
