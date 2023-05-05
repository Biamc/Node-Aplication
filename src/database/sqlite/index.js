const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const path = require('path')

async function sqliteConnection(){
  const database = await sqlite.open({
    filename: path.resolve(__dirname, '..', 'database.db'),
    driver: sqlite3.Database
    //p informar qual é o drive de conecção que vai ser utilizado
  })  

  return database

}// função para conectar o servidor com o banco de dados

module.exports = sqliteConnection