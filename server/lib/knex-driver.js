// Read configuration file
const config = require('../../knexfile.js');

// Configure knex with the correct environment configuration
const env = process.env.NODE_ENV || 'development';
const db = require('knex')(config[env]);

// Export the db object, which will be able to make database connections
module.exports = db;

// Function for your testing suite
db.deleteEverything = function deleteEverything() {
  if (env !== 'test') return Promise.reject();
  return db.raw('truncate table users cascade');
};
