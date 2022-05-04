const express = require('express')
const courseController = require('./../controllers/course-controller')

const router = express.Router()

// //////////////////////////////////////////////////////////////////
// app.use('/api/courses', courseRouter)
// //////////////////////////////////////////////////////////////////
router
  .route('/')
  .get(courseController.getAllCourses)
  .post(courseController.postCourse)

router
  .route('/:courseId')
  .get(courseController.getCourse)
  .patch(courseController.patchCourse)
  .delete(courseController.deleteCourse)

module.exports = router
