const db = require('../lib/knex-driver');
const util = require('../lib/util');
const Board = require('./board');

//
// TODO: Implement member and board counts
//

/**
 * Team constructor
 *
 * @param {object} [info={}] Parameters to create the Team with
 * @param {boolean} [f=false] Is info coming from the database
 */
const Team = function Team(info = {}, f = false) {
  let fetched = (info.uid && f) || false;
  this.uid = fetched ? info.uid : util.uid();
  this.name = (info.name && info.name.trim().slice(0, 50)) || null;
  this.board_count = (fetched && info.board_count) || 0;
  this.member_count = (fetched && info.member_count) || 0;
  this.avatar = info.avatar || `https://robohash.org/${this.uid}`;
  this.creator = info.creator;

  this.save = () => {
    if (!this.creator) {
      return Promise.reject(new util.BadRequest('user_uid is required'));
    }
    if (!this.name) {
      return Promise.reject(new util.BadRequest('team_name is required'));
    }
    return (!fetched
      ? db('teams')
        .insert({
          uid: this.uid,
          name: this.name,
          creator: this.creator,
          avatar: this.avatar,
        })
        .then(() => db('team_memberships')
          .insert({
            user_uid: this.creator,
            team_uid: this.uid,
            role: 'creator',
          }))
      : db('teams').where({ uid: this.uid })
        .update({
          name: this.name,
          avatar: this.avatar,
        })
    )
      .then(() => {
        fetched = true;
        return this;
      })
      .catch(util.rethrow);
  };
};

Team.findById = Team.find = uid => db('teams')
  .where('uid', uid).limit(1)
  .then((rows) => {
    if (!rows.length) {
      util.throwNotFound(`Team ${uid} was not found`);
    }
    return new Team(rows[0], true);
  })
  .catch(util.rethrow);

Team.fetchUsers = uid => db('team_memberships').where('team_uid', uid)
  .join('users', 'users.uid', '=', 'team_memberships.user_uid')
  .select('role', 'users.uid', 'users.name', 'users.avatar')
  .catch(util.rethrow);

Team.fetchBoards = uid => db('boards')
  .where({
    creator_type: 'team',
    creator: uid,
  })
  .catch(util.rethrow);

/**
 * Add a user to a team
 * @param {string} userUid - The id of the user to add to a team
 * @param {string} teamUid - The id of the team to add the user to
 * @param {string} [role=member] - The role of the user who is being added
 */
Team.addUser = function addMember(userUid, teamUid, role = 'member') {
  if (!userUid) {
    return Promise.reject(new util.BadRequest('user_uid is required'));
  }
  if (!teamUid) {
    return Promise.reject(new util.BadRequest('team_uid is required'));
  }
  return db('team_memberships')
    .insert({
      team_uid: teamUid,
      user_uid: userUid,
      role,
    })
    .catch(util.rethrow);
};

Team.removeUser = function removeUser(userUid, teamUid) {
  if (!userUid) {
    return Promise.reject(new util.BadRequest('user_uid is requried'));
  }
  if (!teamUid) {
    return Promise.reject(new util.BadRequest('team_uid is required'));
  }
  return db('team_memberships')
    .where({
      team_uid: teamUid,
      user_uid: userUid,
    })
    .andWhere('role', '<>', 'creator')
    .del()
    .catch(util.rethrow);
};

Team.prototype.fetchUsers = function fetchUsers() {
  return Team.fetchUsers(this.uid);
};

Team.prototype.fetchBoards = function fetchBoards() {
  return Team.fetchBoards(this.uid);
};

Team.prototype.addUser = function addUser(userUid, role = 'member') {
  return Team.addUser(userUid, this.uid, role);
};

Team.prototype.removeUser = function removeUser(userUid) {
  return Team.removeUser(userUid, this.uid);
};

/**
 * Create a new board for a team
 * @param {object} board An object of options to pass to the Board constructor
 * @param {string} board.name The title of the Board
 * @param {string} uid The id of the team to create the board under
 */
Team.addBoard = function addBoard(board, uid) {
  if (!board || !board.name) {
    return Promise.reject(new util.BadRequest('board name is required'));
  }
  if (!uid) {
    return Promise.reject(new util.BadRequest('team_uid is required'));
  }
  const newBoard = new Board(Object.assign({}, board, {
    creator: uid,
    creator_type: 'team',
  }));
  return Team.findById(uid)
    .then(() => newBoard.save().then(() => newBoard))
    .catch(util.rethrow);
};


module.exports = Team;
