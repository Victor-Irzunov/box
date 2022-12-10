import { Router } from "express"
const router = new Router()
import { categoryController } from '../controllers/CategoryController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'


router.post('/', checkRole('ADMIN'), categoryController.create)
router.get('/', categoryController.getAll)
router.delete('/:id', checkRole('ADMIN'), categoryController.deleteOne)


export default router