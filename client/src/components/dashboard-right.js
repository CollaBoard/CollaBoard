import React from 'react';

const DashboardRight = () => (
  <div className="col s12 m9 boardRight">
    <div className="row">
      <div className="col s7 recent">
    Recent Boards
  </div>
      <div className="col s5 right-align add">
        <a href="#!">Create board</a>
      </div>

      <div className="col m6 boardImage">
        <div>
          <a href="#!"><img src="https://placem.at/places?w=600" alt="board" className="responsive-img" /></a>
        </div>
        <div>
      Cool board
    </div>
      </div>
      <div className="col m6 boardImage">
        <div>
          <a href="#!"><img src="https://placem.at/places?w=600" alt="board" className="responsive-img" /></a>
        </div>
        <div>
      Rad board
    </div>
      </div>
      <div className="col m6 boardImage">
        <div>
          <a href="#!"><img src="https://placem.at/places?w=600" alt="board" className="responsive-img" /></a>
        </div>
        <div>
      Johns board
    </div>
      </div>
      <div className="col m6 boardImage">
        <div>
          <a href="#!"><img src="https://placem.at/places?w=600" alt="board" className="responsive-img" /></a>
        </div>
        <div>
      That neat board
    </div>
      </div>
    </div>
  </div>
);

export default DashboardRight;
