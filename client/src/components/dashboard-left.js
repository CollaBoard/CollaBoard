import React from 'react';

const DashboardLeft = (props) => {
  let teamHeader;
  let boardHeader;
  if (props.view === 'recent') {
    teamHeader = 'My Teams';
    boardHeader = <a onClick={props.showMy}>My Boards</a>;
  } else if (props.view === 'my') {
    teamHeader = 'My Teams';
    boardHeader = <a onClick={props.showRecent}>Recent Boards</a>;
  } else {
    teamHeader = 'Team Members';
    boardHeader = <a onClick={props.showRecent}>My Profile</a>;
  }
  return (
    <div className="col offset-s2 s8 m3 boardLeft">
      <div className="center-align">
        <img src={props.avatar} alt="board" className="responsive-img" />
      </div>
      <div className="name center-align">{props.name}</div>
      <div className="myBoards center-align">
        {boardHeader}
      </div>
      <div className="myTeams center-align">
        <span className="myTeamsHeader">{teamHeader}</span>
        <ul className="myTeamsList">
          {
          props.teams.map((team, i) =>
             (
               props.view === 'recent' || props.view === 'my' ?
                 <li key={i}><a onClick={() => { props.selectTeam(team.uid); }}>{team.name}</a></li> :
                   <li key={i}><span>{team.name}</span></li>
             )
          )
        }
        </ul>
      </div>
    </div>
  );
};

DashboardLeft.propTypes = {
  avatar: React.PropTypes.string,
  name: React.PropTypes.string,
  teams: React.PropTypes.array,
  view: React.PropTypes.string,
};

export default DashboardLeft;
