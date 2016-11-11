const socket = require('socket.io');

let io;
module.exports.listen = (http) => {
  io = socket.listen(http);
  io.on('connection', (thisSocket) => {
    console.log('Socket connected!');
    thisSocket.on('text change', (newText) => {
      console.log('sending new text');
      thisSocket.broadcast.emit('serve text', newText);
    });
  });
  module.exports.io = io;
};
