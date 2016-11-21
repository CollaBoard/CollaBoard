import React from 'react';

const DashboardRight = props => (
  <div className="col s12 m9 boardRight">
    <div className="row">
      <div className="col s7 recent">
        Recent Boards
      </div>
      <div className="col s5 right-align add">
        <a href="#!">Create board</a>
      </div>
      {
        props.boards.map(board =>
          (
            <div className="col m6 boardImage">
              <div>
                <a href="#!"><img
                  src={board.thumbnail}
                  alt="board"
                  className="responsive-img"
                /></a>
              </div>
              <div>
                {board.name}
              </div>
            </div>
          )
        )
      }

    </div>
  </div>
);

DashboardRight.propTypes = {
  boards: React.PropTypes.array,
};

export default DashboardRight;
