const Puid = require('puid');
const db = require('../lib/knex-driver');
const io = require('../socket').io;

const puid = new Puid(false);
const Board = module.exports;

Board.find = function find(boardId) {
  return db('boards').where('uid', boardId).limit(1)
    .then((rows) => {
      if (!rows.length) {
        throw new Error(`Board ${boardId} was not found`);
      }
      // TODO: create the namespace if it doesn't exist already
      return rows[0];
    });
};

Board.create = function create(type) {
  const uid = puid.generate();
  return db('boards').insert({ uid, type })
    .then(() => {
      // TODO: move this into a constructor function of some sort
      const socket = io.of(`/${uid}`);
      socket.on('connection', () => {
        console.log('Connection on ', uid);
      });
      return { uid, type };
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
