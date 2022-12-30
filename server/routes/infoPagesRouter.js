import { Router } from "express"
const router = new Router()
import { infoPagesController } from '../controllers/InfoPagesController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'


router.post('/page', checkRole('ADMIN'), infoPagesController.create)
router.get('/page', infoPagesController.getAll)
router.get('/page/one', infoPagesController.getOne)
router.put('/page', infoPagesController.change)
router.delete('/page/:id', infoPagesController.deleteOne)




export default router