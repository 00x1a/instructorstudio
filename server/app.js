const express = require('express')
const morgan = require('morgan')

const courseRouter = require('./routes/course-routes')
const userRouter = require('./routes/user-routes')

const app = express()

// //////////////////////////////////////////////////////////////////
// Middlewares
// //////////////////////////////////////////////////////////////////
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

// //////////////////////////////////////////////////////////////////
// Routers
// //////////////////////////////////////////////////////////////////
app.use('/api/courses', courseRouter)
app.use('/api/users', userRouter)

module.exports = app
