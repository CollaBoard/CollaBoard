require(TEST_HELPER);

const db = require(`${__server}/lib/knex-driver`);
const User = require(`${__server}/models/user`);
// const Team = require(`${__server}/models/team`);
const Board = require(`${__server}/models/board`);
// const userFixtures = require('./fixtures/users');
const boardFixtures = require('./fixtures/boards');

// TODO: Test fetchBoards and fetchTeams
// rework to use fixtures

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
      expect(user.username).to.equal(testUser.email);
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

    it_('should be able to persist updates to the database', function* () {
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
      expect(foundUser).to.be.an('error');
    });

    it_('should return a user by a set of parameters', function* () {
      const foundUser = yield User.find({ uid: user.uid });
      expect(foundUser).to.be.an.instanceof(User);
      expect(foundUser.uid).to.equal(user.uid);
      expect(foundUser.name).to.equal(user.name);
      expect(foundUser.github_id).to.equal(user.github_id);
      expect(foundUser.google_id).to.equal(user.google_id);
      expect(foundUser.email).to.equal(user.email);
      expect(foundUser.avatar).to.equal(user.avatar);
    });
  });

  describe('User.findById', () => {
    let user;
    beforeEach_(function* () {
      yield db.deleteEverything();
      user = yield new User(testUser).save();
    });

    it('should exist on the constructor itself', () => {
      expect(User.findById).to.be.a('function');
    });

    it_('should throw an error for nonexistent users', function* () {
      const foundUser = yield User.findById('not valid').catch(err => err);
      expect(foundUser).to.be.an('error');
    });

    it_('should return a user by their ID', function* () {
      const foundUser = yield User.findById(user.uid);
      expect(foundUser).to.be.an.instanceof(User);
      expect(foundUser.uid).to.equal(user.uid);
      expect(foundUser.name).to.equal(user.name);
      expect(foundUser.github_id).to.equal(user.github_id);
      expect(foundUser.google_id).to.equal(user.google_id);
      expect(foundUser.email).to.equal(user.email);
      expect(foundUser.avatar).to.equal(user.avatar);
    });
  });

  describe('User.addBoard', () => {
    let user;
    beforeEach_(function* () {
      yield db.deleteEverything();
      user = yield new User(testUser).save();
    });

    it('should exist on the class and instances', () => {
      expect(User.addBoard).to.be.a('function');
      expect(new User().addBoard).to.be.a('function');
    });

    it('should error for a nonexistent user', function* () {
      let expectedError = yield new User().addBoard(boardFixtures.named1)
        .catch(err => err);
      expect(expectedError).to.be.an('error');

      expectedError = yield User.addBoard(boardFixtures.named1, new User().uid)
        .catch(err => err);
      expect(expectedError).to.be.an('error');
    });

    it('should create a board under the current user', function* () {
      let board = yield user.addBoard(boardFixtures.named1);
      let boards = yield db('boards').where({
        creator: user.uid,
        creator_type: 'user',
      });
      expect(boards.length).to.equal(1);
      expect(board).to.be.a(Board);

      board = yield User.addBoard(boardFixtures.named2, user.uid);
      boards = yield db('boards').where({
        creator: user.uid,
        creator_type: 'user',
      });
      expect(boards.length).to.equal(2);
      expect(board).to.be.a(Board);
    });
  });

  describe('User.fetchBoards', () => {
    let user;
    beforeEach_(function* () {
      yield db.deleteEverything();
      user = yield new User(testUser).save();
    });

    it('should exist on the class and instances', () => {
      expect(User.fetchBoards).to.be.a('function');
      expect(new User().fetchBoards).to.be.a('function');
    });

    it('should error for a nonexistent user', function* () {
      let expectedError = yield User.fetchBoards('not valid')
        .catch(err => err);
      expect(expectedError).to.be.an('error');
      expectedError = yield new User().fetchBoards()
        .catch(err => err);
      expect(expectedError).to.be.an('error');
    });
    it('should return an empty array for users with no boards', function* () {
      const foundBoards = yield User.fetchBoards(user.uid);
      expect(Array.isArray(foundBoards)).to.equal(true);
      expect(foundBoards.length).to.equal(0);
    });
    it('should return an array including boards that the user created', function* () {
      yield user.addBoard(boardFixtures.named1);
      let foundBoards = user.fetchBoards();
      expect(Array.isArray(foundBoards)).to.equal(true);
      expect(foundBoards.length).to.equal(1);

      yield User.addBoard(boardFixtures.named2, user.uid);
      foundBoards = User.fetchBoards(user.uid);
      expect(Array.isArray(foundBoards)).to.equal(true);
      expect(foundBoards.length).to.equal(2);
    });
  });

  describe('User.fetchTeams', () => {
    let user;
    beforeEach_(function* () {
      yield db.deleteEverything();
      user = yield new User(testUser).save();
    });

    it('should exist on the class and instances', () => {
      expect(User.fetchTeams).to.be.a('function');
      expect(new User().fetchTeams).to.be.a('function');
    });

    it('should throw an error for nonexistent users', function* () {
      let expectedError = yield User.fetchTeams('not valid')
        .catch(err => err);
      expect(expectedError).to.be.an('error');

      expectedError = yield new User().fetchTeams()
        .catch(err => err);
      expect(expectedError).to.be.an('error');
    });

    it('should return an empty array for users who don\'t belong to a team', function* () {
      const teams = yield user.fetchTeams();
      expect(Array.isArray(teams)).to.equal(true);
      expect(teams.length).to.equal(0);
    });
  });
});
