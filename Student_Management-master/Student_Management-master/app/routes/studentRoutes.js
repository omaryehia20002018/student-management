const router = require('express').Router();

const {
  getStudents,
  getOneStudent,
  addStudent,
  updateStudent,
  deleteStudent,
  studentBirthYear,
} = require('../controller/student');

router.route('/').get(getStudents).post(addStudent);
router
  .route('/:id')
  .get(getOneStudent)
  .patch(updateStudent)
  .delete(deleteStudent);

router.route('/birthYear/:year').get(studentBirthYear);

module.exports = router;
