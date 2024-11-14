import express from 'express'
import listSessionsController from '../controllers/session/listSessionsController.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

// Rota protegida para listar sessões
// router.use(auth)
router.get('/list', listSessionsController)

export default router