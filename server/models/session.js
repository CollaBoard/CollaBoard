const db = require('../lib/knex-driver');
const helpers = require('../lib/helpers');
const User = require('./user');

const Session = function Session(info, fetched = false) {
  this.uid = fetched ? info.uid : helpers.uid();
  this.user_uid = info.user_uid;
  this.token = info.token;

  this.save = function save() {
    return (
      !fetched
      ? db('sessions')
        .insert({
          uid: this.uid,
          token: this.token,
          user_uid: this.user_uid,
        })
      : Promise.reject(new Error('Sessions cannot be updated'))
      )
      .then(() => this)
      .catch(helpers.logAndThrow);
  };
};

Session.prototype.findUser = function findUser() {
  return User.findById(this.user_uid);
};

Session.find = function find(uid) {
  return db('sessions').where('uid', uid).limit(1)
    .then((rows) => {
      if (rows.length) {
        return new Session(rows[0]);
      }
      throw new helpers.NotFound('Session was not found');
    });
};
module.exports = Session;
