const util = require('./util');
const User = require('../models/user');

const Auth = module.exports = {};
Auth.checkLogin = isRequired => (req, res, next) => {
  if (!req.session || !req.session.userUid) {
    if (isRequired) {
      return next(new util.PermissionDenied('User must be logged in'));
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
        return next(new util.PermissionDenied('User must be logged in'));
      }
      req.user = null;
      return next();
    });
};
