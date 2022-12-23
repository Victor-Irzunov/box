import { ApiError } from "../error/ApiError.js"
import bcrypt from "bcrypt"
import { models } from "../models/models.js"
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { validationResult } from "express-validator"
import { mailService } from '../mail/MailService.js'



const generateJwt = (id, login, role, isActivation) => {
	return jwt.sign(
		{ id, login, role, isActivation },
		process.env.SECRET_KEY,
		{ expiresIn: '30 days' }
	)
}

class UserController {
	async registration(req, res, next) {

		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.badRequest("Ошибка валидации", errors.array()))
			}

			const { login, password, role } = req.body
			if (!login || !password) return next(ApiError.badRequest('Некорректный email или password'))

			const candidate = await models.User.findOne({ where: { login } })

			if (candidate && candidate.dataValues.password) {
				return next(ApiError.badRequest('Пользователь с таким email уже существует'))
			}
			if (role === 'ADMIN') {
				const admin = await models.User.findOne({ where: { role: 'ADMIN' } })
				if (admin) return next(ApiError.badRequest('Администратор уже существует'))
			}

			const hashPassword = await bcrypt.hash(password, 5)
			const activationLink = uuidv4()

			let user

			if (candidate && !candidate.dataValues.password) {
				candidate.password = hashPassword;
				candidate.activationLink = activationLink;
				await candidate.ave();
				user = await models.User.findOne({ where: { login } })
			}
			if (!candidate) {
				user = await models.User.create({ login, role, password: hashPassword, activationLink, isActivation: false })
			}
			const token = generateJwt(user.id, user.login, user.role, user.isActivation)

			await mailService.sendActivationMail(login, `${process.env.API_URL}/api/user/activate/${activationLink}`)
			await models.Basket.create({ userId: user.id })

			return res.json({ token })

		} catch (err) {
			console.log('🚀-error: ', err)
		}

	}

	async login(req, res, next) {
		try {
			const { login, password } = req.body
			const user = await models.User.findOne({ where: { login } })
			if (!user) {
				return next(ApiError.internal('Пользователь не найден'))
			}

			let comparePassword = bcrypt.compareSync(password, user.password)
			if (!comparePassword) {
				return next(ApiError.internal('Указан неверный пароль'))
			}

			const token = generateJwt(user.id, user.login, user.role, user.isActivation)
			return res.json({ token })
		} catch (err) {
			console.log('🚀🚀-error: ', err)
		}
	}

	async check(req, res, next) {
		try {
			const user = await models.User.findOne({ where: { id: req.user.id } })
			const token = generateJwt(req.user.id, req.user.login, req.user.role, user.isActivation)
			return res.json({ token })
		} catch (err) {
			console.log('🚀🚀🚀-error: ', err)
		}
	}

	async activate(req, res, next) {
		try {
			const activationLink = req.params.link
			const user = await models.User.findOne({ where: { activationLink } })
			if (!user) {
				throw new Error('Неккоректная ссылка активации')
			}
			user.isActivation = true
			await user.save()

			return res.redirect(process.env.CLIENT_URL) //edit CLIENT_URL (react 3000)

		} catch (e) {
			console.log('🚀🚀🚀🚀-error: ', e)
		}
	}
}

export const userController = new UserController()
