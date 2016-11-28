const express = require('express');
const Auth = require('../lib/auth');
const util = require('../lib/util');
const Boards = require('../controllers/boards');
const Users = require('../controllers/users');
const Teams = require('../controllers/teams');

const router = module.exports = express.Router();

// attach the user to the request if logged in
router.use(Auth.authenticate(false));

router.get('/me', (req, res) => {
  if (!req.user) {
    return util.sendError(res)(new util.PermissionDenied('not logged in'));
  }
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

router.get('/boards', Boards.getForUser);
router.post('/boards', Boards.createBoard);
router.get('/boards/:uid', Boards.getBoard);

router.get('/users', Users.search);
router.get('/users/:uid', Users.getUser);
router.put('/users/:uid', Users.update);

router.get('/teams', Teams.getForUser);
router.post('/teams', Teams.createTeam);
router.get('/teams/:uid', Teams.getTeam);
router.put('/teams/:uid', Teams.update);

router.use('/*', (req, res) => {
  util.sendError(res)(new util.NotFound('endpoint not found'));
});
