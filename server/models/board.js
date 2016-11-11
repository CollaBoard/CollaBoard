const Puid = require('puid');
const db = require('../lib/knex-driver');
const Namespace = require('./namespace');

const puid = new Puid(false);
const Board = module.exports;

Board.find = function find(boardId) {
  return db('boards').where('uid', boardId).limit(1)
    .then((rows) => {
      if (!rows.length) {
        throw new Error(`Board ${boardId} was not found`);
      }

      const board = rows[0];
      // will only create namespace if it doesn't already exist
      Namespace.create(board.uid);
      return board;
    });
};

Board.create = function create(type) {
  const uid = puid.generate();
  return db('boards').insert({ uid, type })
    .then(() => {
      // create a namespace for the new room
      Namespace.create(uid);
      return { uid, type };
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
