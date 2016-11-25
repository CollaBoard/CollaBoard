const db = require('../lib/knex-driver');
const util = require('../lib/util');
const Board = require('./board');

//
// TODO: Implement usernames
// most recently edited boards
// search by name, username, or email
//

/**
 * Constructor function for a User object
 * @param {object} [info={}] - A hash of options to create the User from
 * @param {string} [info.username] - The unique username for the user
 * @param {string} info.name - The name to provide for a user
 * @param {string} [info.email] - The email to associate with a user
 * @param {string} [info.google_id=null] - The google id to associate with the user
 * @param {string} [info.github_id=null] - The github id to associate with the user
 * @param {string} [info.avatar] - The url of the avatar to associate with the user
 * @param {boolean} [f=false]
 * @return {User} An instance of User
 */
const User = function User(info = {}, f = false) {
  const fetched = (info.uid && f) || false;
  this.uid = fetched ? info.uid : util.uid();
  this.username = info.username || info.login || info.email;
  this.name = (info.name && info.name.trim()) || null;
  this.email = (info.email && info.email.trim()) || null;
  this.github_id = info.github_id || null;
  this.google_id = info.google_id || null;
  this.avatar = info.avatar || `https://robohash.org/${this.username}`;

  /**
   * Save the user object to the database by either insert or update
   * @return {Promise} Resolves to the updated user object
   */
  this.save = () => {
    if (!this.name) {
      return Promise.reject(new util.BadRequest('\'name\' is required'));
    }
    if (!this.google_id && !this.github_id) {
      return Promise.reject(new util.BadRequest('\'github_id\' or \'google_id\' is required'));
    }
    if (!this.username) {
      return Promise.reject(new util.BadRequest('user \'email\', \'login\', or \'username\' is required'));
    }
    return (
      (!fetched
      ? db('users')
        .insert({
          uid: this.uid,
          name: this.name,
          username: this.username,
          email: this.email,
          github_id: this.github_id,
          google_id: this.google_id,
          avatar: this.avatar,
        }, ['uid', 'name', 'username', 'email', 'github_id', 'google_id', 'avatar'])
      : db('users').where({ uid: this.uid })
        .update({
          name: this.name,
          email: this.email,
          username: this.username,
          github_id: this.github_id,
          google_id: this.google_id,
          avatar: this.avatar,
        }, ['uid', 'name', 'username', 'email', 'github_id', 'google_id', 'avatar'])
      )
      .then(rows => new User(rows[0], true))
      .catch(util.rethrow)
    );
  };
};

/**
 * Find a user based on any parameters
 * @param {object} params - A hash of any properties to search for
 * @returns {Promise} A promise resolving to a User that matches
 */
User.find = function find(params) {
  return db('users').where(params).limit(1)
    .then((rows) => {
      if (rows.length) {
        return new User(rows[0], true);
      }
      util.throwNotFound('user not found');
    })
    .catch(util.rethrow);
};

/**
 * Find a user based on the uid
 * @param {string} uid - Id to find a matching user for
 * @returns {Promise} Promise resolving to a User object
 */
User.findById = function findById(uid) {
  return User.find({ uid });
};


/**
 * Search for users with a name, username, or email
 * @param {any} query
 * @returns
 */
User.search = function search(q, uid) {
  if (!q || !q.trim()) {
    return Promise.reject(new util.BadRequest('query is required'));
  }
  if (!uid) {
    return Promise.reject(new util.BadRequest('user_uid is required'));
  }
  const query = q.trim().toLowerCase();
  return db('users').where('uid', '<>', uid)
    .andWhere('name', 'ilike', `%${query}%`)
    .orWhere('username', 'ilike', `%${query}%`)
    .orWhere('email', 'ilike', `${query}%`)
    .limit(10)
    .select('uid', 'name', 'avatar')
    .catch(util.rethrow);
};

/**
 * Fetch an array of teams the user belongs to
 * @param {string} uid - The id of the user to fetch teams for
 * @return {Promise} Resolves to an array of teams the user is a member of
 */
User.fetchTeams = uid => db('team_memberships')
  .where('user_uid', uid)
  .join('teams', 'uid', '=', 'team_uid')
  .select('role', 'uid', 'name', 'avatar')
  .catch(util.rethrow);

/**
 * Fetch an array of boards the user owns
 * @param {string} uid - The id of the user to fetch boards for
 * @return {Promise} Resolves to an array of boards the user created
 */
User.fetchBoards = uid => db('boards')
  .where({ creator: uid, creator_type: 'user' })
  .select('uid', 'name', 'thumbnail')
  .catch(util.rethrow);

/**
 * Create a new board for a user
 * @param {object} board - An object of options to pass to the Board constructor
 * @param {string} board.name - The title of the Board
 * @param {string} uid - The id of the user to create the Board under
 */
User.addBoard = function addBoard(board = {}, uid) {
  const newBoard = new Board(Object.assign({}, board, {
    creator: uid,
    creator_type: 'user',
  }));
  return User.findById(uid)
    .then(() => newBoard.save().then(() => newBoard))
    .catch(util.rethrow);
};

/**
 * Fetch teams for current user
 * @return {Promise} Resolves to array of teams the user is a member of
 */
User.prototype.fetchTeams = function fetchTeams() {
  return User.fetchTeams(this.uid);
};

/**
 * Fetch boards for current user
 * @return {Promise} Resolves to array of boards the user created
 */
User.prototype.fetchBoards = function fetchBoards() {
  return User.fetchBoards(this.uid);
};

User.prototype.addBoard = function addBoard(board) {
  return User.addBoard(board, this.uid);
};

module.exports = User;
