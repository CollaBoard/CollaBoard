const helpers = require('./helpers');
const Session = require('../models/session');

const Auth = module.exports = {};
Auth.checkLogin = isRequired => (req, res, next) => {
  if (!req.session || !req.session.uid) {
    if (isRequired) {
      return next(new helpers.PermissionDenied('User must be logged in'));
    }
    req.user = null;
    return next();
  }
  Session.find(req.session.uid)
    .then(session => session.findUser())
    .then((user) => {
      req.user = user;
      return next();
    })
    .catch(() => {
      if (isRequired) {
        return next(new helpers.PermissionDenied('User must be logged in'));
      }
      req.user = null;
      return next();
    });
};
