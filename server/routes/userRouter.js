import { Router } from "express"
const router = new Router()
import { userController } from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import { body } from "express-validator"

router.post('/registration',
	body('login').isEmail(),
	body('password').isLength({ min: 4, max: 32 }),
	userController.registration)

router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/activate/:link', userController.activate)

export default router