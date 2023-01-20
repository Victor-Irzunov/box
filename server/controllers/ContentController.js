import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'

class ContentController {

	async getContentPage(req, res, next) {
		try {
			// const data = req.body
			// await models.Brand.bulkCreate(data)
			const { categoryId, typeId, productId } = req.query
			console.log('💊💊💊rreq.query💊💊💊: ', req.query)
			// await models.ContentPage.create({ name, link })

			// return res.status(201).json({ message: `Категория добавлена` })
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}

	async editContentPage(req, res, next) {
		try {

			const { categoryId, typeId, productId } = req.body
			// await models.ContentPage.create({ name, link })

			return res.status(201).json({ message: `Категория добавлена` })
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}


}

export const contentController = new ContentController()
