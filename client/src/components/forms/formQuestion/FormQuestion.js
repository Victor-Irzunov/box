import { Button, Form, Input, Checkbox, message } from 'antd'
import React, { useState } from 'react'
import { createQuestionUser } from '../../../http/questionAPI'
const { TextArea } = Input


const FormQuestion = ({ product }) => {
	const [form] = Form.useForm()
	const [isCheck, setIsCheck] = useState(false)
	const onFinish = (values) => {
		console.log('Success:', values)

		const formData = new FormData()
		formData.append('name', values.name)
		formData.append('contact', values.contact)
		formData.append('question', values.question)
		formData.append('productId', product.id)

		createQuestionUser(formData)
			.then(data => {
				if (data) {
					message.success(data.message)
					form.resetFields()
				}

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
					label="Имя"
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
					tooltip='Опубликован не будет'
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
					name="question"
					label='Вопрос'
					rules={[
						{
							required: true,
							message: 'Это поле обязательно для заполнения',
						},
					]}
				>
					<TextArea
						showCount
						maxLength={500}
						placeholder=""
						rows={2}
					/>
				</Form.Item>



				<Form.Item
					name="soglasen"
					wrapperCol={{
						offset: 2,
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
						Отправить
					</Button>
				</Form.Item>

				<p className='text-xs font-light mb-4 text-slate-400'>
					Обработка вопросов осуществляется модератором и может занимать до нескольких рабочих дней. Мы публикуем только обращения, касающиеся производственных характеристик и/или использования исправного товара.
				</p>
			</Form>

		</>
	)
}
export default FormQuestion