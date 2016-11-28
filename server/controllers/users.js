const User = require('../models/user');
const Team = require('../models/team');
const util = require('../lib/util');

const Users = module.exports;

Users.update = (req, res) => {
  if (!req.user) {
    return util.sendError(res)(new util.PermissionDenied('not logged in'));
  }
  if (req.params.uid !== req.user.uid) {
    return util.sendError(res)(new util.NotFound('user not found'));
  }

  req.user.name = req.body.name || req.user.name;
  req.user.email = req.body.email || req.user.email;
  req.user.avatar = req.body.avatar || req.user.avatar;
  return req.user.save().then(util.sendResult(res, 200));
};

Users.getUser = (req, res) => {
  if (!req.user) {
    return util.sendError(res)(new util.PermissionDenied('not logged in'));
  }

  if (!req.user.uid === req.params.uid) {
    return util.sendError(res)(new util.NotFound('user not found'));
  }

  User.findById(req.params.uid, req.user.uid)
    .then(util.sendResult(res))
    .catch(util.sendError(res));
};

Users.search = (req, res) => {
  if (!req.user) {
    return util.sendError(res)(new util.PermissionDenied('not logged in'));
  }

  if (!req.query.query || !req.query.team_uid) {
    return util.sendError(res)(new util.BadRequest('a query string and team uid are required'));
  }
  Team.fetchUsers(req.query.team_uid)
    .then(members => User.search(req.query.query, req.user.uid)
      .then((matchingUsers) => {
        const existingMembers = members.reduce((obj, mem) => {
          obj[mem.uid] = 1;
          return obj;
        }, {});
        return matchingUsers.map((user) => {
          const result = Object.assign({}, user);
          result.role = existingMembers[user.uid] ? 'member' : null;
          return result;
        });
      })
    )
    .then(util.sendResult(res))
    .catch(util.sendError(res));
};
