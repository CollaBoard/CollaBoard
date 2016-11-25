const util = require('../lib/util');
const User = require('../models/user');

const Auth = module.exports = {};
Auth.authenticate = (isRequired = true) => (req, res, next) => {
  if (!req.session || !req.session.userUid) {
    if (isRequired) {
      return util.sendError(res)(new util.PermissionDenied('not logged in'));
    }
    req.user = null;
    return next();
  }
  User.findById(req.session.userUid)
    .then((user) => {
      req.user = user;
      req.user.recent_boards = [];
      return next();
    })
    .catch(() => {
      if (isRequired) {
        return util.sendError(res)(new util.PermissionDenied('not logged in'));
      }
      req.user = null;
      return next();
    });
};
