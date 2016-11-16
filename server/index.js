/* eslint-disable */
// require dotenv only in development mode
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
/* eslint-enable */

const browserify = require('browserify-middleware');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const socket = require('./socket/index');
const authentication = require('./lib/auth');
const routes = require('./routes');

// Do not touch express/socket stuff
const app = express();
const server = http.Server(app);
socket.listen(server);
// Resume touching

//
// Provide a browserified file at a specified path
//
app.use('/app-bundle.js', browserify('./client/src/index.js', {
  transform: [
    ['babelify', { presets: ['es2015', 'react'] }],
  ],
}));

app.use(bodyParser.json());

// Mount our authentication routes
app.use(authentication);
// Mount our main router
app.use('/', routes);

// Start the server!
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
