import { Router } from "express"
const router = new Router()
import { orderController } from '../controllers/OrderController.js'
import authMiddleware from "../middleware/authMiddleware.js"


router.post('/user', orderController.createNoUser)
router.get('/user/:id', authMiddleware, orderController.isBuyProduct)


export default router