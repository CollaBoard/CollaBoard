/* eslint-disable */
// require dotenv only in development mode
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  require('dotenv').config();
}
/* eslint-enable */

const http = require('http');
const browserify = require('browserify-middleware');
const express = require('express');
const bodyParser = require('body-parser');
const scssMiddleware = require('./routes/scss');

const socket = require('./socket');

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

app.get('/assets/main.css', scssMiddleware({
  file: './client/src/scss/app.scss',
  outputStyle: 'compressed',
}));


// app.use('/main.css', browserify('./client/src/scss/app.scss', {
//   tranform: [
//     scssify,
//     {
//       autoInject: false,
//       export: false,
//       sass: {
//       // See the relevant node-sass documentation
//         sourceMapEmbed: true,
//         sourceMapContents: true,
//         outputStyle: 'compressed',
//       },
//     },
//   ],
// }));

app.use(bodyParser.json());

// Mount our main router
app.use('/', routes);

// Start the server!
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
