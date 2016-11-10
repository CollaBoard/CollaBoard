import React from 'react';
import { Link, IndexLink } from 'react-router';
// import AuthModal from '../auth';
import SignInLink from './sign-in-link';

const NavBar = () => {
  const renderAuthModal = () => {};
  return (
    <nav>
      <div className="nav-wrapper grey darken-3 nav-text">
        <a
          data-activates="mobile-demo"
          className="button-collapse nav-button"
        ><i className="material-icons">menu</i></a>
        <ul className="right hide-on-med-and-down">
          <li><IndexLink to="/">Home</IndexLink></li>
          <li><Link to="/tutorials">Tutorials </Link></li>
          <li><Link to="/shop">Shop </Link></li>
          <li><Link to="/pricing">Pricing </Link></li>
          <SignInLink onClick={renderAuthModal} />
        </ul>
        <ul className="side-nav" id="mobile-demo">
          <li><IndexLink to="/">Home</IndexLink></li>
          <li><Link to="/tutorials">Tutorials </Link></li>
          <li><Link to="/shop">Shop </Link></li>
          <li><Link to="/pricing">Pricing </Link></li>
          <SignInLink onClick={renderAuthModal} />
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
