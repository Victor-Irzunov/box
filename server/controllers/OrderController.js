import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'


class OrderController {

	async createNoUser(req, res) {
		try {
			const {
				dataBasket, city,
				street, comment,
				date, dostavka,
				login, oplata,
				tel, time, firstName,
				lastName, otchestvo
			} = req.body

			// const user = await models.User.create({
				
			// 		login,
				
			// })

// console.log('💊💊💊-💊💊💊💊 req.body:',req.body)
// console.log('💊💊💊-💊💊💊💊 user:',user)



			// return res.status(201).json({ message: `Заказ оформлен` })


			// city: 'minsk',
			// street: '8 Туровского',
			// comment: 'kk',
			// date: '29.12.2022',
			// dostavka: 'kurer_minsk',
			// login: 'kk@gmail.com',
			// oplata: 'Онлайн оплата картой Visa/MasterCard',
			// tel: '+375 33 351 15 97',
			// time: '18-22',
			// firstName: 'undefined',
			// lastName: 'undefined',
			// otchestvo: 'undefined',
			// dataBasket: '[{"poductId":1,"count":1},{"poductId":2,"count":1}]'



		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}




}

export const orderController = new OrderController()
