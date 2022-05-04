const dotenv = require('dotenv')
dotenv.config({ path: './../.env' })

const mongoose = require('mongoose')

// //////////////////////////////////////////////////////////////////
// Mongo connection (with .env variables)
// //////////////////////////////////////////////////////////////////
mongoose
  .connect(
  `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.ME_CONFIG_MONGODB_SERVER}:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('### DATABASE CONNECTION ESTABLISHED ###')
  })

module.exports = mongoose.connection
