import React from 'react';

const DashboardLeft = () => (
  <div className="col offset-s2 s8 m3 boardLeft">
    <div className="center-align">
      <img src="https://placem.at/people?w=600&h=600" alt="board" className="circle responsive-img" />
    </div>
    <div className="name center-align">Robert Davenport</div>
    <div className="myBoards center-align"><a href="#!">My Boards</a></div>
    <div className="myTeams center-align">
      <span className="myTeamsHeader">My Teams</span>
      <ul className="myTeamsList">
        <li><a href="#!">XYZ Corp</a></li>
        <li><a href="#!">Apple Co.</a></li>
        <li><a href="#!">Orange Co.</a></li>
      </ul>
    </div>
  </div>
);

export default DashboardLeft;
