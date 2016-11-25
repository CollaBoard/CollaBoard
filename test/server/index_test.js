require(TEST_HELPER); // <--- This must be at the top of every test file.

const request = require('supertest-as-promised');

const routes = require(`${__server}/index.js`);

describe('The Server', () => {
  const app = TestHelper.createApp();
  app.use('/', routes);
  app.testReady();

  xit_('serves an example endpoint', function* () {
    yield request(app)
      .get('/api')
      .expect(200)
      .expect((response) => {
        expect(response.body).to.include('api');
      });
  });
});
