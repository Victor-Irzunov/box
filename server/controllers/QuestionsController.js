import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'

class QuestionsController {
	async create(req, res, next) {
		try {
			const { name, contact, question, productId } = req.body
			// console.log('💊data: ' , data)
			await models.QuestionResponse.create({ name, contact, question, productId })
			return res.status(201).json({ message: `Ваш вопрос принят.` })
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}

	}

	async getOneProd(req, res, next) {

		try {
			const productId = req.params.id
			const info = await models.QuestionResponse.findAll({ where: { productId, publication: true } })
			// console.log('💊---------info:', info)
			return res.json(info)
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}

	async getAllNew(req, res, next) {
		try {
			const data = await models.QuestionResponse.findAll(
				{
					where: {
						prochitano: false
					},
					include: [
						{
							model: models.Product
						}
					]
				}
			)
			return res.json(data)
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}

	async response(req, res, next) {
		try {
			const { response, publication, id } = req.body
			console.log('💊response: ', response)
			console.log('💊publication: ', publication)
			console.log('💊id: ', id)

			const data = await models.QuestionResponse.findOne({ where: { id: id } })
			data.response = response
			data.publication = publication
			data.prochitano = true
			await data.save()

			return res.json({ message: `Принят.` })
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}

}

export const questionsController = new QuestionsController()
