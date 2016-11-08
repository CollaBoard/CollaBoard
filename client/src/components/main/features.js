import React from 'react';

const Features = () => (
  <div className="features-section">
    <img src="../../../public/assets/img/cloud-icon.png" alt="cloud" />
    <hr />
    <h3 className="features-title">
      Start getting more done in less time
    </h3>
    <p className="features-subtitle">
      Manage tasks and projects anywhere with CollaBoard.
      At home. At school. At work. On virtually any device
    </p>
    <div className="productivity-icons">

      <div className="icon-access-anywhere">
        <img src="../../../public/assets/img/cloud-icon.png" alt="cloud" />
      </div>

      <div className="icon-collab">
        <img src="../../../public/assets/img/cloud-icon.png" alt="cloud" />
      </div>

      <div className="icon-distraction-free">
        <img src="../../../public/assets/img/cloud-icon.png" alt="cloud" />
      </div>
    </div>
  </div>
);

export default Features;
