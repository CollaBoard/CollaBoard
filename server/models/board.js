const Puid = require('puid');
const db = require('../lib/knex-driver');

const puid = new Puid(false);

const Board = module.exports;

Board.find = function find(boardId) {
  return db('shares').where('uid', boardId).limit(1)
    .then((rows) => {
      if (!rows.length) {
        return new Error(`Board ${boardId} was not found`);
      }
      return rows[0];
    });
};

Board.create = function create() {
  const uid = puid.generate();
  return db('shares').insert({ uid }, 'uid')
    .then(uids => uids[0])
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
