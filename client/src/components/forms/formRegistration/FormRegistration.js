import {
	Form,
	Input,
	Checkbox,
	message,
	Button,
	AutoComplete,
	notification,
} from 'antd'
import React, { useState, useContext } from 'react'
import InputMask from 'react-input-mask'
import { registration } from '../../../http/userAPI'
import { Context } from '../../../App'



const FormRegistration = ({ handleCancel }) => {
	const [form] = Form.useForm()
	const [isCheck, setIsCheck] = useState(false)
	const { user } = useContext(Context)
	const [tel, setTel] = useState('')
	const [autoCompleteResult, setAutoCompleteResult] = useState([])

	const [api, contextHolder] = notification.useNotification()
	const openNotificationWithIcon = (type, title, description) => {
		api[type]({
			message: title,
			description: description,
			duration: 10,
		})
	}

	const onWebsiteChange = (value) => {
		if (!value) {
			setAutoCompleteResult([])
		} else {
			setAutoCompleteResult(['@gmail.com', '@tut.by', '@yandex.by', '@mail.ru'].map((domain) => `${value}${domain}`));
		}
	};
	const websiteOptions = autoCompleteResult.map((website) => ({
		label: website,
		value: website,
	}))

	let count = 0
	const onFinish = values => {
		if (count > 0) {
			registration(values.login, values.password)
				.then(data => {
					message.success('Подвердите регистрацию!')
					handleCancel()
					user.setUserData(data)
					openNotificationWithIcon('success', 'Подвердите пожалуйта регистрацию', `Вам на почту ${data.login} отправлено письмо с ссылкой для активации аккаунта, перейдите по этой ссылки!`)
					setTimeout(() => { form.resetFields() }, [1000])
				})
				.catch(error => {
					if (error.response) message.error(error.response.data.message)
				})
		}
		count++
	}
	const onFinishFailed = errorInfo => message.error('Ошибка')
	const onChange = (e) => setIsCheck(e.target.checked)
	const beforeMaskedValueChange = (newState, oldState, userInput) => {
		var { value } = newState
		var selection = newState.selection
		var cursorPosition = selection ? selection.start : null
		if (value.endsWith('-') && userInput !== '-' && !tel.endsWith('-')) {
			if (cursorPosition === value.length) {
				cursorPosition--
				selection = { start: cursorPosition, end: cursorPosition }
			}
			value = value.slice(0, -1)
		}
		return {
			value,
			selection
		}
	}

	return (
		<>
			<Form
				layout='vertical'
				name="logIn"
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				style={{ overflowX: 'hidden' }}
			>

				<Form.Item
					label="Логин"
					name="login"
					tooltip="Обязательное поле"
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите почту!',
						},
						{
							type: 'email',
							message: 'Введите корректный email!',
						},
					]}
				>
					<AutoComplete
						options={websiteOptions}
						onChange={onWebsiteChange}
						placeholder="exemple@gmail.com"
					/>
				</Form.Item>

				<Form.Item
					label="Пароль"
					name="password"

					tooltip="Обязательное поле"
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите пароль!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					name="password2"
					label="Повторите пароль"
					dependencies={['password']}
					rules={[
						{
							required: true,
							message: 'Пожалуйста повторите пароль!',
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Пароли не совпадают!'));
							},
						}),
					]}
				>
					<Input.Password />
				</Form.Item>

				{/* <Form.Item
					name="tel"
					label="Телефон"
					tooltip="Обязательное поле"
					hasFeedback
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите телефон!',
						},
					]}
				>
					<InputMask
						placeholder="29 333-33-33"
						mask="+3\7\5 99 999 99 99"
						maskChar={'-'}
						className='ant-input'
						beforeMaskedValueChange={beforeMaskedValueChange}
						value={tel}
						onChange={(e) => setTel(e.target.value)}
					/>
				</Form.Item> */}


				<Form.Item
					name="soglasen"
					valuePropName="checked"
					rules={[
						{
							validator: (_, value) =>
								value ? Promise.resolve() : Promise.reject(new Error('Нажмите если согласны!')),
						},
					]}
				>
					<Checkbox
						onChange={onChange}
					>
						Входя в аккаунт или создавая новый, вы соглашаетесь на обработку персональных данных в соответствии с политикой и условиями оферты.
					</Checkbox>
				</Form.Item>

				<Form.Item
				>
					<Button
						type="primary"
						htmlType="submit"
						onClick={onFinish}
						// disabled={!isCheck}
						size='large'
					>
						Регистрация
					</Button>
				</Form.Item>

			</Form>

			{contextHolder}
		</>
	)
}

export default FormRegistration

