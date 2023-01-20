import { Router } from "express"
const router = new Router()
import { contentController } from '../controllers/ContentController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'


router.get('/', contentController.getContentPage)
router.post('/', checkRole('ADMIN'), contentController.editContentPage)



export default router