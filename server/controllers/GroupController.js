import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'
class GroupController {

	async deleteOne(req, res, next) {
		try {
			const groupId = req.params.id

			const prod = await models.Product.findAll({ where: { groupId } })
			const arrId = []
			// console.log('💊💊💊 prod: ', prod)
			prod.forEach(async (el) => {
				arrId.push(el.id)
				await models.ProductInfo.destroy({ where: { productId: el.id } })
				await models.BasketProduct.destroy({ where: { productId: el.id } })
				await models.Product.destroy({ where: { id:el.id } })
			})
			await models.Group.destroy({ where: { id: groupId } })

			return res.status(201).json(arrId)
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
}

export const groupController = new GroupController()
