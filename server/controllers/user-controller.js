const User = require('./../models/user-model')
const API = require('./../api')

// //////////////////////////////////////////////////////////////////
// GET all users
// //////////////////////////////////////////////////////////////////
exports.getAllUsers = async (req, res) => {
  try {
    // //////////////////////////////////////////////////////////////////
    // Build query
    const api = new API(User.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate()

    // //////////////////////////////////////////////////////////////////
    // Execute query
    const allUsers = await api.query

    // //////////////////////////////////////////////////////////////////
    // Send response
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
