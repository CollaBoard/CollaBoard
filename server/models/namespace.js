const io = require('../socket').io;

const Namespace = module.exports;

Namespace.create = function create(uid) {
  // return the existing namespace
  if (io.nsps[`/${uid}`]) {
    return io.of(uid);
  }
  // create a new namespace and add the listeners
  const socket = io.of(uid);
  socket.on('connection', (client) => {
    socket.emit('new user');

    // Text Editor Events
    client.on('text change', (newText) => {
      console.log('sending new text:', newText);
      client.broadcast.emit('serve text', newText);
    });

    // Whiteboard Events
    client.on('add figure', (figure) => {
      // console.log('sending new shape event:', figure);
      socket.emit('add figure', figure);
    });

    // Video Chat Events

    // Text Chat Events
    client.on('chat sent', (message) => {
      console.log('chat message sent');
      socket.emit('incoming chat', message);
    });
  });
  return socket;
};
