import React from 'react';
import { Link, IndexLink } from 'react-router';
import SignInLink from './sign-in-link';

const NavBar = () => (
  <nav>
    <div className="nav-wrapper">
      <Link to="/" className="brand-logo">CollaBoard</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><IndexLink to="/">Home</IndexLink></li>
        <li><Link to="/tutorials">Tutorials </Link></li>
        <li><Link to="/pricing">Pricing </Link></li>
        <SignInLink />
      </ul>
    </div>
  </nav>
);

export default NavBar;
