const express = require('express');
const Board = require('../models/board');
const Namespace = require('../models/namespace');
const Auth = require('../lib/auth');
const util = require('../lib/util');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(['this', 'is', 'the', 'api', 'route']);
});

router.get('/me', Auth.checkLogin(true), (req, res) => {
  const result = Object.assign({}, req.user);
  req.user.fetchBoards()
    .then((boards) => {
      result.boards = boards;
      return req.user.fetchTeams();
    })
    .then((teams) => {
      result.teams = teams;
      if (req.session.recent_boards) {
        result.recent_boards = req.session.recent_boards;
      }
      res.send(result);
    })
    .catch(util.sendError(res));
});

router.get('/boards/:boardId', Auth.checkLogin(), (req, res) => {
  Board.find(req.params.boardId, req.user && req.user.uid)
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
});

router.post('/boards', Auth.checkLogin(), (req, res) => {
  const createBoard = req.user ? req.user.addBoard(req.body)
    .then((board) => {
      const newBoards = req.session.recent_boards.slice(0, req.session.recent_boards.length - 1);
      req.session.recent_boards = [board.uid].concat(newBoards);
      return board;
    })
    : new Board().save();
  return createBoard
    .then((board) => {
      Namespace.create(board.uid);
      return board;
    })
    .then(util.sendResult(res, 201))
    .catch(util.sendError(res));
});

router.get('/boards', Auth.checkLogin(true), (req, res) => {
  req.user.fetchBoards
    .then(util.sendResult(res))
    .catch(util.sendError(res));
});

module.exports = router;
