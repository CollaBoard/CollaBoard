
exports.up = function up(knex) {
  return knex.schema.createTable('shares', (table) => {
    table.string('uid', 48).primary();
  });
};

exports.down = function down(knex) {
  return knex.schema.dropTable('shares');
};
