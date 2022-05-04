const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: [true, 'Name is required'],
    unique: [true, 'Name must be unique'],
    trim: true
  },
  courseSummary: {
    type: String,
    required: [true, 'Summary is required'],
    trim: true
  },
  courseDescription: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  courseDifficulty: {
    type: String,
    required: [true, 'Difficultylevel is required'],
    trim: true
  },
  courseUnits: {
    type: Number,
    required: [true, 'Classes is required']
  },
  courseUnitsStartDates: [Date],
  courseMaxAttendants: {
    type: Number,
    required: [true, 'Groupsize is required']
  },
  coursePrice: {
    type: Number,
    required: [true, 'Price is required']
  },
  courseDiscount: {
    type: Number
  },
  courseRatingsAverage: {
    type: Number,
    default: 0
  },
  courseRatingsQuantity: {
    type: Number,
    default: 0
  },
  courseImageCover: {
    type: String,
    required: [true, 'Coverimage is required']
  },
  courseImageGallery: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false // permanently hide exact creation date from output
  }
})

const Course = mongoose.model('Course', courseSchema)

module.exports = Course
