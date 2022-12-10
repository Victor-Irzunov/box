import { Router } from "express"
const router = new Router()
import { productController } from '../controllers/ProductController.js'
import checkRole from '../middleware/checkRoleMiddleware.js'


router.post('/', checkRole('ADMIN'), productController.create)
router.get('/', productController.getAll)
router.get('/pohozhie/:id', productController.getPohozhie)
router.get('/:id', productController.getOne)
router.delete('/:id', checkRole('ADMIN'), productController.deleteOne)


export default router