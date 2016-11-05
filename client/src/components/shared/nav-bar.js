import React from 'react';
import { Link } from 'react-router';
import AuthModal from '../auth'

class NavBar extends React.Component {
	
	renderAuthModal() {
		prompt("Enter Log-In credentials");
	}

	render() {
		return (
		  <nav>
		    <div className="nav-wrapper">
		      <a href="#" className="brand-logo"></a>
		      <ul id="nav-mobile" className="right hide-on-med-and-down">
		        <li><Link to="/">Home </Link></li>
		        <li><Link to="/tutorials">Tutorials </Link></li>
            <li><Link to="/shop">Shop </Link></li>
            <li><Link to="/pricing">Pricing </Link></li>
            <li onClick={this.renderAuthModal}><a>Log In</a></li>
		      </ul>
		    </div>
		  </nav>

		);
	}
}

export default NavBar;