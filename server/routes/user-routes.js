const express = require('express')
const userController = require('./../controllers/user-controller')

const router = express.Router()

// //////////////////////////////////////////////////////////////////
// app.use('/api/users', userRouter)
// //////////////////////////////////////////////////////////////////
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.postUser)

router
  .route('/:userId')
  .get(userController.getUser)
  .patch(userController.patchUser)
  .delete(userController.deleteUser)

module.exports = router
