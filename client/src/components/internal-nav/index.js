import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const InternalNav = ({ location }) => {
  let linkText = 'Text Editor';
  let linkRoute = '/texteditor';

  if (location.pathname === '/texteditor') {
    linkText = 'Whiteboard';
    linkRoute = '/whiteboard';
  }

  return (

    <nav>

      <div className="nav-wrapper grey darken-3 nav-text internal-nav">

        <button className="internal-nav-button">
          <img src="./assets/img/undo.png" alt="Undo button" />
          <p>Undo</p>
        </button>

        <button className="internal-nav-button">
          <img src="./assets/img/undo-1.png" alt="Redo button" />
          <p>Redo</p>
        </button>

        <button className="internal-nav-button">
          <img src="./assets/img/save.png" alt="Save button" />
          <p>Save</p>
        </button>


        <button className="internal-nav-button">
          <img src="./assets/img/rubbish-bin.png" alt="Delete button" />
          <p>Delete</p>
        </button>

        <button className="internal-nav-button">
          <img src="./assets/img/printer.png" alt="Print button" />
          <p>Print</p>
        </button>

        <button className="internal-nav-button">
          <img src="./assets/img/unlink.png" alt="Hyperlink button" />
          <p>Link</p>
        </button>

        <button className="internal-nav-button internal-nav-button-last">
          <img src="./assets/img/question.png" alt="Help button" />
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
  location: PropTypes.shape(),
};
