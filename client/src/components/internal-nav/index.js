import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const InternalNav = (props) => {
  let linkText = 'Text Editor';
  let linkRoute = '/texteditor';

  if (props.location.pathname === '/texteditor') {
    linkText = 'Whiteboard';
    linkRoute = '/whiteboard';
  }

  return (

    <nav>

      <div className="nav-wrapper grey darken-3 nav-text internal-nav">

        <button className="internal-nav-button">
          <i className="material-icons">undo</i>
          <p>Undo</p>
        </button>

        <button className="internal-nav-button">
          <i className="material-icons">redo</i>
          <p>Redo</p>
        </button>

        <button className="internal-nav-button">
          <i className="material-icons">save</i>
          <p>Save</p>
        </button>


        <button className="internal-nav-button">
          <i className="material-icons">delete</i>
          <p>Delete</p>
        </button>

        <button className="internal-nav-button">
          <i className="material-icons">print</i>
          <p>Print</p>
        </button>

        <button className="internal-nav-button">
          <i className="material-icons">link</i>
          <p>Link</p>
        </button>

        <button className="internal-nav-button internal-nav-button-last">
          <i className="material-icons">help</i>
          <p>Help</p>
        </button>


        <span className="nav-logo">
          <img
            src="./assets/img/collaboard-logo.png"
            className="brand-logo center"
            alt="Collaboard Logo"
          />
        </span>

        <ul className="right hide-on-med-and-down">
          <li><Link to={linkRoute}>{linkText}</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>

        <ul id="nav-mobile" className="side-nav">
          <li><Link to={linkRoute}>{linkText}</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>

        <a
          data-activates="nav-mobile"
          className="button-collapse nav-button"
        ><i className="material-icons">menu</i></a>

      </div>

    </nav>
  );
};

export default InternalNav;

InternalNav.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
