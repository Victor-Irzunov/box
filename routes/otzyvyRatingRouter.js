import { Router } from "express"
const router = new Router()
import { otzyvyRatingController } from '../controllers/OtzyvyRatingController.js'
import authMiddleware from "../middleware/authMiddleware.js"


router.post('/', authMiddleware, otzyvyRatingController.create)
router.get('/:id', authMiddleware, otzyvyRatingController.getAll)
router.get('/user/:id', authMiddleware, otzyvyRatingController.getUser)


export default router