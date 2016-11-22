import React from 'react';

const DashboardLeft = (props) => {
  $(document).ready(() => {
    $('.modal').modal();
  });
  let teamHeader;
  let boardHeader;
  let teamLink;
  if (props.view === 'recent') {
    teamHeader = 'My Teams';
    boardHeader = <a onClick={props.showMy}>My Boards</a>;
    teamLink = <a href="#create-team">Create new team</a>;
  } else if (props.view === 'my') {
    teamHeader = 'My Teams';
    boardHeader = <a onClick={props.showRecent}>Recent Boards</a>;
    teamLink = <a href="#create-team">Create new team</a>;
  } else {
    teamHeader = 'Team Members';
    boardHeader = <a onClick={props.showRecent}>My Profile</a>;
    teamLink = <a href="#edit-team">Edit team</a>;
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
                 <li
                   key={i}
                 ><a
                   onClick={() => { props.selectTeam(team.uid); }}
                 >{team.name}</a></li> :
                   <li key={i}><span>{team.name}</span></li>
             )
          )
        }
        </ul>
        {teamLink}
      </div>
      <div id="create-team" className="modal">
        <div className="modal-content">
          <h4>Create a new team</h4>
          <input placeholder="Enter team name here" />
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-action modal-close waves-effect waves-green btn-flat"
          >SUBMIT</a>
        </div>
      </div>
      <div id="edit-team" className="modal">
        <div className="modal-content">
          <h4>Edit your team</h4>
          <input placeholder="Search for users to add" /><a className="btn">Add</a>
        </div>
      </div>


    </div>
  );
};

DashboardLeft.propTypes = {
  avatar: React.PropTypes.string,
  name: React.PropTypes.string,
  teams: React.PropTypes.arrayOf(React.PropTypes.objects),
  view: React.PropTypes.string,
  showMy: React.PropTypes.function,
  showRecent: React.PropTypes.function,
};

export default DashboardLeft;
