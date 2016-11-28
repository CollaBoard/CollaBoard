const Team = require('../models/team');
const User = require('../models/user');
const util = require('../lib/util');

const Teams = module.exports;

Teams.getTeam = (req, res) => {
  if (!req.user) {
    return util.sendError(res)(new util.PermissionDenied('not logged in'));
  }
  req.user.fetchTeams()
    .then((teams) => {
      if (teams.find(team => team.uid === req.params.uid)) {
        return Team.findById(req.params.uid);
      }
      util.throwNotFound('team was not found');
    })
    .then(team => team.fetchUsers()
      .then((users) => {
        team.members = users;
        return team.fetchBoards();
      })
      .then((boards) => {
        team.boards = boards;
        return team;
      })
    )
    .then(util.sendResult(res))
    .catch(util.sendError(res));
};

Teams.getForUser = (req, res) => {
  if (!req.user) {
    return util.sendError(res)(new util.PermissionDenied('not logged in'));
  }
  req.user.fetchTeams()
    .then(util.sendResult(res))
    .catch(util.sendError(res));
};

Teams.createTeam = (req, res) => {
  if (!req.user) {
    return util.sendError(res)(new util.PermissionDenied('not logged in'));
  }
  new Team({
    creator: req.user.uid,
    name: req.body.name,
    avatar: req.body.avatar,
  }).save()
    .then(team => team.fetchUsers()
      .then((users) => {
        team.members = users;
        return team.fetchBoards();
      })
      .then((boards) => {
        team.boards = boards;
        return team;
      })
    )
    .then(util.sendResult(res, 201))
    .catch(util.sendError(res));
};

Teams.update = (req, res) => {
  if (!req.user) {
    return util.sendError(res)(new util.PermissionDenied('not logged in'));
  }
  if (req.body.user_uid) {
    return Team.findById(req.params.uid)
      .then(team => User.findById(req.body.user_uid)
        .then(user => team.fetchUsers()
          .then((users) => {
            if (users.find(u => u.uid === user.uid)) {
              return team.removeUser(user.uid);
            }
            return team.addUser(user.uid);
          })
        )
        .then(() => team.fetchUsers())
      )
      .then(util.sendResult(res, 201))
      .catch(util.sendError(res));
  }

  Team.findById(req.params.uid)
    .then((team) => {
      if (team.creator === req.user.uid) {
        team.name = req.body.name || team.name;
        team.avatar = req.body.avatar || team.avatar;
        return team.save();
      }
      throw new util.BadRequest('user must be the creator of the team');
    })
    .then(util.sendResult(res, 201))
    .catch(util.sendError(res));
};

