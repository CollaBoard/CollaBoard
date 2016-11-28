import React from 'react';
import NavBar from './navbar';

const Main = props => (
  <div>
    <NavBar user={props.user} />
    <div className="splash-container container">
      <img src="./assets/img/collaboard-logo.png" alt="collaboard-logo" />
      <div className="splash-overlay-subtitle">Innovate your teamwork</div>
    </div>
    <div className="product-select-container">
      <a
        href="/boards"
        className="grey darken-3 product-select-link waves-effect waves-light btn-large"
      >
        Create a board
      </a>
    </div>
    <div className="feature-blocks container">
      <div className="overview-block">
        <h3 className="features-title">
          Start getting more done in less time
        </h3>
        <p className="features-subtitle">
          Manage tasks and projects anywhere with CollaBoard.
          At home. At school. At work. On virtually any device
        </p>
        <div className="productivity-icons row">
          <div className="icon-access-anywhere col s12 m4">
            <img
              src="./assets/img/cloud-icon.png"
              className="overview-img responsive-img"
              alt="Cloud icon"
            />
            <div>Access projects anywhere</div>
          </div>
          <div className="icon-collab col s12 m4">
            <img
              src="./assets/img/share-task-icon.png"
              className="overview-img responsive-img"
              alt="Shared tasks icon"
            />
            <div>Collaborate on shared projects</div>
          </div>
          <div className="icon-distraction-free col s12 m4">
            <img
              src="./assets/img/design-icon.png"
              className="overview-img responsive-img"
              alt="Design icon"
            />
            <div>Distraction-free design</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Main.propTypes = {
  user: React.PropTypes.objectOf(React.PropTypes.string),
};

export default Main;
