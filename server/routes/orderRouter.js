import { Router } from "express"
const router = new Router()
import { orderController } from '../controllers/OrderController.js'


router.post('/nouser', orderController.createNoUser)


export default router