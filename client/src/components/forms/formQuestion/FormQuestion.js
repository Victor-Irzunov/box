import { Button, Rate, Form, Input, Checkbox } from 'antd'
import React, { useState } from 'react'
const { TextArea } = Input


const FormQuestion = () => {
	const [form] = Form.useForm()
	const [isCheck, setIsCheck] = useState(false)
	const onFinish = (values) => {
		console.log('Success:', values)
		form.resetFields()
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
					name="username"
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
					name="tel"
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
						Отправить
					</Button>
				</Form.Item>

				<p className='text-xs font-light mb-4 text-slate-400'>
				Обработка вопросов осуществляется модератором и может занимать до нескольких рабочих дней. Для оперативного ответа обратитесь в call-центр. Мы публикуем только обращения, касающиеся производственных характеристик и/или использования исправного товара.
				</p>
			</Form>

		</>
	)
}
export default FormQuestion