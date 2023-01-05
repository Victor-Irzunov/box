import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { URL } from 'url'

class ImgController {

	async create(req, res, next) {
		try {

			const { img } = req.files
			// console.log('💊💊💊req.files: ', req.files)

			const fileName = []
			if (img) {
				const __dirname = decodeURI(new URL('.', import.meta.url).pathname)
				if (Array.isArray(img)) {
					for (let k of img) {
						let name = uuidv4() + ".webp"
						fileName.push({ img: name })
						k.mv(path.resolve(__dirname, '..', 'static', name))
					}
				} else {
					let name = uuidv4() + ".webp"
					fileName.push({ img: name })
					img.mv(path.resolve(__dirname, '..', 'static', name))
				}
			}
			await models.SliderImg.bulkCreate(fileName)
			return res.status(201).json({ message: `Картинки добавлены` })
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
	async get(req, res, next) {
		try {


			const data = await models.SliderImg.findAll()
			return res.status(201).json(data)
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}
	async deleteImg(req, res, next) {
		try {
			const { dataId } = req.body
			await models.SliderImg.destroy({ where: { id: JSON.parse(dataId) } })
			return res.status(201).json({message: `Банер удален с базы данных`})
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.badRequest(e.message))
		}
	}



}

export const imgController = new ImgController()
