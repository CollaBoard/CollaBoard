const socket = require('socket.io');

let io;
module.exports.listen = (http) => {
  io = socket.listen(http);
  io.on('connection', () => {
    console.log('Socket connected!');
  });
  module.exports.io = io;
};
