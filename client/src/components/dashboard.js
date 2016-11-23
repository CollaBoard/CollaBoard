import React from 'react';
import API from '../lib/api';

import DashboardLeft from './dashboard-left';
import DashboardRight from './dashboard-right';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'First Last',
      avatar: 'https://robohash.org/CollaBoard',
      boards: [],
      teams: [],
    };
  }

  componentDidMount() {
    API.getMeTest()
    .then((res) => {
      console.log(res);
      this.setState({
        name: res.name,
        avatar: res.avatar,
        boards: res.boards,
        teams: res.teams,

      });
    }).catch(console.err);
  }

  render() {
    return (
      <div className="outer">
        <div className="row topDash">
          <DashboardLeft
            avatar={this.state.avatar}
            name={this.state.name}
            teams={this.state.teams}
          />
          <DashboardRight boards={this.state.boards} />
        </div>
      </div>

    );
  }

}

Dashboard.propTypes = {
};

export default Dashboard;
