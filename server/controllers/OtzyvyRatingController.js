import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'
import { sequelize } from "../utils/db.js"


class OtzyvyRatingController {

	async create(req, res) {
		try {
			const { name, contact, description, plus, minus, rate, productId } = req.body
			const userId = req.user.id
			// console.log('💊---------req.body:', req.body)
			const isOtzyv = await models.Feedback.findOne({ where: { userId, productId } })
			if (!isOtzyv) {
				const rating = await models.Rating.create({ rate, userId, productId })
				await models.Feedback.create({
					name, contact, description,
					plus, minus, userId, productId, ratingId: rating.id
				})
				const totalRating = await models.Rating.findAndCountAll({
					attributes: [
						'productId',
						[sequelize.fn('sum', sequelize.col('rate')), 'totalRating'],
					],
					group: ['productId'],
					raw: true,
					where: {
						'productId': productId
					}
				})
				const product = await models.Product.findOne({ where: { id: productId } })
				product.rating = totalRating.rows[0].totalRating / totalRating.count[0].count
				await product.save()

				return res.status(201).json({ message: `Отзыв и рейтинг продукта принят, будет опубликован после проверки модератора` })
			} else {
				return res.status(201).json({ message: `Вы уже делали оценку данного товара.` })
			}
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.internal(e.message))
		}
	}

	async getAll(req, res, next) {
		try {

			const feedback = await models.Feedback.findAll({ where: {} })

			return res.status(201).json(feedback)
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.internal(e.message))
		}
	}
	async getUser(req, res, next) {
		try {
			const userId = req.user.id
			const productId = req.params.id
			const feedback = await models.Feedback.findOne({ where: { userId, productId } })
			console.log('💊feedback: ', feedback)
			return res.status(201).json(feedback)
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.internal(e.message))
		}
	}

}

export const otzyvyRatingController = new OtzyvyRatingController()
