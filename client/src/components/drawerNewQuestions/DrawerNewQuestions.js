import React, { useState } from 'react'
import { Drawer, Button, Collapse, Image, Divider, Form, Input, Checkbox, message } from 'antd'
import { postResponseAdmin } from '../../http/questionAPI'

import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')


const { TextArea } = Input
const { Panel } = Collapse


export const DrawerNewQuestions = ({ open, setOpen, question, setIsReq }) => {
	const [form] = Form.useForm()
	const [id, setId] = useState(null)

	const onFinish = (values) => {
		console.log('Success:', values)

		const formData = new FormData()
		formData.append('response', values.response)
		formData.append('publication', values.publication)
		formData.append('id', id)

		postResponseAdmin(formData)
			.then(data => {
				setIsReq(i => !i)
				form.resetFields()
			})
		

	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	const onClose = () => {
		setOpen(false)
	}
	return (
		<div>
			<Drawer
				title={`Необходимо ответить на "Вопрос-ответ".
				 Количество вопросов: ${question.length}`}
				placement="right"
				size='378px'
				onClose={onClose}
				open={open}
				footer={
					<div className='flex justify-end'>
						<Button onClick={onClose}
							className='mr-3'
						>
							Закрыть
						</Button>
					</div>
				}
			>
				<Collapse ghost >
					{question.map(el => {
						const img = JSON.parse(el.product.imgMini)
						return (
							<Panel key={el.id} header={el.question}>
								<div className=''>
									<p className='font-extralight'>
										Написал: {el.name}
									</p>
									<p className='font-extralight'>
										Был задан: {moment(el.createdAt).fromNow()}
									</p>
									<p className='font-extralight'>
										Телефон: {el.contact}
									</p>
									<div className='flex justify-between mt-4'>
										<div className='w-1/3'>
											<Image src={process.env.REACT_APP_API_URL + img[0].image} />
										</div>
										<div className=''>
											<p className=''>{el.product.name}</p>
											<p className='text-xs font-extralight'>Артикул: {el.id}GR{el.groupId}</p>
											<p className='text-xs font-extralight'>Количество на складе: {el.product.count}</p>
										</div>
									</div>
									<Divider />
									<div className=''>
										<Form
											name="response"
											labelCol={{
												span: 24,
											}}
											wrapperCol={{
												span: 24,
											}}
											initialValues={{
												publication: true,
											}}
											form={form}
											onFinish={onFinish}
											onFinishFailed={onFinishFailed}
											autoComplete="off"
										>
											<Form.Item
												name="response"
												label='Ваш ответ'
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
												name="publication"
												wrapperCol={{
													offset: 2,
													span: 16,
												}}
												valuePropName="checked"
											>
												<Checkbox>Опубликовать</Checkbox>
											</Form.Item>
				
											<Form.Item
												wrapperCol={{
													offset: 14,
													span: 24,
												}}
											>
												<Button
													type="primary"
													htmlType="submit"
													onClick={() => setId(el.id)}
												>
													Отправить
												</Button>
											</Form.Item>
										</Form>
									</div>
								</div>
							</Panel>
						)
					})}
				</Collapse>
			</Drawer>
		</div>
	)
}
