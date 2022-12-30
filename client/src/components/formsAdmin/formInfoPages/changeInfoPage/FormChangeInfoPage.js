import { Button, Form, Input, message, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import { changeInfoPage, deleteOneInfoPage } from '../../../../http/adminAPI'
import CKeditor from '../../ckeditor/CKeditor'

const FormChangeInfoPage = ({ page }) => {
	const [textArticle, setTextArticle] = useState('')
	const [form] = Form.useForm()

	useEffect(() => {
		setTextArticle(page.content)
	}, [page])


	const onFinish = (values) => {
		console.log('Success:', values)
		const formData = new FormData()
		formData.append('link', values.link)
		formData.append('title', values.title)
		formData.append('content', textArticle)
		formData.append('id', page.id)
		changeInfoPage(formData)
			.then(data => {
				message.success(data.message)
			})
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}
	const deletePage = () => {
		deleteOneInfoPage(page.id)
			.then(data => {
				message.success(data.message)
				form.resetFields()
			})
	}


	return (
		<Form
			name="info-pages"
			labelCol={{
				span: 24,
			}}
			wrapperCol={{
				span: 24,
			}}
			form={form}
			initialValues={{
				link: page.link,
				title: page.title

			}}
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
					offset: 14,
					// span: 12,
				}}
			>
				<Button type="primary" htmlType="submit">
					Изменить страницу
				</Button>
			</Form.Item>
			<Popconfirm
				title="Вы точно хотите удалить страницу?"
				onConfirm={deletePage}
				okText="Да"
				cancelText="Нет"
			>
				<Button type="text" danger>
					Удалить страницу
				</Button>
			</Popconfirm>
		</Form>
	)
}
export default FormChangeInfoPage