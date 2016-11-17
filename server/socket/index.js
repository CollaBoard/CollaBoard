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
    thisSocket.on('add figure', (figure) => {
      console.log('sending new shape event:', figure);
      thisSocket.broadcast.emit('add figure', figure);
    });
    // thisSocket.on('check-broadcast-presence', (test) => {
    //   console.log('check-broadcast-presence', test);
    // });
    // thisSocket.on('join-broadcast', (test) => {
    //   console.log('join-broadcast', test);
    // });
    // thisSocket.on('can-relay-broadcast', (test) => {
    //   console.log('can-relay-broadcast', test);
    // });
  });
  module.exports.io = io;
};
