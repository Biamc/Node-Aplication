require('express-async-errors')
//importação do async-errors

const migrationsRun = require('./database/sqlite/migrations')

const AppError = require('./utils/AppError')
// importaç~so do AppError

const express = require('express')

const routes = require('./routes')
// por padrão quando vc não diz qual arquivo deve ser carregado, o é lido o arquivo index dentro da pasta

migrationsRun()

const app = express()
//o express ajuda a gerenciar as requisições http


app.use(express.json()) 
//p o servidor utilizar o formato para receber as informações pelo corpo da requisição

app.use(routes)



app.use((error, request, response, next) => {
  // error = p capturar o erro da requisição
  //request = p capturar a requisição
  // response = p utilizar  para devolver a resposta
  //next = p capturar a proxima etapa se for necessário
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

const PORT = 3435

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`))