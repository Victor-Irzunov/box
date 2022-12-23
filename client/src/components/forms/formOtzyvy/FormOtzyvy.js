import { Button, Rate, Form, Input, Checkbox, message } from 'antd'
import React, { useState } from 'react'
import { otzyvRatingUser } from '../../../http/otzyvyAPI'
const { TextArea } = Input
const desc = ['ужасно', 'плохо', 'нормально', 'хорошо', 'замечательно']


const FormOtzyvy = ({product, setIsOtzyvUserProd, setIsBtnFormOtzyvy}) => {
	const [form] = Form.useForm()
	const [isCheck, setIsCheck] = useState(false)


	const onFinish = (values) => {
		console.log('Success:', values)

		const formData = new FormData()
		formData.append('name', values.name)
		formData.append('contact', values.contact)
		formData.append('description', values.description)
		formData.append('plus', values.plus)
		formData.append('minus', values.minus)
		formData.append('rate', values.rate)
		formData.append('productId', product.id)


		// form.resetFields()

		otzyvRatingUser(formData)
			.then(data => {
				console.log('res data:', data)
				form.resetFields()
				setIsOtzyvUserProd(true)
				setIsBtnFormOtzyvy(false)
				message.success(data.message)
		})
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}
	const onChange = (e) => {
		setIsCheck(e.target.checked)
	}

	return (
		<>
			<Form
				name="basic"
				labelCol={{
					span: 3,
				}}
				wrapperCol={{
					span: 21,
				}}
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Имя Фамилия"
					name="name"
					rules={[
						{
							required: true,
							message: 'Это поле обязательно для заполнения',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Телефон"
					name="contact"
					rules={[
						{
							required: true,
							message: 'Это поле обязательно для заполнения',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					name="description"
					label='Отзыв'
					rules={[
						{
							required: true,
							message: 'Это поле обязательно для заполнения',
						},
					]}
				>
					<TextArea
						showCount
						maxLength={1000}
						placeholder=""
						rows={4}
					/>
				</Form.Item>

				<Form.Item
					name="plus"
					label='Плюсы'
				>
					<TextArea
						showCount
						maxLength={500}
						placeholder=""
						rows={2}
					/>
				</Form.Item>

				<Form.Item
					name="minus"
					label='Минусы'
					rows={2}
				>
					<TextArea
						showCount
						maxLength={500}
						placeholder=""
					/>
				</Form.Item>

				<Form.Item
					name="rate"
					label='Оценка'
					rules={[
						{
							required: true,
							message: 'Это поле обязательно для заполнения',
						},
					]}
				>
					<Rate tooltips={desc} />
				</Form.Item>

				<Form.Item
					name="soglasen"
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>
					<Checkbox onChange={onChange}>Согласен с политикой обработки персональных данных</Checkbox>
				</Form.Item>



				<Form.Item
					wrapperCol={{
						offset: 8,
						span: 16,
					}}
				>

					<Button
						type="primary"
						htmlType="submit"
						disabled={!isCheck}
					>
						Отправить отзыв
					</Button>
				</Form.Item>

				<p className='text-xs font-light mb-4 text-slate-400'>Опубликуется после проверки модератора. Убедительная просьба: если ваш отзыв содержит претензию к качеству товара или сервиса, пожалуйста, укажите телефон, оставленный вами при заказе, чтобы мы могли уточнить обстоятельства и дать конкретный ответ по вашему вопросу. Мы гарантируем конфиденциальность ваших личных данных. Благодарим за понимание.</p>
			</Form>

		</>
	)
}
export default FormOtzyvy