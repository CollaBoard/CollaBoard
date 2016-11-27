const router = require('express').Router();
const authport = require('authport');
const User = require('../models/user');
const session = require('express-session');
const KnexStore = require('connect-session-knex')(session);
const db = require('../lib/knex-driver');
const util = require('../lib/util');

authport.createServer({
  service: 'github',
  id: process.env.GITHUB_CLIENT_ID,
  secret: process.env.GITHUB_CLIENT_SECRET,
  scope: 'user:email',
});

authport.createServer({
  service: 'google',
  id: `${process.env.GOOGLE_CLIENT_ID}.apps.googleusercontent.com`,
  secret: process.env.GOOGLE_CLIENT_SECRET,
  scope: ['profile', 'email'],
});

authport.on('auth', (req, res, data) => {
  const profile = data.data;
  let findUser;
  if (data.service === 'github') {
    findUser = User.find({ github_id: profile.id })
      .catch(() => new User({
        github_id: profile.id,
        email: profile.email,
        name: profile.name,
        login: profile.login,
        avatar: profile.avatar,
      }).save());
  } else if (data.service === 'google') {
    findUser = User.find({ google_id: profile.id })
      .catch(() => new User({
        google_id: profile.id,
        email: profile.email,
        name: profile.name,
        avatar: profile.picture,
      }).save());
  } else {
    return util.throwUnexpected(new Error('Did not use github or google auth'));
  }
  findUser
    .then((user) => {
      req.session.userUid = user.uid;
      req.session.recent_boards = [];
      res.redirect('/boards');
    })
    .catch(util.sendError(res));
});

authport.on('error', (req, res, err) => {
  res.send(err);
});

router.use(session({
  name: 'collaboard_session',
  secret: process.env.COOKIE_SECRET || 'test secret',
  store: new KnexStore({
    knex: db,
    tablename: 'sessions',
  }),
  saveUninitialized: false,
  resave: false,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
}));

router.get('/auth/:service', authport.app);

module.exports = router;
