import React from 'react';

const DashboardLeft = props => (
  <div className="col offset-s2 s8 m3 boardLeft">
    <div className="center-align">
      <img src={props.avatar} alt="board" className="responsive-img" />
    </div>
    <div className="name center-align">{props.name}</div>
    <div className="myBoards center-align"><a href="#!">My Boards</a></div>
    <div className="myTeams center-align">
      <span className="myTeamsHeader">My Teams</span>
      <ul className="myTeamsList">
        {
        props.teams.map(team =>
           (<li><a href="#!">{team.name}</a></li>)
        )
      }
      </ul>
    </div>
  </div>
);

DashboardLeft.propTypes = {
  avatar: React.PropTypes.string,
  name: React.PropTypes.string,
  teams: React.PropTypes.array,
};

export default DashboardLeft;
