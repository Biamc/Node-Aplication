const knex = require('../database/knex')
const {compare} = require('bcrypt')
const AppError = require('../utils/AppError')
const authConfig = require('../config/auth')
const {sign} = require('jsonwebtoken')

 
class SessionsController{
  async create (request, response){
    const {users_email, users_password} = request.body
    
    const user = await knex('users').where({users_email}).first()

  if(!user){
      throw new AppError('E-mail e/pu senha incorreta', 401)
    }

    const passwordMathed = await compare(users_password, user.users_password)

    if(!passwordMathed) {
      throw new AppError('E-mail e/pu senha incorreta', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

  return response.json({user, token})
  }
}
module.exports = SessionsController