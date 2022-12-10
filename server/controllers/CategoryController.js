import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'

class CategoryController {
    
    async create(req, res) {
        try {
            // const data = req.body
            // await models.Brand.bulkCreate(data)
            const { name, link } = req.body
            console.log('req.body: ', req.body)
            await models.Category.create({ name, link })

            return res.status(201).json({ message: `Категория добавлена` })
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        try {
            const сategory = await models.Category.findAll()
            return res.json(сategory)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteOne(req, res) {
        try {
            const { id } = req.params
            await models.Category.destroy({ where: { id: id } })
            return res.json({ message: `Категория удалена` })
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

export const categoryController = new CategoryController()
