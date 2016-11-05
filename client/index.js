import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/nav-bar';
import SplashContainer from './components/splash-container';
import Features from './components/features';

const App = () => (
  <div>
  	<NavBar />
  	<SplashContainer />
  	<Features />
  </div>


);

ReactDOM.render(<App />, document.getElementById('app'));
