import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NavBar from './nav-bar';
import * as actions from '../data/actions';

// TODO: Abstract away app state logic to a Container

const App = (props) => {
  // Hides main Navbar when in either Whiteboard or Text Editor views
  const showNavbar = () =>
    !(props.location.pathname === '/whiteboard' || props.location.pathname === '/texteditor')
;

  return (
    <div>
      { showNavbar() && <NavBar props={props} /> }
      { props.children }
    </div>
  );
};

App.propTypes = {
  // showModal: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

const bindDispatchToProps = () => ({
  showModal: actions.showModal,
});

export default connect(null, bindDispatchToProps)(App);
