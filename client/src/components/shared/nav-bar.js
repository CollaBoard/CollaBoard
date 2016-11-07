import React from 'react';
import { Link, IndexLink } from 'react-router';
import AuthModal from '../auth';
import SignInLink from './sign-in-link';

const NavBar = (props) => {

	console.log('Nav props: ', props);

	const renderAuthModal = () => {
		prompt("Enter Log-In credentials");
	}

	return (
	  <nav>
	    <div className="nav-wrapper">
	      <a href="#" className="brand-logo"></a>
	      <ul id="nav-mobile" className="right hide-on-med-and-down">
	        <li><IndexLink to="/">Home</IndexLink></li>
	        <li><Link to="/tutorials">Tutorials </Link></li>
          <li><Link to="/shop">Shop </Link></li>
          <li><Link to="/pricing">Pricing </Link></li>
          <SignInLink />
	      </ul>
	    </div>
	  </nav>

	);
}

export default NavBar;