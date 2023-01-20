import { Router } from "express"
const router = new Router()
import { groupController } from '../controllers/GroupController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'


router.delete('/:id', checkRole('ADMIN'), groupController.deleteOne)




export default router