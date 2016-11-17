const browserify = require('browserify-middleware');
const express = require('express');
const bodyParser = require('body-parser');
const socket = require('./socket/index.js');
const http = require('http');
// const fs = require('fs');

// const options = {
//   key: fs.readFileSync('./keys/22338043-localhost_4000.key'),
//   cert: fs.readFileSync('./keys/22338043-localhost_4000.cert'),
// };

const app = express();
const server = http.Server(app);
// const server = https.createServer(options, app);
// make socket listen
socket.listen(server);

const routes = require('./routes');

//
// Provide a browserified file at a specified path
//
app.use('/app-bundle.js', browserify('./client/src/index.js', {
  transform: [
    ['babelify', { presets: ['es2015', 'react'] }],
  ],
}));

app.use(bodyParser.json());

// Mount our main router
app.use('/', routes);

// Start the server!
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
