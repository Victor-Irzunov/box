import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'

class BasketController {

	async add(req, res, next) {
		try {
			const userId = req.user.id
			const id = req.params.id

			const basketUser = await models.Basket.findOne({ where: { userId } })

			const product = await models.Product.findOne({ where: { id } })
			const productInBasket = await models.BasketProduct.create({ productId: product.id, basketId: basketUser.id, inStock: true })

			return res.json(productInBasket)

		} catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.internal(e.message))
		}

	}




	//:basket page
	// async getAll(req, res, next) {
	// 	const userId = req.user.id
	// 	const basketUser = await models.Basket.findOne({ where: { userId } })

	// 	const allBaskDevUser = await models.BasketDevice.findAll({ where: { basketId: basketUser.id } })

	// 	//_all device basket user:
	// 	const allProdInBaskUser = []
	// 	for (let i of allBaskDevUser) {
	// 		let oneElProd = await models.Device.findOne({ where: { id: i.deviceId } })
	// 		if (oneElProd.count === 0) {
	// 			await models.BasketDevice.update({ inStock: false }, { where: { deviceId: i.deviceId } })
	// 		}
	// 		allProdInBaskUser.push(oneElProd)
	// 	}

	// 	//_the total amount of the entire product in the basket
	// 	let totalPrice = allProdInBaskUser.reduce((acc, n) => (acc.price += n.price, acc), { price: 0 })

	// 	//_quantity:
	// 	let length = allProdInBaskUser.length
	// 	let counter = allProdInBaskUser.reduce(function (o, i) {
	// 		if (!o.hasOwnProperty(i.id)) o[i.id] = 0
	// 		o[i.id]++
	// 		return o
	// 	}, {})
	// 	let result = Object.keys(counter).map(id => ({ id: id, sum: counter[id] }))

	// 	let newArr = []
	// 	let lookObj = {}
	// 	for (let i in allProdInBaskUser) {
	// 		lookObj[allProdInBaskUser[i]['id']] = allProdInBaskUser[i]
	// 	}
	// 	for (let i in lookObj) newArr.push(lookObj[i])

	// 	//_checkbox:
	// 	const basketCheckedAll = await models.BasketOrder.findAll()
	// 	let allCheckedTotalPrice = basketCheckedAll.reduce((acc, n) => (acc.price += n.price, acc), { price: 0 })
	// 	const checkedBoll = []
	// 	newArr.forEach(o => {
	// 		basketCheckedAll.forEach(obj => {
	// 			if (obj.deviceId === o.id) checkedBoll.push({ id: obj.deviceId, checked: true })
	// 		})
	// 		if (!checkedBoll.some(e => e.id === o.id)) checkedBoll.push({ id: o.id, checked: false })
	// 	})

	// 	//. sending to frontEnd:
	// 	return res.json({
	// 		newArr,
	// 		length,
	// 		counter,
	// 		result,
	// 		allBaskDevUser,
	// 		totalPrice,
	// 		userId,
	// 		basketCheckedAll,
	// 		allCheckedTotalPrice,
	// 		checkedBoll,
	// 		basketId: basketUser.id
	// 	})
	// }
	//:basket length
	// async getLength(req, res, next) {

	// 	const userId = req.user.id
	// 	const basketUser = await Basket.findOne({ where: { userId } })

	// 	const allBaskDevUser = await BasketDevice.findAll({ where: { basketId: basketUser.id } })

	// 	//_all device basket user:
	// 	const allProdInBaskUser = []
	// 	for (let i of allBaskDevUser) {
	// 		let oneElProd = await Device.findOne({ where: { id: i.deviceId } })
	// 		if (oneElProd.count === 0) {
	// 			await BasketDevice.update({ inStock: false }, { where: { deviceId: i.deviceId } })
	// 		}
	// 		allProdInBaskUser.push(oneElProd)
	// 	}
	// 	let length = allProdInBaskUser.length

	// 	return res.json({
	// 		length
	// 	})
	// }


	//: deleting everything from the trash:
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