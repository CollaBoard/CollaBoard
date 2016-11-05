# CollaBoard

A collaborative space for teams to maximize their productivity.

The core of the product features both an innovative live HTML5-canvas based whiteboard and a robust live code editor.


## Getting Started

Modify `knexfile.js` to match your local database settings, then run the following commands in the terminal

```bash
$ npm install
$ createdb collaboard_dev       # Create dev database
$ createdb collaboard_test      # Create test database
$ npm run migrate               # Run migrations for dev environment
$ NODE_ENV=test npm run migrate # Run migrations for test environment
$ npm start
```

Now visit [localhost:4000](http://localhost:4000/)

### Running the Tests

There is a basic test framework in your `test/` folder. Here's how to use it:

```bash
$ npm test                 # runs all tests
$ npm test server/index.js # runs tests in a single file
```

## Generators

No generators installed (yet). Installing one will populate this section in the README.

## Made with Concatapult

See [the `pult` docs](https://github.com/Concatapult/pult#readme) for adding additional modules to this boilerplate.




