const cookieSession = require('cookie-session');
const router = require('express').Router();
const authport = require('authport');
const User = require('../models/user');
const Session = require('../models/session');

authport.createServer({
  service: 'github',
  id: process.env.GITHUB_CLIENT_ID,
  secret: process.env.GITHUB_CLIENT_SECRET,
  scope: 'user:email',
  redirect_uri: 'http://localhost:4000/auth/github/callback',
});

authport.createServer({
  service: 'google',
  id: `${process.env.GOOGLE_CLIENT_ID}.apps.googleusercontent.com`,
  secret: process.env.GOOGLE_CLIENT_SECRET,
  scope: ['profile', 'email'],
  redirect_uri: 'http://localhost:4000/auth/google/callback',
});

authport.on('auth', (req, res, data) => {
  const profile = data.data;
  let findUser;
  if (data.service === 'github') {
    findUser = User.find({ github_id: profile.id })
      .catch(() => new User({
        github_id: profile.id,
        email: profile.email,
        name: profile.name || profile.login,
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
  }
  findUser
    .then(user => new Session({ user_uid: user.uid, token: data.token }).save())
    .then((session) => {
      req.session.uid = session.uid;
      res.redirect('/boards');
    });
});

authport.on('error', (req, res, err) => {
  res.send(err);
});

router.use(cookieSession({
  name: 'collaboard_session',
  secret: process.env.COOKIE_SECRET,
  keys: ['secret_key_1', 'secret_key_2'],
}));

router.get('/auth/:service', authport.app);

module.exports = router;
