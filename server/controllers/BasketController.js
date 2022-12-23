import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'

class BasketController {

	async add(req, res, next) {
		try {
			const userId = req.user.id
			const id = req.params.id
			const basketUser = await models.Basket.findOne({ where: { userId } })
			const [data, created] = await models.BasketProduct.findOrCreate({
				where: { productId: id, basketId: basketUser.id, inStock: true }
			})
			if (!created) {
				data.count += 1
				await data.save()
			}
			const basket = await models.BasketProduct.findAll()
			return res.json(basket)

		} catch (e) {
			console.log('🦺e.message: ', e.message)
			console.log('🦺e: ', e)
			next(ApiError.internal(e.message))
		}
	}

	async getAll(req, res, next) {
		try {
			const userId = req.user.id
			const basketUser = await models.Basket.findOne({ where: { userId } })
			const allBasketUser = await models.BasketProduct.findAll({
				where: { basketId: basketUser.id },
				include: {
					model: models.Product,
					include: [
						{
							model: models.Category
						},
						{
							model: models.Type
						},
					]
				}
			})
			// console.log('💊💊💊--allBasketUser:', allBasketUser)
			return res.json(allBasketUser)
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.internal(e.message))
		}
	}

	async plus(req, res, next) {
		try {
			const userId = req.user.id
			const { id } = req.params
			const basketUser = await models.Basket.findOne({ where: { userId } })
			const updateBasket = await models.BasketProduct.findOne({ where: { productId: id } })
			updateBasket.count += 1
			await updateBasket.save()
			const basket = await models.BasketProduct.findAll({
				where: { basketId: basketUser.id },
				include: [{
					model: models.Product
				}]
			})
			// console.log('💊💊💊--basket:', basket)
			return res.json(basket)
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.internal(e.message))
		}
	}

	async minus(req, res, next) {
		try {
			const userId = req.user.id
			const { id } = req.params
			const basketUser = await models.Basket.findOne({ where: { userId } })
			const updateBasket = await models.BasketProduct.findOne({ where: { productId: id } })
			updateBasket.count -= 1
			await updateBasket.save()
			const basket = await models.BasketProduct.findAll({
				where: { basketId: basketUser.id },
				include: [{
					model: models.Product
				}]
			})
			// console.log('💊💊💊--basket:', basket)
			return res.json(basket)
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.internal(e.message))
		}
	}

	async delete(req, res, next) {
		// console.log('💊💊💊')
		try {
			const userId = req.user.id
			const { id } = req.params
			const basketUser = await models.Basket.findOne({ where: { userId } })
			await models.BasketProduct.destroy({ where: { productId: id } })

			const basket = await models.BasketProduct.findAll({
				where: { basketId: basketUser.id },
				include: [{
					model: models.Product
				}]
			})
			return res.json(basket)
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.internal(e.message))
		}
	}

	async deleteAll(req, res, next) {
		// console.log('💊💊💊')
		try {
			const userId = req.user.id
			const basketUser = await models.Basket.findOne({ where: { userId } })
			await models.BasketProduct.destroy({ where: { basketId: basketUser.id } })


			return res.json({ message: 'Корзина очищена' })
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.internal(e.message))
		}
	}




	// async removeAll(req, res) {
	// 	const userId = req.user.id
	// 	const basketUser = await Basket.findOne({ where: { userId } })
	// 	await BasketDevice.destroy({ where: { basketId: basketUser.id } })

	// 	await BasketOrder.destroy({ where: { basketId: basketUser.id } })

	// 	return res.json({ messages: 'удалено всё' })
	// }




	//:I'm deleting one type of product:
	// async deleteOneProduct(req, res) {
	// 	const userId = req.user.id
	// 	//.id корзины пользователя:
	// 	const basketUser = await Basket.findOne({ where: { userId } })
	// 	//.удаляю
	// 	const idProduct = req.params.id
	// 	await BasketDevice.destroy({ where: { basketId: basketUser.id, deviceId: idProduct } })
	// 	await BasketOrder.destroy({ where: { deviceId: idProduct, basketId: basketUser.id } })

	// 	return res.json({ message: 'удален один товар' })
	// }




	//: + increase in the number:
	// async append(req, res) {
	// 	const userId = req.user.id
	// 	const basketUser = await Basket.findOne({ where: { userId } })

	// 	const id = req.params.id
	// 	const product = await Device.findOne({ where: { id } })

	// 	await BasketDevice.create({ deviceId: product.id, basketId: basketUser.id, inStock: true })

	// 	const countOneProduct = await BasketDevice.findAndCountAll({ where: { basketId: basketUser.id, deviceId: id } })

	// 	//_checkbox
	// 	const oneBaskDevUser = await BasketDevice.findAll({ where: { basketId: basketUser.id, deviceId: id } })
	// 	let count = oneBaskDevUser.length
	// 	let oneElProd = await Device.findOne({ where: { id } })
	// 	let oneTotalPrice = oneElProd.price * count
	// 	await BasketOrder.update({ count: count, price: oneTotalPrice }, { where: { basketId: basketUser.id, deviceId: id } })

	// 	return res.json({ countOneProduct })
	// }


	//: - decrease in number:
	// async reduce(req, res) {
	// 	const userId = req.user.id
	// 	const basketUser = await Basket.findOne({ where: { userId } })

	// 	const deviceId = req.params.id
	// 	const obj = await BasketDevice.findOne({ where: { basketId: basketUser.id, deviceId } })

	// 	await BasketDevice.destroy({ where: { id: obj.id } })

	// 	//_checkbox
	// 	const oneBaskDevUser = await BasketDevice.findAll({ where: { basketId: basketUser.id, deviceId } })
	// 	let count = oneBaskDevUser.length
	// 	let oneElProd = await Device.findOne({ where: { id: deviceId } })
	// 	let oneTotalPrice = oneElProd.price * count
	// 	await BasketOrder.update({ count, price: oneTotalPrice }, { where: { basketId: basketUser.id, deviceId } })

	// 	return res.json({ obj })
	// }
}

export const basketController = new BasketController()