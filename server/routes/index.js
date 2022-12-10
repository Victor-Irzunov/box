import { Router } from "express"
const router = new Router()
import userRouter from "./userRouter.js"
import typeRouter from "./typeRouter.js"
import infoRouter from "./infoRouter.js"
import categoryRouter from "./categoryRouter.js"
import productRouter from "./productRouter.js"
import infoTitleRouter from "./infoTitleRouter.js"
import categoryTypeRouter from "./categoryTypeRouter.js"





router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/type', typeRouter)
router.use('/info', infoRouter)
router.use('/category', categoryRouter)
router.use('/categorytype', categoryTypeRouter)
router.use('/infotitle', infoTitleRouter)




export default router