const $ = require('axios');

const API = {};

API.getBoard = function getBoard(uid) {
  return $.get(`/api/boards/${uid}`)
    .then(res => res.data);
};

API.createBoard = function createBoard(name, uidTeam) {
  return $.post('/api/boards', { name, uid: uidTeam })
    .then(res => res.data);
};

API.getTeams = function getTeams() {
  return $.get('/api/teams')
    .then(res => res.data);
};

API.createTeam = function createTeam(teamName) {
  return $.post('/api/teams', { name: teamName })
    .then(res => res.data);
};

API.addToTeam = function addToTeam(uidTeam, uidUser) {
  return $.put(`/api/teams/${uidTeam}`, { user_uid: uidUser })
    .then(res => res.data);
};

API.getMe = function getMe() {
  return $.get('/api/me')
    .then(res => res.data);
};

API.getMyBoards = function getMyBoards() {
  return $.get('/api/boards')
    .then(res => res.data);
};

API.getOneUser = function getOneUser(uid) {
  return $.get(`/api/users/${uid}`)
    .then(res => res.data);
};

API.getOneTeam = function getOneTeam(uid) {
  return $.get(`/api/teams/${uid}`)
    .then(res => res.data);
};

API.searchUsers = function searchUsers(query, uidTeam) {
  return $.get(`/api/users?query=${query}&team_uid=${uidTeam}`)
    .then(res => res.data);
};


export default API;
