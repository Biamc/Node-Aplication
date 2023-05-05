const {hash, compare} = require('bcryptjs')
const AppError = require("../utils/AppError")

const sqliteConnection = require('../database/sqlite')

class UsersController {
  // index - GET para listar vários registros.
  // show - GET paraexebir um registro específico
  // create -  POST para criar um registro
  async create (request, response) {
    const {users_name, users_email, users_password} = request.body

    const database =  await sqliteConnection()
    const checkUserExist = await database.get('SELECT * FROM users WHERE users_email = (?)', [users_email])

    if (checkUserExist) {
      throw new AppError('Esse e-mail já está em uso')
    }

    const hashedPassword = await hash(users_password, 8)

    await database.run('INSERT INTO users(users_name, users_email, users_password) VALUES (?, ?, ?)', [users_name, users_email, hashedPassword])

    return response.status(201).json()

    /*
      response.json({name, email, password}) //ara devolver uma response pelo formato json, esse é o padrão utilizado
    */
    
    
  }

  // update - PUT para atualizar um registro

  async edit(request, response){
    
   
      const {users_name, users_email, users_password, old_users_password} = request.body
      const {id} = request.params
  
      const database = await sqliteConnection()
  
      const user = await database.get ('SELECT * FROM users WHERE id = (?)', [id])
  
      if (!user) {
      throw new AppError('Usuário não encontrado')
      }
      const userWithEditedEmail = await database.get('SELECT * FROM users WHERE users_email = (?)', [users_email])
  
      if (userWithEditedEmail  && userWithEditedEmail.id !== user.id){
        throw new AppError('Este e-mail já esta um uso')
      }
  
      user.users_name = users_name ?? user.users_name 
      // se existir conteúdo dentro de name, este (name) será utilizado, se não houver use o (user.name)
      user.users_email = users_email ?? user.users_email 

      if (users_password && !old_users_password){
        throw new AppError('você precisa informar a senha antiga')
      }

      if(users_password && old_users_password) {
  
        const checkOldPassword = await compare (old_users_password, user.users_password)
    
          
        if(!checkOldPassword){
            throw new AppError('A senha antiga não confere com a senha informada')
        }

        user.users_password = await hash(users_password, 8)
      }

      await database.run(`
      UPDATE users SET
      users_name = ?,
      users_email = ?,
      users_password = ?,
      edited_on = DATETIME('now')
      WHERE id = ?`,
      [user.users_name, user.users_email, user.users_password, id]
      )
  
      return response.json()
      
      
      
    

      
  /*
      
  
       
  
       
  
      }
      */
  
     
  
  
    
  }
  // delete - DELETE para remover um registro
}


module.exports = UsersController