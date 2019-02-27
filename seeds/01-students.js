
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'Student 1'},
        {cohort_id: 2, name: 'Student 2'},
        {cohort_id: 3, name: 'Student 3'}
      ]);
    });
};
