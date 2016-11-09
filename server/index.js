const browserify = require('browserify-middleware');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const routes = require('./routes');

//
// Provide a browserified file at a specified path
//
app.use('/app-bundle.js', browserify('./client/index.js', {
  transform: [
    ['babelify', { presets: ['es2015', 'react'] }],
  ],
}));

app.use(bodyParser.json());

// Mount our main router
app.use('/', routes);

// Start the server!
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
