import React from 'react';
import Link from './link';

const NavBar = () => (
  <nav>
    <div className="nav-wrapper grey darken-3 nav-text">
      <Link href="/" className="brand-logo left">CollaBoard</Link>
      <a className="nav-button right">Log In</a>
    </div>
  </nav>
);

export default NavBar;
