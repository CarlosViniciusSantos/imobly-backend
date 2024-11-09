import express from 'express'
import createCompanyController from '../controllers/company/createCompanyController.js'
import getCompanyByIdController from '../controllers/company/getCompanyByIdController.js'
import listCompaniesController from '../controllers/company/listCompaniesController.js'
import updateCompanyController from '../controllers/company/updateCompanyController.js'
import removeCompanyController from '../controllers/company/removeCompanyController.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

router.use(auth)
router.post('/', createCompanyController)
router.get('/list', listCompaniesController)
router.get('/:id', getCompanyByIdController)
router.put('/:id', updateCompanyController)
router.delete('/:id', removeCompanyController)

export default router