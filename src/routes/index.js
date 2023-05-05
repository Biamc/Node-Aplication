const {Router} = require('express')

const usersRouter = require('./users.routes')
const notesRouter = require('./notes.routes')
const tagsRouter = require('./tags.routes')

const routes = Router()

// a função desse index é reunir todas as rotas da aplicação, que vao estar separadas por arquivos


routes.use('/users', usersRouter)
routes.use('/notes', notesRouter)
routes.use('/tags', tagsRouter)

module.exports = routes