import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { URL } from 'url'
import { Op } from "sequelize"

class ProductController {
	async create(req, res, next) {
		try {
			// const data = req.body
			// await models.Brand.bulkCreate(data)
			const {
				info,
				category,
				count,
				description,
				discountPercentage,
				name,
				price,
				type,
				newProd
			} = req.body


			const { img, imgMini } = req.files

			const fileName = []
			if (img) {
				const __dirname = decodeURI(new URL('.', import.meta.url).pathname)
				for (let k of img) {
					let name = uuidv4() + ".webp"
					fileName.push({ image: name })
					k.mv(path.resolve(__dirname, '..', 'static', name))
				}
			}
			const fileNameMini = []
			if (imgMini) {
				const __dirname = decodeURI(new URL('.', import.meta.url).pathname)
				for (let k of imgMini) {
					let name = uuidv4() + ".webp"
					fileNameMini.push({ image: name })
					k.mv(path.resolve(__dirname, '..', 'static', name))
				}
			}
			const product = await models.Product.create({
				price,
				name,
				description,
				discountPercentage,
				count,
				img: JSON.stringify(fileName),
				imgMini: JSON.stringify(fileNameMini),
				typeId: type,
				new: newProd,
				categoryId: category,
			})
			if (info) {
				let infos = JSON.parse(info)
				infos.forEach(el => {
					models.ProductInfo.create({
						title: el.title,
						description: el.description,
						productId: product.dataValues.id,
						titleInfoId: el.titleInfoId
					})
				})
			}
			await models.CategoryType.findOrCreate({ where: { categoryId: category, typeId: type } })
			await models.CategoryProduct.create({ categoryId: category, productId: product.id })
			await models.TypeProduct.create({ typeId: type, productId: product.id })

			return res.status(201).json({ message: `Продукт добавлен` })
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.internal(e.message))
		}
	}

	async getAll(req, res, next) {
		try {
			let { page, limit, categoryId, typeId, priceFrom, priceBefore } = req.query
			page = page || 1
			limit = Number(limit) || 10
			let offset = page * limit - limit



			let data

			if (categoryId && !typeId && !priceFrom && !priceBefore) {
				// console.log('💊💊💊-💊💊💊💊-categoryId && !typeId && !priceFrom && !priceBefore-💊💊💊💊-💊💊💊')
				data = await models.Product.findAndCountAll({
					limit, offset, where: {
						categoryId,
						count: {
							[Op.gt]: 0
						}
					},
					include: [{ model: models.Category }, { model: models.Type }],
				})
			}
			if (categoryId && typeId && !priceFrom && !priceBefore) {
				// console.log('💊💊💊💊💊💊💊-categoryId && typeId && !priceFrom && !priceBefore-💊💊💊💊💊💊💊')
				data = await models.Product.findAndCountAll({
					limit, offset, where: { categoryId, typeId },
					include: [{ model: models.Category }, { model: models.Type }],
				})
			}
			// ---------------------
			if (categoryId && !typeId && priceFrom && !priceBefore) {
				// console.log('💊💊💊💊💊💊💊-categoryId && !typeId && priceFrom && !priceBefore-💊💊💊💊💊💊💊')
				data = await models.Product.findAndCountAll({
					limit, offset,
					where: {
						categoryId,
						price: {
							[Op.gte]: priceFrom,
							// [Op.between]: [priceFrom, priceBefore],
						}
					},
					include: [{ model: models.Category }, { model: models.Type }],
				})
			}
			if (categoryId && typeId && priceFrom && !priceBefore) {
				// console.log('💊💊💊💊💊💊💊-categoryId && typeId && priceFrom && !priceBefore-💊💊💊💊💊💊💊')
				data = await models.Product.findAndCountAll({
					limit, offset,
					where: {
						categoryId, typeId,
						price: {
							[Op.gte]: priceFrom,
						}
					},
					include: [{ model: models.Category }, { model: models.Type }],
				})
			}

			if (categoryId && !typeId && priceFrom && priceBefore) {
				// console.log('💊💊💊💊💊💊💊-categoryId && !typeId && priceFrom && priceBefore-💊💊💊💊💊💊💊')
				data = await models.Product.findAndCountAll({
					limit, offset,
					where: {
						categoryId,
						price: {
							[Op.between]: [priceFrom, priceBefore],
						}
					},
					include: [{ model: models.Category }, { model: models.Type }],
				})
			}

			if (categoryId && typeId && priceFrom && priceBefore) {
				// console.log('💊💊💊💊💊💊💊-categoryId && typeId && priceFrom && priceBefore-💊💊💊💊💊💊💊')
				data = await models.Product.findAndCountAll({
					limit, offset,
					where: {
						categoryId, typeId,
						price: {
							[Op.between]: [priceFrom, priceBefore],
						}
					},
					include: [{ model: models.Category }, { model: models.Type }],
				})
			}
			// ----------
			if (categoryId && !typeId && !priceFrom && priceBefore) {
				data = await models.Product.findAndCountAll({
					limit, offset,
					where: {
						categoryId,
						price: {
							[Op.lte]: priceBefore
						}
					},
					include: [{ model: models.Category }, { model: models.Type }],
				})
			}
			// --------
			if (categoryId && typeId && !priceFrom && priceBefore) {
				data = await models.Product.findAndCountAll({
					limit, offset,
					where: {
						categoryId, typeId,
						price: {
							[Op.lte]: priceBefore
						}
					},
					include: [{ model: models.Category }, { model: models.Type }],
				})
			}
			return res.status(200).json(data)
		}
		catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.internal(e.message))
		}
	}



	async getOne(req, res, next) {
		try {
			const { id } = req.params

			const data = await models.Product.findOne({
				where: { id },
				include: [
					{
						model: models.Category,
					},
					{
						model: models.Type
					},
					{ model: models.ProductInfo, as: 'info' }
				],
			})
			return res.status(200).json(data)
		} catch (e) {
			console.log('🦺-------err: ', e.message)
			next(ApiError.internal(e.message))
		}
	}


	async getAllProductInBasketNoUser(req, res, next) {
		try {

			const dataArr = req.query
			if (Object.keys(dataArr).length !== 0) {
				const arrNumberId = dataArr.arr.map(el => {
					if (el.hasOwnProperty('id')) {
						return +el.id
					}
					return parseInt(el)
				})
				const data = await models.Product.findAll({
					where: { id: arrNumberId },
					include: [
						{
							model: models.ProductInfo, as: 'info'
						},
						{
							model: models.Category,
						},
						{
							model: models.Type
						},
					]
				})
				return res.status(200).json(data)
			} else {
				return res.json({ message: 'Товара нет' })
			}

		} catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.internal(e.message))
		}
	}


	async getPohozhie(req, res, next) {
		try {
			const { id } = req.params
			// console.log('💊---------id:', id)
			const data = await models.Product.findAll({
				where: {
					id: {
						[Op.notIn]: [id]
					}
				},
				include: [
					{
						model: models.Category,
					},
					{
						model: models.Type
					}
				],
			})



			return res.status(200).json(data)
		} catch (e) {
			console.log('🦺-------err: ', e.message)
			console.log('🦺-------e: ', e)
			next(ApiError.internal(e.message))
		}
	}

	async deleteOne(req, res, next) {
		try {
			const { id } = req.params
			await models.Product.destroy({ where: { id: id } })
			return res.json({ message: `Продукт удален` })
		}
		catch (e) {
			next(ApiError.internal(e.message))
		}
	}

}

export const productController = new ProductController()
