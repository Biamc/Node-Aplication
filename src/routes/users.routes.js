const { Router } = require('express');
// para importar o router de dentro do express

const UsersController = require('../controllers/usersController.js')
// criar uma constante para importar o usersControles
const usersRoutes = Router ()
// cria uma constante para inicializar o Router do express

const usersController = new UsersController()
// criar uma instancia de users controlers

usersRoutes.post('/', usersController.create)
usersRoutes.put('/:id', usersController.edit)

module.exports = usersRoutes
// exportanto os arquivos do userRoutes