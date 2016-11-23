import React from 'react';
import API from '../lib/api';

import DashboardLeft from './dashboard-left';
import DashboardRight from './dashboard-right';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      view: null,
      name: 'John Doe',
      avatar: 'https://robohash.org/JohnDoe',
      boards: [],
      teams: [],
    };
    this.selectTeam = this.selectTeam.bind(this);
    this.showRecent = this.showRecent.bind(this);
    this.showMy = this.showMy.bind(this);
  }

  componentDidMount() {
    API.getMeTest()
    .then((res) => {
      this.setState({
        user: {
          name: res.name,
          avatar: res.avatar,
          boards: res.boards,
          teams: res.teams,
          myTeam: res.my_team,
        },
        view: 'recent',
        name: res.name,
        avatar: res.avatar,
        boards: res.boards,
        teams: res.teams,
      });
    }).catch(console.err);
  }

  showRecent() {
    this.setState({
      view: 'recent',
      name: this.state.user.name,
      avatar: this.state.user.avatar,
      boards: this.state.user.boards,
      teams: this.state.user.teams,
    });
  }

  showMy() {
    API.getOneTeamTest(this.state.user.myTeam)
    .then((res) => {
      this.setState({
        view: 'my',
        name: this.state.user.name,
        avatar: this.state.user.avatar,
        boards: res.boards,
        teams: res.members,
      });
    }).catch(console.err);
  }

  selectTeam(uid) {
    API.getOneTeamTest(uid).then((res) => {
      this.setState({
        view: 'team',
        name: res.name,
        avatar: res.avatar,
        boards: res.boards,
        teams: res.members,
      });
    }).catch(console.err);
  }

  render() {
    return (
      <div className="outer">
        <div className="row topDash">
          <DashboardLeft
            view={this.state.view}
            name={this.state.name}
            avatar={this.state.avatar}
            teams={this.state.teams}
            selectTeam={this.selectTeam}
            showRecent={this.showRecent}
            showMy={this.showMy}
          />
          <DashboardRight view={this.state.view} boards={this.state.boards} />
        </div>
      </div>

    );
  }

}

Dashboard.propTypes = {
};

export default Dashboard;
