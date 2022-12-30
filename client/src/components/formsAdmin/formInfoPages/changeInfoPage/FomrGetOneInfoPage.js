import React, { useState } from 'react'
import {
	Button,
	Form, Space, Input
} from 'antd'
import { getOneInfoPages } from '../../../../http/infoPagesAPI'
import FormChangeInfoPage from './FormChangeInfoPage'

function FomrGetOneInfoPage() {
	const [page, setPage] = useState({})
	const [form] = Form.useForm()

	const onFinish = values => {
		getOneInfoPages({ link: values.link })
			.then(data => {
				if (data) {
					setPage(data)
				}
				// form.resetFields()
			})
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div>
			<Form
				name="getOnePage"
				form={form}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<div className='flex flex-col'>
					<Form.Item
						name="link"
						label='Введите название ссылки на страницу'
						rules={[{
							required: true,
							message: 'Введите название ссылки!',
						},]}
					>
						<Input placeholder="Например: Доставка" />
					</Form.Item>

					<Form.Item
					>
						<Button type="primary" htmlType="submit">
							Получить
						</Button>
					</Form.Item>
				
				</div>
			</Form>

			{
				Object.keys(page).length ?
					<FormChangeInfoPage page={page} setPage={setPage} />
					:
					undefined
			}
		</div>
	)
}

export default FomrGetOneInfoPage