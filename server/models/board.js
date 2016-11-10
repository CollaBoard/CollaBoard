const db = require('../lib/knex-driver');

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
