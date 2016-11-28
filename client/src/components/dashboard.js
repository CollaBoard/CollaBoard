import React from 'react';
import page from 'page';
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
      uid: null,
      avatar: 'https://robohash.org/JohnDoe',
      boards: [],
      teams: [],
      searchResults: [],
    };
    this.selectTeam = this.selectTeam.bind(this);
    this.showRecent = this.showRecent.bind(this);
    this.showMy = this.showMy.bind(this);
    this.createTeam = this.createTeam.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
    this.modifyTeam = this.modifyTeam.bind(this);
    this.createBoard = this.createBoard.bind(this);
  }

  componentDidMount() {
    API.getMe()
    .then((res) => {
      this.setState({
        user: {
          name: res.name,
          uid: res.uid,
          avatar: res.avatar,
          boards: res.boards,
          teams: res.teams,
        },
        view: 'recent',
        name: res.name,
        uid: res.uid,
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
      uid: this.state.user.uid,
      avatar: this.state.user.avatar,
      boards: this.state.user.boards,
      teams: this.state.user.teams,
    });
  }

  showMy() {
    API.getMyBoards()
    .then((res) => {
      this.setState({
        view: 'my',
        name: this.state.user.name,
        uid: this.state.user.uid,
        avatar: this.state.user.avatar,
        boards: res,
        teams: this.state.user.teams,
      });
    }).catch(console.err);
  }

  selectTeam(uid) {
    API.getOneTeam(uid).then((res) => {
      this.setState({
        view: 'team',
        name: res.name,
        uid: res.uid,
        avatar: res.avatar,
        boards: res.boards,
        teams: res.members,
      });
    }).catch(console.err);
  }

  createTeam(name) {
    API.createTeam(name).then((res) => {
      this.setState({
        view: 'team',
        name: res.name,
        uid: res.uid,
        avatar: res.avatar,
        boards: res.boards,
        teams: res.members,
      });
    }).catch(console.err);
  }

  searchUsers(query) {
    if (query === '') {
      this.setState({
        searchResults: [],
      });
    } else {
      API.searchUsers(query, this.state.uid).then((res) => {
        this.setState({
          searchResults: res,
        });
      }).catch(console.err);
    }
  }

  modifyTeam(uid) {
    API.addToTeam(this.state.uid, uid).then((res) => {
      this.setState({
        teams: res,
      });
    }).catch(console.err);
  }

  createBoard(name, uid) {
    console.log(name, uid);
    API.createBoard(name, uid).then((res) => {
      page(`/boards/${res.uid}`);
    }).catch(console.err);
  }

  render() {
    return (
      <div className="dashboard-outer">
        <div className="row">
          <DashboardLeft
            view={this.state.view}
            name={this.state.name}
            avatar={this.state.avatar}
            teams={this.state.teams}
            selectTeam={this.selectTeam}
            showRecent={this.showRecent}
            showMy={this.showMy}
            createTeam={this.createTeam}
            modifyTeam={this.modifyTeam}
            searchUsers={this.searchUsers}
            searchResults={this.state.searchResults}
          />
          <DashboardRight
            view={this.state.view}
            boards={this.state.boards}
            uid={this.state.uid}
            createBoard={this.createBoard}
          />
        </div>
      </div>

    );
  }
}

export default Dashboard;
