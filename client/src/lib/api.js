import $ from 'axios';

const API = {};

API.getBoard = function getBoard(uid) {
  return $.get(`/api/boards/${uid}`)
    .then(res => res.data);
};

API.createBoard = function createBoard() {
  return $.post('/api/boards')
    .then(res => res.data);
};

export default API;
