import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'

class InfoController {
	async create(req, res) {
		try {
			const data = req.body
			await models.Info.bulkCreate(data)


			return res.status(201).json({ message: `Характеристики добавлены` })
		}
		catch (e) {
			next(ApiError.badRequest(e.message))
		}

	}

	async getAll(req, res) {
		try {
			const info = await models.Info.findAll(
				{
					include: [
						{
							model: models.InfoTitle
						}
					]
				}
			)

			// console.log('💊---------info:', info)


			return res.json(info)
		}
		catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async deleteOne(req, res) {
		try {
			const { id } = req.params
			await models.Info.destroy({ where: { id: id } })
			return res.json({ message: `Описание удалено` })
		}
		catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}

}

export const infoController = new InfoController()
