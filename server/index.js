/* eslint-disable */
// require dotenv only in development mode
if (process.env.NODE_ENV !== 'production') {
  require('dotenv');
}
/* eslint-enable */

const browserify = require('browserify-middleware');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const passport = require('passport');
const session = require('express-session');
const socket = require('./socket/index.js');

// Do not touch express/socket stuff
const app = express();
const server = http.Server(app);
socket.listen(server);
// Resume touching

const routes = require('./routes');

//
// Provide a browserified file at a specified path
//
app.use('/app-bundle.js', browserify('./client/src/index.js', {
  transform: [
    ['babelify', { presets: ['es2015', 'react'] }],
  ],
}));

// Authentication stuff: NO TOUCHIE
app.use(session({
  secret: 'Super Duper Secret', // TODO: Move to .env
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
// End authentication stuff. Proceed touchie

app.use(bodyParser.json());

// Mount our main router
app.use('/', routes);

// Start the server!
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
