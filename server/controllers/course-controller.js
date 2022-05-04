const Course = require('./../models/course-model')

// //////////////////////////////////////////////////////////////////
// GET all courses
// //////////////////////////////////////////////////////////////////
exports.getAllCourses = async (req, res) => {
  try {
    // //////////////////////////////////////////////////////////////////
    // BUILD QUERY

    // filters
    const queryObject = { ...req.query } // hardcopy instead of reference
    const excludedFields = ['fields', 'page', 'sort', 'limit'] // exclude advanced query properties to not pollute .find() method
    excludedFields.forEach(el => delete queryObject[el])

    // advanced filters
    let queryString = JSON.stringify(queryObject) // is there a better way to do this?
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`) // add $ to query properties for mongoose

    let query = Course.find(JSON.parse(queryString))

    // sorting
    if (req.query.sort) {
      const sortByMultiple = req.query.sort.split(',').join(' ') // can not have a space in URL
      query = query.sort(sortByMultiple)
    } else {
      query = query.sort('-createdAt') // default sorting newest first
    }

    // field limiting
    if (req.query.fields) {
      const limitedFields = req.query.fields.split(',').join(' ') // can not have a space in URL
      query = query.select(limitedFields)
    } else {
      query = query.select('-__v') // default remove mongo NUB exposure
    }

    // pagination
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 1000
    const skipOutput = (page - 1) * limit

    if (req.query.page) {
      const totalCourses = await Course.countDocuments()
      if (skipOutput >= totalCourses) throw new Error('This page does not exist')
    }
    query = query.skip(skipOutput).limit(limit)

    // //////////////////////////////////////////////////////////////////
    // EXECUTE QUERY
    const allCourses = await query

    // //////////////////////////////////////////////////////////////////
    // SEND RESPONSE
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
