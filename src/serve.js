require('express-async-errors')
require('dotenv/config')
const migrationsRun = require('./database/sqlite/migrations')

const AppError = require('./utils/AppError')

const express = require('express')

const routes = require('./routes')


migrationsRun()

const app = express()

app.use(express.json()) 

app.use(routes)



app.use((error, request, response, next) => {
 
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }
  return response.status(500).json({
    status: 'error',
      message: 'internal server error'
    })
  
})

const PORT = process.env.SERVER_PORT || 4444

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))