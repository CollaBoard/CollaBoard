import React from 'react';

const OverviewBlock = () => {
  return (    
    <div className="overview-block row">
      <h3 className="features-title">
        Start getting more done in less time
      </h3>
      <p className="features-subtitle"> Manage tasks and projects anywhere with CollaBoard. At home. At school. At work. On virtually any device </p>
      <div className="productivity-icons">  
        
        <div className="icon-access-anywhere col s4"> 
          <img src="./assets/img/cloud-icon.png" className="overview-img responsive-img"/>
          <div>Access projects anywhere</div>
        </div>
        
        <div className="icon-collab col s4">
          <img src="./assets/img/share-task-icon.png" className="overview-img responsive-img"/>
          <div>Collaborate on shared projects</div>
        </div>
        
        <div className="icon-distraction-free col s4">
          <img src="./assets/img/design-icon.png" className="overview-img responsive-img"/>
          <div>Distraction-free design</div>
        </div>
      </div>
    </div>
  );
}


export default OverviewBlock;
