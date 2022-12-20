import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'


class OrderController {

	async createNoUser(req, res, next) {
		try {
			const {
				dataBasket, city,
				street, comment,
				date, dostavka,
				login, oplata,
				tel, time, firstName,
				lastName, otchestvo
			} = req.body
			const [data, created] = await models.User.findOrCreate({ where: { login } })
			const [dataCreateBasket, createdBasket] = await models.Basket.findOrCreate({ where: { userId: data.id } })
			const order = await models.Order.create({
				userId: data.id,
				delivery: dostavka,
				city, address: street,
				oplata, phone: tel,
				comment, date, time
			})
			JSON.parse(dataBasket).forEach(async (el) => {
				await models.BasketOrder.create({
					productId: el.poductId,
					count: el.count,
					price: el.price,
					basketId: dataCreateBasket.id,
					orderId: order.id,
				})
				const product = await models.Product.findOne({ where: { id: el.poductId } })
				if (product.count - el.count >= 0) {
					product.count = product.count - el.count
					await product.save()
				}

			})

			const userData = await models.UserData.findOne({ where: { userId: data.id } })
			if (!userData) {
				await models.UserData.create({
					fitstName: firstName, lastName,
					otchestvo, email: login,
					phone: tel, address: street, city,
					userId: data.id
				})
			} else {
				userData.fitstName = firstName
				userData.lastName = lastName
				userData.otchestvo = otchestvo
				userData.email = login
				userData.phone = tel
				userData.address = street
				userData.city = city
				await userData.save()
			}
			return res.status(201).json({ message: `Заказ оформлен` })
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}

	async isBuyProduct(req, res, next) {
		try {

			const userId = req.user.id
			const { id } = req.params
			const basket = await models.Basket.findOne({ where: { userId } })
			const data = await models.BasketOrder.findOne({
				where: {
				basketId: basket.id, productId: id
				}
			})
				res.status(201).json(data)
		} catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}

	}
}
export const orderController = new OrderController()
