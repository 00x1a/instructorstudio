const dotenv = require('dotenv')
dotenv.config({ path: './.env' })

require('./database/mongo-connection')

const app = require('./server/app')

app.get('/', (req, res) => {
  res.status(200).send('Hello from the server!!!')
})

const port = process.env.SERVER_PORT || 3000
app.listen(port, () => {
  console.log(`### APP IS RUNNING ON PORT ${port} ###`)
})
