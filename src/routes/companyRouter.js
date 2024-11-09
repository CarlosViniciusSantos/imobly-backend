import express from 'express'
import createCompanyController from '../controllers/company/createCompanyController.js'
import getCompanyByIdController from '../controllers/company/getCompanyByIdController.js'
import listCompaniesController from '../controllers/company/listCompaniesController.js'
import updateCompanyController from '../controllers/company/updateCompanyController.js'
import removeCompanyController from '../controllers/company/removeCompanyController.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

// Rota pública para criar empresa
router.post('/', createCompanyController)
router.get('/list', listCompaniesController) // Rota pública para listar empresas
router.get('/:id', getCompanyByIdController)

// Rotas protegidas
router.use(auth)
router.put('/:id', updateCompanyController)
router.delete('/:id', removeCompanyController)

export default router