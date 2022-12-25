import { Router } from "express"
const router = new Router()
import { orderController } from '../controllers/OrderController.js'
import authMiddleware from "../middleware/authMiddleware.js"
import checkRole from '../middleware/checkRoleMiddleware.js'

router.post('/user', orderController.createNoUser)
router.get('/user/:id', authMiddleware, orderController.isBuyProduct)
router.get('/user', authMiddleware, orderController.getAll)
router.get('/date', checkRole('ADMIN'), orderController.getDateAdmin)
router.get('/:id', checkRole('ADMIN'), orderController.getOneAdmin)
router.get('/change/status', checkRole('ADMIN'), orderController.changeStatusOrder)

router.get('/courier/date', checkRole('COURIER'), orderController.getDateAdmin)
router.get('/courier/:id', checkRole('COURIER'), orderController.getOneAdmin)
router.get('/courier/change/status', checkRole('COURIER'), orderController.changeStatusOrder)


export default router