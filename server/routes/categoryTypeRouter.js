import { Router } from "express"
const router = new Router()
import { categoryTypeController } from '../controllers/CategoryTypeController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'

router.get('/', categoryTypeController.getAll)
router.delete('/:id', checkRole('ADMIN'), categoryTypeController.deleteOne)


export default router