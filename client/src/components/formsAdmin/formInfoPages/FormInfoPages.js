import { Button, Form, Input, message } from 'antd'
import React, { useState } from 'react'
import { createInfoPage } from '../../../http/adminAPI'
import CKeditor from '../ckeditor/CKeditor'
import {ClearOutlined} from '@ant-design/icons'


const FormInfoPages = () => {
	const [textArticle, setTextArticle] = useState('')
	const [isClearForm, setIsClearForm] = useState(false)
	const [form] = Form.useForm()

	const onFinish = (values) => {
		console.log('Success:', values)
		console.log('textArticle:', textArticle)

		const formData = new FormData()
		formData.append('link', values.link)
		formData.append('title', values.title)
		formData.append('content', textArticle)

		createInfoPage(formData)
			.then(data => {
				message.success(data.message)
				setIsClearForm(true)
			})

	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}
	const fuClearForm = () => {
		form.resetFields()
	}


	return (
		<>
			{isClearForm && <Button type='text' onClick={fuClearForm} className='text-right'><ClearOutlined className='mr-2' />Очистить форму</Button>}
			<Form
				name="info-pages"
				labelCol={{
					span: 24,
				}}
				wrapperCol={{
					span: 24,
				}}
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Введите название ссылки меню"
					name="link"
					rules={[
						{
							required: true,
							message: 'Введите название ссылки меню!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Введите заголовок страницы"
					name="title"
					rules={[
						{
							required: true,
							message: 'Введите заголовок страницы!',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Введите контент страницы"
					name="content"
					rules={[
						{
							required: true,
							message: 'Введите контент страницы!',
						},
					]}
				>
					<CKeditor setTextArticle={setTextArticle} data={textArticle} />
				</Form.Item>


				<Form.Item
					wrapperCol={{
						offset: 16,
						// span: 12,
					}}
				>
					<Button type="primary" htmlType="submit">
						Создать страницу
					</Button>
				</Form.Item>
			</Form>

		</>
	)
}
export default FormInfoPages