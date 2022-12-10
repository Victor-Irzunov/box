import { models } from "../models/models.js"
import { ApiError } from '../error/ApiError.js'


class TypeController {

    async create(req, res) {
        try {
            const { name, link } = req.body
            await models.Type.create({ name, link  })
            return res.status(201).json({ message: `Тип добавлен` })
        }
        catch (e) {
            console.log('ошибка : ', e)
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const types = await models.Type.findAll()
        return res.json(types)
    }

    async deleteOne(req, res) {
        try {
            const { id } = req.params
            await models.Type.destroy({ where: { id: id } })
            return res.json({ message: `Тип удален` })
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

export const typeController = new TypeController()
