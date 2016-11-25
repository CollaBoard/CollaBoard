const Board = require('../models/board');
const User = require('../models/user');
const Team = require('../models/team');
const Namespace = require('../models/namespace');
const util = require('../lib/util');

const Boards = module.exports;

Boards.getBoard = (req, res) => {
  Board.find(req.params.uid, req.user && req.user.uid)
    .then((board) => {
      if (req.user) {
        const newBoards = req.session.recent_boards.filter(uid => uid !== board.uid).slice(0, 3);
        req.session.recent_boards = [board.uid].concat(newBoards);
      }
      Namespace.create(board.uid);
      return board;
    })
    .then(util.sendResult(res))
    .catch(util.sendError(res));
};

Boards.createBoard = (req, res) => {
  let createBoard;
  if (req.user && req.body.team_uid) {
    createBoard = Team.addBoard(req.body, req.body.team_uid);
  } else if (req.user) {
    createBoard = User.addBoard(req.body, req.user.uid);
  } else {
    createBoard = new Board().save();
  }
  createBoard
    .then((board) => {
      Namespace.create(board.uid);
      return board;
    })
    .then(util.sendResult(res, 201))
    .catch(util.sendError(res));
};

Boards.getForUser = (req, res) => {
  if (!req.user) {
    util.sendError(res)(new util.PermissionDenied('not logged in'));
  }
  req.user.fetchBoards()
    .then(util.sendResult(res))
    .catch(util.sendError(res));
};
