import express from 'express'
import createCommentController from '../controllers/comment/createCommentController.js'
import getCommentByIdController from '../controllers/comment/getCommentByIdController.js'
import listCommentsController from '../controllers/comment/listCommentsController.js'
import updateCommentController from '../controllers/comment/updateCommentController.js'
import removeCommentController from '../controllers/comment/removeCommentController.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

// Rota pública para criar comentário
router.post('/', createCommentController)
router.get('/list', listCommentsController) // Rota pública para listar comentários
router.get('/:id', getCommentByIdController)

// Rotas protegidas
router.use(auth)
router.put('/:id', updateCommentController)
router.delete('/:id', removeCommentController)

export default router