require(TEST_HELPER);

const db = require(`${__server}/lib/knex-driver`);
const Team = require(`${__server}/models/team`);
const User = require(`${__server}/models/user`);
// const userFixtures = require('./fixtures/users');
// const teamFixtures = require('./fixtures/teams');

// TODO: rework to use fixtures

describe('The Team model', () => {
  const testUser = {
    name: 'Test User',
    github_id: 'test-github-id',
    google_id: 'test-google-id',
    email: 'totallyatest@email.com',
    avatar: 'https://robohash.org/CollaBoard',
  };

  const testTeam = { name: 'Test Team!' };

  before_(function* () {
    yield db.deleteEverything();
  });
  after_(function* () {
    yield db.deleteEverything();
  });

  it('should be a constructor function', () => {
    expect(new Team()).to.be.an.instanceof(Team);
  });

  xdescribe('Instances of Team', () => {
    let user = new User(testUser);
    let team;
    beforeEach_(function* () {
      yield db.deleteEverything();
      user = yield user.save();
    });
  });
});
