process.env.NODE_ENV = 'test';

const bodyParser = require('body-parser');
// The following allows you to require files independent of
// the location of your test file.
// Example:
//  var User = require(__server + '/models/user.js')
//
global.__test = __dirname;
global.__server = `${__dirname}/../server`;
global.__client = `${__dirname}/../client`;

//
// Assertions
//
const chai = require('chai');
chai.use(require('chai-subset'));

// Option 1: Make the `expect` function available in every test file
global.expect = chai.expect;
// Option 2: Make everything should-able
// global.should = chai.should()

//
// Helper Functions
//
// This is the object you can attach any helper functions used across
// several test files.
global.TestHelper = {};

//
// Mock apps for API testing
//
const express = require('express');

TestHelper.createApp = function () {
  const app = express();
  app.use(bodyParser.json());

  app.testReady = function () {
    // Log all errors
    app.use((err, req, res, next) => {
      console.error('==Error==');
      console.error(`   ${err.stack}`);
      next(err);
    });
  };
  return app;
};

//
// Mocha "helpers" to support coroutines tests
//
const Bluebird = require('bluebird');

global.before_ = function (f) { before(Bluebird.coroutine(f)); };
global.beforeEach_ = function (f) { beforeEach(Bluebird.coroutine(f)); };
global.after_ = function (f) { after(Bluebird.coroutine(f)); };
global.afterEach_ = function (f) { afterEach(Bluebird.coroutine(f)); };
global.it_ = function (description, f) { it(description, f && Bluebird.coroutine(f)); };
global.xit_ = function (description, f) { xit(description, f); };
global.it_.only = function (description, f) { it.only(description, Bluebird.coroutine(f)); };
