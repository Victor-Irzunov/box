import { Router } from "express"
const router = new Router()
import userRouter from "./userRouter.js"
import typeRouter from "./typeRouter.js"
import infoRouter from "./infoRouter.js"
import categoryRouter from "./categoryRouter.js"
import productRouter from "./productRouter.js"
import infoTitleRouter from "./infoTitleRouter.js"
import categoryTypeRouter from "./categoryTypeRouter.js"
import basketRouter from "./basketRouter.js"
import orderRouter from "./orderRouter.js"
import otzyvyRouter from "./otzyvyRatingRouter.js"
import imgRouter from "./imgRouter.js"
import infoPagesRouter from "./infoPagesRouter.js"





router.use('/user', userRouter)

router.use('/product', productRouter)

router.use('/type', typeRouter)
router.use('/info', infoRouter)
router.use('/category', categoryRouter)
router.use('/categorytype', categoryTypeRouter)
router.use('/infotitle', infoTitleRouter)

router.use('/basket', basketRouter)
router.use('/order', orderRouter)
router.use('/otzyvy', otzyvyRouter)
router.use('/img', imgRouter)
router.use('/info', infoPagesRouter)






export default router