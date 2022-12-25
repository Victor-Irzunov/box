import { Button, Form, Space, InputNumber, Radio, Popconfirm, message } from 'antd'
import React, { useState } from 'react'
import { changeStatusOrder, changeStatusOrderCourier, getOneOrder, getOneOrderCourier } from '../../http/adminAPI'


const ChangeStatusOrder = ({ courier }) => {
	const [data, setData] = useState({})
	const [status, setStatus] = useState(null)
	const [form] = Form.useForm()

	const onFinish = values => {
		if (courier) {
			getOneOrderCourier(values.id)
				.then(data => {
					setData(data)
				})
		} else {
			getOneOrder(values.id)
				.then(data => {
					setData(data)
				})
		}

	}
	const onFinish2 = (values) => {
		if (courier) {
			changeStatusOrderCourier({ id: data.id, status: values.status })
				.then(data => {
					message.success(data.message)
				})
		} else {
			changeStatusOrder({ id: data.id, status: values.status })
				.then(data => {
					message.success(data.message)
				})
		}
	}

	const confirm = (e) => {
		form.submit()
	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<>
			<Form
				name="order_admin"
				// labelCol={{
				// 	span: 4,
				// }}
				// wrapperCol={{
				// 	span: 16,
				// }}

				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Space>
					<Form.Item
						label="Введите номер заказа"
						name="id"
						rules={[
							{
								required: true,
								message: 'Введите номер заказа!',
							},
						]}
					>
						<InputNumber />
					</Form.Item>


					<Form.Item
					// wrapperCol={{
					// 	offset: 8,
					// 	span: 16,
					// }}
					>
						<Button type={Object.keys(data).length ? '' : "primary"} htmlType="submit">
							Получить
						</Button>
					</Form.Item>
				</Space>
			</Form>
			{
				Object.keys(data).length ?
					<Form
						name="change_order_admin"
						// labelCol={{
						// 	span: 4,
						// }}
						// wrapperCol={{
						// 	span: 16,
						// }}
						initialValues={{
							status: data.status === true ? 1 : 0
						}}
						form={form}
						onFinish={onFinish2}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
					>
						<Form.Item
							name="status"
							rules={[{
								required: true,
								message: 'Выберите!',
							},]}
						>
							<Radio.Group size='large'>
								<Popconfirm
									title="Изменить на статус доставлено?"
									onConfirm={confirm}
									okText="Да"
									cancelText="Нет"
								>
									<Radio.Button className='mr-3 mb-1' value={0}>Доставлено</Radio.Button>
								</Popconfirm>
								<Popconfirm
									title="Изменить на статус не доставлено?"
									onConfirm={confirm}
									okText="Да"
									cancelText="Нет"
								>
									<Radio.Button className='mb-1' value={1}>Не доставлено</Radio.Button>
								</Popconfirm>
							</Radio.Group>
						</Form.Item>

						{/* <Form.Item
						>
							<Button type="primary" htmlType="submit">
								Изменить
							</Button>
						</Form.Item> */}
					</Form>
					:
					undefined
			}
		</>
	)
}
export default ChangeStatusOrder