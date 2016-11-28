import React from 'react';
import Link from './link';

const NavBar = props => (
  <nav className="grey darken-3">
    <div className="nav-wrapper container">
      <Link href="/" className="brand-logo left">CollaBoard</Link>
      <ul className="right">
        {props.user ? <li><a
          href="/dashboard"
        >My Dashboard</a></li> : <div><li><a href="/auth/github">Login with Github</a></li>
          <li><a href="/auth/google">Login with Google</a></li></div>}
      </ul>
    </div>
  </nav>
);

NavBar.propTypes = {
  user: React.PropTypes.objectOf(React.PropTypes.string),
};

export default NavBar;
