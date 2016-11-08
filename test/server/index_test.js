require(TEST_HELPER); // <--- This must be at the top of every test file.

const request = require('supertest-as-promised');

const routes = require(`${__server}/app.js`);

describe('The Server', () => {
  const app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  it_('serves an example endpoint', function* () {
    yield request(app)
      .get('/api')
      .expect(200)
      .expect((response) => {
        expect(response.body).to.include('api');
      });
  });
});
