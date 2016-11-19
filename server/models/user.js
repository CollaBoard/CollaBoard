const db = require('../lib/knex-driver');
const helpers = require('../lib/helpers');

const User = function User(info = {}, f = false) {
  let fetched = (info.uid && f) || false;
  this.uid = fetched ? info.uid || helpers.uuid() : helpers.uid();
  this.name = info.name || null;
  this.email = info.email || null;
  this.github_id = info.github_id || null;
  this.google_id = info.google_id || null;
  this.avatar = info.avatar || null;

  this.save = function save() {
    return (
      !fetched
      ? db('users')
        .insert({
          uid: this.uid,
          name: this.name,
          email: this.email,
          github_id: this.github_id,
          google_id: this.google_id,
          avatar: this.avatar,
        })
      : db('users').where({ uid: this.uid })
        .update({
          name: this.name,
          email: this.email,
          github_id: this.github_id,
          google_id: this.google_id,
          avatar: this.avatar,
        })
    )
      .then(() => {
        fetched = true;
        return this;
      })
      .catch(helpers.logAndThrow);
  };
};


User.find = function find(params) {
  return db('users').where(params).limit(1)
    .then((rows) => {
      if (rows.length) {
        return new User(rows[0], true);
      }
      throw new helpers.NotFound('No user was found');
    })
    .catch(helpers.logAndThrow);
};

User.findById = function findById(uid) {
  return db('users').where('uid', uid).limit(1)
    .then((rows) => {
      if (rows.length) {
        return new User(rows[0], true);
      }
      throw new helpers.NotFound('No user was found');
    })
    .catch(helpers.logAndThrow);
};

module.exports = User;
