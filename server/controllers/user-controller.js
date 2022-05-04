
const User = require('./../models/user-model')

// //////////////////////////////////////////////////////////////////
// GET all users
// //////////////////////////////////////////////////////////////////
exports.getAllUsers = async (req, res) => {
  try {
    // //////////////////////////////////////////////////////////////////
    // BUILD QUERY

    // filters
    const queryObject = { ...req.query } // hardcopy instead of reference
    const excludedFields = ['fields', 'page', 'sort', 'limit'] // exclude advanced query properties to not pollute .find() method
    excludedFields.forEach(el => delete queryObject[el])

    let query = User.find(queryObject)

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
      const totalUsers = await User.countDocuments()
      if (skipOutput >= totalUsers) throw new Error('This page does not exist')
    }
    query = query.skip(skipOutput).limit(limit)

    // //////////////////////////////////////////////////////////////////
    // EXECUTE QUERY
    const allUsers = await query

    // //////////////////////////////////////////////////////////////////
    // SEND RESPONSE
    res
      .status(200)
      .json({
        status: 'success',
        results: allUsers.length,
        data: {
          allUsers
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
// POST new user
// //////////////////////////////////////////////////////////////////
exports.postUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body)

    res
      .status(201)
      .json({
        status: 'success',
        data: {
          user: newUser
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
// GET specific user
// //////////////////////////////////////////////////////////////////
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)

    res
      .status(200)
      .json({
        status: 'success',
        results: user.length,
        data: {
          user
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
// PATCH specific user
// //////////////////////////////////////////////////////////////////
exports.patchUser = async (req, res) => {
  try {
    const patchedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true
    })

    res
      .status(200)
      .json({
        status: 'success',
        results: patchedUser.length,
        data: {
          patchedUser
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
// DELETE specific user
// //////////////////////////////////////////////////////////////////
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId)

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
