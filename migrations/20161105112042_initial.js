
exports.up = function up(knex) {
  return knex.schema.createTable('boards', (table) => {
    table.string('uid', 48).primary();
    table.string('type', 50);
  });
};

exports.down = function down(knex) {
  return knex.schema.dropTable('boards');
};
