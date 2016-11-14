import React from 'react';
import Link from './link';
import NavBar from './navbar';

const Main = () => (
  <div>
    <NavBar />
    <div className="splash-container">
      <div className="splash-overlay">
        <div className="splash-overlay-title">
          <span className="title-image">
            <img src="./assets/img/collaboard-logo.png" alt="collaboard-logo" />
          </span>
        </div>
        <div className="splash-overlay-subtitle">Innovate your teamwork</div>
      </div>
    </div>
    <div className="product-select-container">
      <Link
        href="/boards"
        className="grey darken-3 nav-text product-select-link waves-effect waves-light btn-large"
      >
        Create a board
      </Link>
    </div>
    <div className="feature-blocks">
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

export default Main;
