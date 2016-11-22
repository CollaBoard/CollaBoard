import React from 'react';

const DashboardRight = (props) => {
  let topTitle;
  if (props.view === 'recent') {
    topTitle = 'Recent Boards';
  } else if (props.view === 'my') {
    topTitle = 'My Boards';
  } else {
    topTitle = 'Our Boards';
  }
  return (
    <div className="col s12 m9 boardRight">
      <div className="row">
        <div className="col s7 recent">{topTitle}</div>
        <div className="col s5 right-align add">
          <a href="#!">Create board</a>
        </div>
        {
          props.boards.map((board, i) =>
            (
              <div key={i} className="col m6 boardImage">
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
};

DashboardRight.propTypes = {
  boards: React.PropTypes.arrayOf(React.PropTypes.objects),
  view: React.PropTypes.string,
};

export default DashboardRight;
