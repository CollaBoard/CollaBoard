const cookieSession = require('cookie-session');
const router = require('express').Router();
const authport = require('authport');

authport.createServer({
  service: 'github',
  id: process.env.GITHUB_CLIENT_ID,
  secret: process.env.GITHUB_CLIENT_SECRET,
  scope: 'user:email',
  redirect_uri: 'http://localhost:4000/auth/github/callback',
});

authport.on('auth', (req, res, data) => {
  console.log(data);
  res.send(data);
});
authport.on('error', (req, res, err) => {
  console.log(err);
  res.send(err);
});

router.use(cookieSession({
  secret: 'Super Duper Secret', // TODO: Move to .env
  resave: true,
  saveUninitialized: false,
}));

router.use('/auth/:service', authport.app);

module.exports = router;
