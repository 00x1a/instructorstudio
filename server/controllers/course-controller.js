const Course = require('./../models/course-model')
const API = require('./../api')

// //////////////////////////////////////////////////////////////////
// GET all courses
// //////////////////////////////////////////////////////////////////
exports.getAllCourses = async (req, res) => {
  try {
    // //////////////////////////////////////////////////////////////////
    // Build query
    const api = new API(Course.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()

    // //////////////////////////////////////////////////////////////////
    // Execute query
    const allCourses = await api.query

    // //////////////////////////////////////////////////////////////////
    // Send response
    res
      .status(200)
      .json({
        status: 'success',
        results: allCourses.length,
        data: {
          allCourses
        }
      })
  } catch (err) {
    res
      .status(404)
      .json({
        status: 'fail',
        message: err
      })
  }
}

// //////////////////////////////////////////////////////////////////
// POST new course
// //////////////////////////////////////////////////////////////////
exports.postCourse = async (req, res) => {
  try {
    const newCourse = await Course.create(req.body)

    res
      .status(201)
      .json({
        status: 'success',
        data: {
          course: newCourse
        }
      })
  } catch (err) {
    res
      .status(400)
      .json({
        status: 'fail',
        message: err
      })
  }
}

// //////////////////////////////////////////////////////////////////
// GET specific course
// //////////////////////////////////////////////////////////////////
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId)

    res
      .status(200)
      .json({
        status: 'success',
        results: course.length,
        data: {
          course
        }
      })
  } catch (err) {
    res
      .status(404)
      .json({
        status: 'fail',
        message: err
      })
  }
}

// //////////////////////////////////////////////////////////////////
// PATCH specific course
// //////////////////////////////////////////////////////////////////
exports.patchCourse = async (req, res) => {
  try {
    const patchedCourse = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
      new: true,
      runValidators: true
    })

    res
      .status(200)
      .json({
        status: 'success',
        results: patchedCourse.length,
        data: {
          patchedCourse
        }
      })
  } catch (err) {
    res
      .status(404)
      .json({
        status: 'fail',
        message: err
      })
  }
}

// //////////////////////////////////////////////////////////////////
// DELETE specific course
// //////////////////////////////////////////////////////////////////
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.courseId)

    res
      .status(204)
      .json({
        status: 'success',
        data: null
      })
  } catch (err) {
    res
      .status(404)
      .json({
        status: 'fail',
        message: err
      })
  }
}
