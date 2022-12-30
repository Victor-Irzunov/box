import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'

class InfoPagesController {

	async create(req, res, next) {
		try {
			const { link, title, content } = req.body

			const infoPage = await models.InfoPages.create({ link, title, content })
			console.log('💊💊💊infoPage: ', infoPage)
			if (infoPage) {
				return res.status(201).json({ message: `Страница создана` })
			} else {
				return res.status(501).json({ message: `Что-то пошло не так` })
			}
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}

	async getAll(req, res, next) {
		try {
			const infoPage = await models.InfoPages.findAll()
			// console.log('💊💊💊infoPage: ', infoPage)
			if (infoPage) {
				return res.status(201).json(infoPage)
			} else {
				return res.status(501).json({ message: `В запросе или БД ошибка` })
			}
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
	async getOne(req, res, next) {
		try {
			const { link } = req.query
			const infoPage = await models.InfoPages.findOne({ where: { link: link } })
			// console.log('💊💊💊infoPage: ', infoPage)
			if (infoPage) {
				return res.status(201).json(infoPage)
			} else {
				return res.status(501).json({ message: `В запросе или БД ошибка` })
			}
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
	async change(req, res, next) {
		try {
			const { id, link, title, content } = req.body

			const infoPage = await models.InfoPages.update({ link, title, content }, { where: { id } })
			console.log('💊💊💊infoPage: ', infoPage)

			if (infoPage) {

				return res.status(201).json({ message: `Страница успешно отредактирована` })
			} else {
				return res.status(501).json({ message: `Что-то пошло не так` })
			}
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
	async deleteOne(req, res, next) {
		try {
			const { id } = req.params
			const infoPage = await models.InfoPages.destroy({ where: { id } })
			console.log('💊💊💊infoPage: ', infoPage)
			if (infoPage) {
				return res.status(201).json({ message: `Страница удалена` })
			} else {
				return res.status(501).json({ message: `Что-то пошло не так` })
			}
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
}

export const infoPagesController = new InfoPagesController()
