import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import NavBar from './nav-bar';
import InternalNav from './internal-nav';
import * as actions from '../data/actions';
import Footer from './footer';

// TODO: Abstract away app state logic to a Container

const App = (props) => {
  const notHome = props.location.pathname === '/whiteboard' || props.location.pathname === '/texteditor';

  const showNav = () => (
    notHome ? <InternalNav location={location} /> : <NavBar />
  );

  const showFooter = () => (
    !notHome ? <Footer /> : undefined
  );

  return (
    <div>
      <header>
        { showNav() }
      </header>
      <main>
        { props.children }
      </main>
      { showFooter() }
    </div>
  );
};

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};


const bindDispatchToProps = () => ({
  showModal: actions.showModal,
});

export default connect(null, bindDispatchToProps)(App);
