import React from 'react';
import Link from './link';

const NavBar = () => (
  <nav className="grey darken-3">
    <div className="nav-wrapper container">
      <Link href="/" className="brand-logo left">CollaBoard</Link>
      <ul className="right">
        <li><a href="/auth/github">Login with Github</a></li>
        <li><a href="/auth/google">Login with Google</a></li>
      </ul>
    </div>
  </nav>
);

export default NavBar;
