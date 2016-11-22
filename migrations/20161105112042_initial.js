
exports.up = function up(knex) {
  return Promise.all([
    knex.schema.createTable('users', (users) => {
      users.string('uid', 48).primary();
      users.string('username').unique();
      users.string('google_id').unique();
      users.string('github_id').unique();
      users.string('email').nullable();
      users.string('name').notNullable();
      users.string('avatar').nullable();
      users.timestamps(true, true);
    }).then(() => knex.schema.createTable('teams', (teams) => {
      teams.string('uid', 48).primary();
      teams.string('name', 50);
      teams.string('safename', 50);
      teams.string('avatar');
      teams.string('creator').notNullable().references('users.uid');
      teams.timestamps(true, true);
    })).then(() => knex.schema.createTable('team_memberships', (userTeams) => {
      userTeams.string('team_uid', 48).references('teams.uid');
      userTeams.string('user_uid', 48).references('users.uid');
      userTeams.string('role');
      userTeams.primary(['team_uid', 'user_uid']);
    })),
    knex.schema.createTable('boards', (boards) => {
      boards.string('uid', 48).primary();
      boards.string('creator', 48).nullable();
      boards.string('creator_type').nullable();
      boards.string('name', 50).nullable();
      boards.string('safename', 50).nullable();
      boards.string('thumbnail').nullable();
      boards.boolean('public');
    }),
  ]);
};

exports.down = function down(knex) {
  return knex.schema.dropTable('boards')
    .then(() => knex.schema.dropTable('team_memberships'))
    .then(() => knex.schema.dropTable('teams'))
    .then(() => knex.schema.dropTable('users'));
};
