
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'Name is required'],
    unique: [true, 'Name must be unique'],
    trim: true
  },
  userEmail: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email must be unique'],
    lowercase: true,
    trim: true
  },
  userRole: {
    type: String,
    enum: ['admin', 'user', 'instructor'],
    default: 'user'
  },
  userGender: {
    type: String,
    enum: ['Male', 'Female']
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false // permanently hide exact creation date from output
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
