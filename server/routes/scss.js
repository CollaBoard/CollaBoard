const sass = require('node-sass');

let contents;

module.exports = config => (req, res) => {
  if (contents) {
    return res.set('content-type', 'text/css').send(contents);
  }
  sass.render(config, (err, result) => {
    if (err) {
      throw err;
    }
    contents = result.css;
    res.set('Content-Type', 'text/css').send(contents);
  });
};
