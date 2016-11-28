import React from 'react';

const DashboardRight = (props) => {
  $(document).ready(() => {
    $('.modal').modal();
  });
  let topTitle;
  let createTeamButton;
  if (props.view === 'recent' || props.view === 'my') {
    createTeamButton = (<a
      onClick={() => { props.createBoard(document.getElementById('board-name').value); }}
      className="modal-action modal-close waves-effect waves-green btn-flat"
    >CREATE</a>);
    if (props.view === 'recent') {
      topTitle = 'Recent Boards';
    } else {
      topTitle = 'My Boards';
    }
  } else {
    topTitle = 'Our Boards';
    createTeamButton = (<a
      onClick={() => { props.createBoard(document.getElementById('board-name').value, props.uid); }}
      className="modal-action modal-close waves-effect waves-green btn-flat"
    >CREATE</a>);
  }
  return (
    <div className="col s12 m9 boardRight">
      <div className="row">
        <div className="col s7 recent">{topTitle}</div>
        <div className="col s5 right-align add">
          <a href="#create-board">Create board</a>
        </div>
        {
          props.boards.map((board, i) =>
            (
              <div key={board.uid} className="col m6 boardImage">
                <div>
                  <a href={`/boards/${board.uid}`}>
                    <img
                      src={board.thumbnail}
                      alt="board"
                      className="responsive-img"
                    />
                  </a>
                </div>
                <div>
                  {board.name}
                </div>
              </div>
            )
          )
        }

      </div>
      <div id="create-board" className="modal">
        <div className="modal-content">
          <h4>Create a new board</h4>
          <input id="board-name" placeholder="Enter board name here" />
        </div>
        <div className="modal-footer">
          {createTeamButton}
        </div>
      </div>
    </div>
  );
};

DashboardRight.propTypes = {
  boards: React.PropTypes.arrayOf(React.PropTypes.object),
  view: React.PropTypes.string,
  // uid: React.PropTypes.string,
  // createBoard: React.PropTypes.func,
};

export default DashboardRight;
