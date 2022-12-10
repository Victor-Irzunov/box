import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'

class InfoTitleController {

	async create(req, res) {
		try {
			// const data = req.body
			// await models.Brand.bulkCreate(data)
			const { name } = req.body
			await models.InfoTitle.create({ name })

			return res.status(201).json({ message: `Заголовок характеристик добавлен` })
		}
		catch (e) {
			next(ApiError.badRequest(e.message))
		}

	}

	async getAll(req, res) {
		try {
			const infoTitle = await models.InfoTitle.findAll()
			return res.json(infoTitle)
		}
		catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async deleteOne(req, res) {
		try {
			const { id } = req.params
			await models.InfoTitle.destroy({ where: { id: id } })
			return res.json({ message: `Категория удалена` })
		}
		catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}
}

export const infoTitleController = new InfoTitleController()
