const db = require('../lib/knex-driver');
const util = require('../lib/util');


/**
 * The Board constructor
 * @param {object} [info={}] An options hash
 * @param {string} info.name The title of the Board
 * @param {string} [info.creator=null] The id of the team or user creating the board
 * @param {string} [info.creator_type=null] The type of the creator ['user' or 'team']
 * @param {boolean} [info.public=false] Whether this board should be publicly visible
 * @param {boolean} [f=false]
 */
const Board = function Board(info = {}, f = false) {
  let fetched = (f && info.uid) || false;
  this.uid = fetched ? info.uid : util.uidShort();
  this.name = info.name || 'Untitled';
  this.creator = info.creator || null;
  this.creator_type = info.creator_type || null;
  this.public = info.creator ? !!info.public : true;
  this.thumbnail = null;

  this.save = () => (
    (!fetched
      ? db('boards').insert({
        uid: this.uid,
        name: this.name,
        creator: this.creator,
        creator_type: this.creator_type,
        public: this.public,
        thumbnail: this.thumbnail || null,
      })
      : db('boards').where('uid', this.uid)
        .update({
          name: this.name,
          public: !!this.public,
        })
    )
      .then(() => {
        fetched = true;
        return this;
      })
      .catch(util.rethrow)
  );
};

/**
 * Find a board by ID
 * @param {string} boardId
 * @param {string} [userUid] The id of the user who is requesting the board
 * @returns {Promise} Resolves to a Board
 */
Board.findById = Board.find = function find(boardUid, userUid) {
  return db('boards').where('uid', boardUid).limit(1)
    .then((rows) => {
      if (!rows.length) {
        util.throwNotFound(`Board ${boardUid} was not found`);
      }
      const board = new Board(rows[0], true);
      if (board.public || board.creator === userUid) {
        return board;
      }
      if (!userUid) {
        util.throwNotFound(`Board ${boardUid} was not found`);
      }
      return db('team_memberships')
        .where(() => {
          if (board.creator_type === 'team') {
            return this.where('team_uid', board.creator);
          }
          this.where('user_uid', board.creator);
        })
        .andWhere('user_uid', userUid)
        .then((results) => {
          if (results.length) {
            return board;
          }
          util.throwNotFound(`Board ${boardUid} was not found`);
        })
        .catch(util.rethrow);
    });
};

module.exports = Board;
