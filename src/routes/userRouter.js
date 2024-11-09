import express from 'express'
import createUserController from '../controllers/user/createUserController.js'
import getUserByIdController from '../controllers/user/getUserByIdController.js'
import listUsersController from '../controllers/user/listUsersController.js'
import updateUserController from '../controllers/user/updateUserController.js'
import removeUserController from '../controllers/user/removeUserController.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

// Rota pública para criar usuário
router.post('/', createUserController)
router.get('/list', listUsersController) // Rota pública para listar usuários
router.get('/:id', getUserByIdController)

// Rotas protegidas
router.use(auth)
router.put('/:id', updateUserController)
router.delete('/:id', removeUserController)

export default router