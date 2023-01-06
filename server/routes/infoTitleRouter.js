import { Router } from "express"
const router = new Router()
import { infoTitleController } from '../controllers/InfoTitleController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'


router.post('/', checkRole('ADMIN'), infoTitleController.create)
router.get('/', infoTitleController.getAll)
router.delete('/:id', checkRole('ADMIN'), infoTitleController.deleteOne)


export default router