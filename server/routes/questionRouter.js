import { Router } from "express"
const router = new Router()
import { questionsController } from '../controllers/QuestionsController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'


router.post('/', questionsController.create)
router.get('/:id', questionsController.getOneProd)
router.get('/', checkRole('ADMIN'), questionsController.getAllNew)
router.post('/response', checkRole('ADMIN'), questionsController.response)


export default router