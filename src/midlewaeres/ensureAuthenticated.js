const {verify} = require("jsonwebtoken");
const AppError = require('../utils/AppError')
const authConfig = require('../config/auth')

function ensureAuthenticated(request, response, next){
  const authHeader = request.headers.authorization

  if (!authHeader){
    throw new AppError('JWT Token não informado', 401)
  }

  const [, token] = authorization.split(' ')

  try {
    const  {sub: user_id} = verify(token, authConfig.jwt.secret)

    request.user = {
      id: Number(user_id)
    }

    return next()
  }catch(error){
    console.error(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = ensureAuthenticated
