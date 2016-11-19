const express = require('express');
const Board = require('../models/board');
const Auth = require('../lib/auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(['this', 'is', 'the', 'api', 'route']);
});

router.get('/me', Auth.checkLogin(true), (req, res) => {
  res.send(req.user);
});

router.get('/boards/:boardId', (req, res) => {
  Board.find(req.params.boardId)
    .then(board => res.send(board))
    // TODO: better error handling
    .catch(err => res.status(404).send(err));
});

router.post('/boards', (req, res) => {
  const type = req.body.type;
  Board.create(type)
    .then(board => res.send(board))
    // TODO: better error handling
    .catch(err => res.status(500).send(err));
});

module.exports = router;
