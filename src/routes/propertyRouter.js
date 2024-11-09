import express from 'express'
import createPropertyController from '../controllers/property/createPropertyController.js'
import getPropertyByIdController from '../controllers/property/getPropertyByIdController.js'
import listPropertiesController from '../controllers/property/listPropertiesController.js'
import updatePropertyController from '../controllers/property/updatePropertyController.js'
import removePropertyController from '../controllers/property/removePropertyController.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

router.use(auth)
router.post('/', createPropertyController)
router.get('/list', listPropertiesController)
router.get('/:id', getPropertyByIdController)
router.put('/:id', updatePropertyController)
router.delete('/:id', removePropertyController)

export default router