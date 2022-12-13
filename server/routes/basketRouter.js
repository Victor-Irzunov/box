import { Router } from "express"
const router = new Router()
import { basketController } from '../controllers/BasketController.js'


router.post('/add/:id', basketController.add)


export default router