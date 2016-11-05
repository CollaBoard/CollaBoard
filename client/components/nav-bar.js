import React from 'react';

class NavBar extends React.Component {
	render() {
		return (
		  <nav>
		    <div className="nav-wrapper">
		      <a href="#" className="brand-logo"></a>
		      <ul id="nav-mobile" className="right hide-on-med-and-down">
		        <li><a href="sass.html">Tutorials</a></li>
		        <li><a href="badges.html">Shop</a></li>
		        <li><a href="collapsible.html">Pricing</a></li>
            <li><a href="collapsible.html">Log In</a></li>
		      </ul>
		    </div>
		  </nav>

		);
	}
}

export default NavBar;