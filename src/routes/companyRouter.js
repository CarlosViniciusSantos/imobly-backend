import express from 'express'
import createCompanyController from '../controllers/company/createCompanyController.js'
import getCompanyByIdController from '../controllers/company/getCompanyByIdController.js'
import listCompaniesController from '../controllers/company/listCompaniesController.js'
import updateCompanyController from '../controllers/company/updateCompanyController.js'
import removeCompanyController from '../controllers/company/removeCompanyController.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

router.get('/list', listCompaniesController) // Rota pública para listar empresas

// Rotas protegidas
router.use(auth)
router.post('/', createCompanyController)
router.get('/:id', getCompanyByIdController)
router.put('/:id', updateCompanyController)
router.delete('/:id', removeCompanyController)

export default router