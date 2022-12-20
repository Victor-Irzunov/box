import { Router } from "express"
const router = new Router()
import { basketController } from '../controllers/BasketController.js'
import authMiddleware from "../middleware/authMiddleware.js"


router.post('/add/:id', authMiddleware, basketController.add)
router.post('/add/plus/:id', authMiddleware, basketController.plus)
router.post('/minus/:id', authMiddleware, basketController.minus)
router.delete('/delete/:id', authMiddleware, basketController.delete)
router.delete('/delete/all/:id', authMiddleware, basketController.deleteAll)
router.get('/', authMiddleware, basketController.getAll)


export default router