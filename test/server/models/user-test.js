require(TEST_HELPER);

const db = require(`${__server}/lib/knex-driver`);
const User = require(`${__server}/models/user`);

describe('The User model', () => {
  before_(function* () {
    yield db.deleteEverything();
  });
  after_(function* () {
    yield db.deleteEverything();
  });

  const testUser = {
    name: 'Test User',
    github_id: 'test-github-id',
    google_id: 'test-google-id',
    email: 'totallyatest@email.com',
    avatar: 'https://robohash.org/CollaBoard',
  };

  it('should be a constructor function', () => {
    expect(new User()).to.be.an.instanceof(User);
  });

  describe('Instances of User', () => {
    beforeEach_(function* () {
      yield db.deleteEverything();
    });

    it('should have properties', () => {
      const user = new User(testUser);
      expect(user.uid).to.be.a('string');
      expect(user.name).to.equal(testUser.name);
      expect(user.email).to.equal(testUser.email);
      expect(user.github_id).to.equal(testUser.github_id);
      expect(user.google_id).to.equal(testUser.google_id);
      expect(user.avatar).to.equal(testUser.avatar);
    });

    it_('should be able to save to the database', function* () {
      let user = new User(testUser);
      expect(user.save).to.be.a('function');

      user = yield user.save();
      expect(user.uid).to.be.a('string');
      const rows = yield db('users').where('uid', user.uid);
      expect(rows.length).to.equal(1);
      const foundUser = rows[0];
      expect(foundUser.name).to.equal(testUser.name);
      expect(foundUser.email).to.equal(testUser.email);
      expect(foundUser.github_id).to.equal(testUser.github_id);
      expect(foundUser.google_id).to.equal(testUser.google_id);
      expect(foundUser.avatar).to.equal(testUser.avatar);
    });

    it_('should be able to persist changes to the database', function* () {
      const user = yield new User(testUser).save();
      user.name = 'new name!';

      const updatedUser = yield user.save().then(() => (
        db('users').where('uid', user.uid)
          .then(rows => rows[0])
      ));
      expect(updatedUser.name).to.equal(user.name);
    });
  });

  describe('User.find', () => {
    let user;
    beforeEach_(function* () {
      yield db.deleteEverything();
      user = yield new User(testUser).save();
    });

    it('should exist on the constructor itself', () => {
      expect(User.find).to.be.a('function');
    });

    it_('should throw an error for nonexistent users', function* () {
      const foundUser = yield User.find({ github_id: 'not valid' }).catch(err => err);
      expect(foundUser).to.be.an.instanceof(Error);
      expect(foundUser.statusCode).to.equal(404);
      expect(foundUser.details).to.be.a('string');
    });

    it_('should return a user by a set of parameters', function* () {
      const foundUser = yield User.find({ uid: user.uid });
      expect(foundUser.uid).to.equal(user.uid);
      expect(foundUser.name).to.equal(user.name);
      expect(foundUser.github_id).to.equal(user.github_id);
      expect(foundUser.google_id).to.equal(user.google_id);
      expect(foundUser.email).to.equal(user.email);
      expect(foundUser.avatar).to.equal(user.avatar);
    });
  });
});
