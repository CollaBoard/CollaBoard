import React from 'react';
import NavBar from './shared/nav-bar';

class App extends React.Component {
  render() {
	  return (
		  <div>
		  	<NavBar />
		  	{this.props.children}
		  </div>
	 	);
	}
}

export default App;