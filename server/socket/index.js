const socket = require('socket.io');

module.exports.listen = (http) => {
  module.exports.io = socket.listen(http);
};
