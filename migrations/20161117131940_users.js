exports.up = function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('uid').primary();
    table.string('google_id').unique();
    table.string('github_id').unique();
    table.string('email').nullable();
    table.string('name').notNullable();
    table.string('avatar').nullable();
    table.timestamps(true, true);
  })
  .then(() => knex.schema.createTable('sessions', (table) => {
    table.string('uid').primary();
    table.string('token').notNullable();
    table.string('user_uid').references('users.uid');
    table.timestamp('expires', true);
  }));
};

exports.down = function down(knex) {
  return knex.schema.dropTable('sessions').then(() => knex.schema.dropTable('users'));
};
