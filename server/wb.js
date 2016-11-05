const express = require('express');
const router = express.Router();
// var app = require('http').createServer(handler)
const io = require('socket.io')();
// var fs = require('fs');

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

router.get('/', (req, res, next) => {
    res.send('hi');
})

module.exports = router;
