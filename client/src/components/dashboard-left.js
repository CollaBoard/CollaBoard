import React from 'react';

const DashboardLeft = (props) => {
  $(document).ready(() => {
    $('.modal').modal();
  });
  let teamHeader;
  let boardHeader;
  let teamLink;
  if (props.view === 'recent' || props.view === 'my') {
    teamHeader = 'My Teams';
    teamLink = <a href="#create-team">Create new team</a>;
    if (props.view === 'recent') {
      boardHeader = <a onClick={props.showMy}>My Boards</a>;
    } else {
      boardHeader = <a onClick={props.showRecent}>Recent Boards</a>;
    }
  } else {
    teamHeader = 'Team Members';
    boardHeader = <a onClick={props.showRecent}>My Profile</a>;
    teamLink = <a onClick={() => { props.searchUsers(''); }} href="#edit-team">Edit team</a>;
  }
  return (
    <div className="col offset-s2 s8 m3 boardLeft">
      <div className="center-align">
        <img src={props.avatar} alt="board" className="avatar responsive-img" />
      </div>
      <div className="name center-align">{props.name}</div>
      <div className="myBoards center-align">
        {boardHeader}
      </div>
      <div className="myTeams center-align">
        <span className="myTeamsHeader">{teamHeader}</span>
        <ul className="myTeamsList">
          {
          props.teams.map(team =>
             (
               props.view === 'recent' || props.view === 'my'
                 ? <li key={team.uid}><a onClick={() => { props.selectTeam(team.uid); }}>
                   {team.name}</a></li>
                   : <li key={team.uid}><span>{team.name}</span></li>
             )
          )
        }
        </ul>
        {teamLink}
      </div>
      <div id="create-team" className="modal">
        <div className="modal-content">
          <h4>Create a new team</h4>
          <input id="team-input" placeholder="Enter team name here" />
        </div>
        <div className="modal-footer">
          <a
            onClick={() => { props.createTeam(document.getElementById('team-input').value); }}
            className="modal-action modal-close waves-effect waves-green btn-flat"
          >SUBMIT</a>
        </div>
      </div>
      <div id="edit-team" className="modal">
        <div className="modal-content">
          <h4>Edit your team</h4>
          <div className="row">
            <div className="col s10"><input type="text" id="team-add-input" placeholder="Search for users to add" /></div><div className="col s2"><a onClick={() => { props.searchUsers(document.getElementById('team-add-input').value); }} className="btn"><i className="material-icons">search</i></a></div>
          </div>
          {props.searchResults.map(result =>
            (
              <div className="row valign-wrapper" key={result.uid}>
                <div className="col s2 valign"><img
                  className="searchPhoto responsive-img"
                  alt="profile"
                  src={result.avatar}
                /></div>
                <div className="col s10 valign">{result.name}</div>
                <div className="col s2 valign">
                  <a
                    onClick={() => { props.modifyTeam(result.uid); }}
                    className="btn-floating btn-small waves-effect waves-light red"
                  >
                    <i className="material-icons">{result.role ? 'remove' : 'add'}</i></a>
                </div>
              </div>
          )
        )}
        </div>
      </div>


    </div>
  );
};

DashboardLeft.propTypes = {
  avatar: React.PropTypes.string,
  name: React.PropTypes.string,
  teams: React.PropTypes.arrayOf(React.PropTypes.object),
  view: React.PropTypes.string,
  showMy: React.PropTypes.func,
  showRecent: React.PropTypes.func,
  // createTeam: React.PropTypes.func,
  // modifyTeam: React.PropTypes.func,
  // searchUsers: React.PropTypes.func,
  searchResults: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default DashboardLeft;
