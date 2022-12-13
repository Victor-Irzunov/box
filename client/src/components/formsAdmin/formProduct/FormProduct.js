import React, { useEffect, useState } from 'react'
import {
	Button, InputNumber,
	Form, Input, Radio,
	message, Select,
	Tooltip,
	Collapse,
	Checkbox,
	Empty,
	Divider,
} from 'antd'
import DragableComp from '../../upload/DragableComp'
import {
	fetchCategory,
	fetchType,
	fetchInfo,
} from '../../../http/productsAPI'
import { InfoCircleOutlined, CopyOutlined } from '@ant-design/icons'
import { createProduct } from '../../../http/adminAPI'
// import { CirclePicker } from 'react-color'

import Resizer from "react-image-file-resizer"
// const { Panel } = Collapse

const resizeFile = (file, size, size2) =>
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			file,
			size,
			size2,
			"WEBP",
			100,
			0,
			(uri) => {
				resolve(uri)
			},
			"file",
		)
	})


const { TextArea } = Input
const { Option } = Select

// const tagRender = props => {
// 	const { label, value, closable, onClose } = props
// 	const onPreventMouseDown = event => {
// 		event.preventDefault()
// 		event.stopPropagation()
// 	}
// 	return (
// 		<Tag
// 			color={value}
// 			onMouseDown={onPreventMouseDown}
// 			closable={closable}
// 			onClose={onClose}
// 			style={{
// 				marginRight: 3,
// 			}}
// 		>
// 			<span className={value === '#ffffff' ? 'text-black' : ''}>{label}</span>
// 		</Tag>
// 	)
// }



const FormProduct = () => {
	const [form] = Form.useForm()
	const [dataInfo, setDataInfo] = useState([])
	const [dataCategory, setDataCategory] = useState([])
	const [dataType, setDataType] = useState([])
	const [fileList, setFileList] = useState([])

	const [title, setTitle] = useState('')

	useEffect(() => {
		fetchInfo()
			.then(data => {
				console.log('data info: ', data)
				setDataInfo(data)
			})
			.catch(err => {
				message.error(err.message)
			})
		fetchCategory()
			.then(data => {
				setDataCategory(data)
			})
			.catch(err => {
				message.error(err.message)
			})
		fetchType()
			.then(data => {
				setDataType(data)
			})
			.catch(err => {
				message.error(err.message)
			})


	}, [])


	// const onchange = async (file) => {
	// 	try {
	// 		const image = await resizeFile(file);
	// 		console.log("image: ", image);
	// 		return image
	// 	} catch (err) {
	// 		console.log("err: ", err);
	// 	}
	// };

	// const requestTitle = e => {
	// 	const title = e.target.value.replace(/\s+/g, ' ').trim()
	// 	console.log('-----e.target.value: ', e.target.value)
	// 	console.log('-----title: ', title)
	// }


	// const change = () => {
	// 	let b = '',
	// 		c = ''
	// 	return (elem, i) => {
	// 		if (i === 1) b = elem
	// 		else c = elem
	// 		let a = `${b} ${c}`
	// 		return form.setFieldsValue({ name: a })
	// 	}
	// }
	// const fu = change()

	const onFinish = async values => {
		console.log('Success:', values)


		const arrInfo = []
		const keys = Object.keys(values.info)
		keys.forEach(el => {
			arrInfo.push({ title: el, description: values.info[el].content, titleInfoId: values.info[el].id })
		})

		const formData = new FormData()
		formData.append('info', JSON.stringify(arrInfo))
		formData.append('category', values.category)
		formData.append('count', values.count)
		formData.append('description', values.description)
		formData.append('discountPercentage', values.discountPercentage || 0)
		formData.append('name', values.name)
		formData.append('price', values.price)
		formData.append('type', values.type)
		formData.append('newProd', values.newProd)

		for (let k in fileList) {
			const pic = await resizeFile(fileList[k].originFileObj, 1000, 600)
			formData.append('img', pic)
		}
		for (let k in fileList) {
			formData.append('imgMini', await resizeFile(fileList[k].originFileObj, 250, 250))
		}

		createProduct(formData)
			.then(data => {
				console.log('data: ', data)
				message.success(data.message)
			})
			.catch(data => {
				message.error(data.response.data.message)
			})
	}

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	}

	const copyFunction = () => {
		navigator.clipboard.writeText(title)
			.then(() => {
				if (title) message.success(`Вы скопировали: ${title}`)
				else message.warning('Введите полное название для копирования!')
			})
			.catch(err => console.log('err: ', err))

	}


	return (
		<>
			<Form
				name="product"
				form={form}
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 20,
				}}
				initialValues={{
					newProd: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="Категория"
					name="category"
					hasFeedback
					rules={[{
						required: true,
						message: 'Выберите категорию!',
					},]}
				>
					{
						dataCategory.length > 0 ?
							<Radio.Group buttonStyle="solid">
								{dataCategory.map(el => {
									return (<Radio.Button key={el.id} className='mr-1' value={el.id}>{el.name}</Radio.Button>)
								})}
							</Radio.Group>
							:
							<Empty />
					}

				</Form.Item>

				<Form.Item
					label="Тип"
					name="type"
					hasFeedback
					rules={[{
						required: true,
						message: 'Выберите тип!',
					},]}
				>
					{
						dataType.length > 0 ?
							<Radio.Group buttonStyle="solid">
								{dataType.map(el => {
									return (<Radio.Button
										key={el.id}
										value={el.id}
										className='mr-1'
									// onClick={() => fu(el.name, 1)}
									>
										{el.name}
									</Radio.Button>)
								})}
							</Radio.Group>
							:
							<Empty />
					}

				</Form.Item>

				<Form.Item
					label="Название"
					name="name"

					rules={[{
						required: true,
						message: 'Введите название!',
					},]}
				>
					<Input
						allowClear
						onBlur={e => {
							// requestTitle(e)
							setTitle(e.target.value)
						}}
						addonAfter={<Tooltip title="скопировать название">
							<span
								onClick={copyFunction}
							>
								<CopyOutlined />
							</span>
						</Tooltip>}
						suffix={
							<Tooltip title="Название">
								<InfoCircleOutlined
									style={{
										color: 'rgba(0,0,0,.45)',
									}}
								/>
							</Tooltip>
						}
					/>
				</Form.Item>

				<Form.Item
					label="Описание товара"
					name="description"
					rules={[{
						required: true,
						message: 'Введите описание!'
					},]}
				>
					<TextArea
						autoSize allowClear showCount
					/>
				</Form.Item>


				<Form.Item
					label="Цена"
					name="price"
					rules={[
						{
							required: true,
							message: 'Введите цену!',
						},
					]}
				>
					<InputNumber addonAfter="руб." />
				</Form.Item>

				<Form.Item
					label="Процент скидки"
					name="discountPercentage"
				// rules={[
				// 	{
				// 		required: true,
				// 		message: 'Введите скидку!',
				// 	},
				// ]}
				>
					<InputNumber
						addonAfter="%"
					/>
				</Form.Item>

				<Form.Item
					label="Количество"
					name="count"
					rules={[
						{
							required: true,
							message: 'Введите количество!',
						},
					]}
				>
					<InputNumber addonAfter="шт." />
				</Form.Item>

				{/* ---------------------------------------------------- */}

				<Divider />

				<Form.Item
					label="Картинки"
					name="img"
					valuePropName='img'
					// extra=''
					rules={[{
						required: true,
						message: 'Добавьте картинки!',
					},]}
				>
					<DragableComp setFileList={setFileList} fileList={fileList} />
				</Form.Item>



				{/* ------------------------------------------- */}

				<Form.Item
					label="Описание"
					name='info'
					tooltip="Необходимо"
				>
					{
						dataInfo.length > 0 ?

							dataInfo.map(el => {
								return (
									<div className='mb-3 mt-1.5' key={el.id}>
										<Form.Item
											name={['info', `${el.name}`, 'id']}
											hidden={true}
											initialValue={el.infoTitle.id}
										>
											<Input value={el.infoTitle.id} />
										</Form.Item>
										<p className=''>{el.name}</p>
										<Form.Item
											name={['info', `${el.name}`, 'content']}
											noStyle
											rules={[
												{
													required: true,
													message: 'Выберите характеристику',
												},
											]}
										>
											<Radio.Group buttonStyle="solid">
												{el.content.map((item, idx) => {
													return (<Radio.Button key={idx} value={item}>{item}</Radio.Button>)
												})}
											</Radio.Group>
										</Form.Item>
									</div>
								)
							})

							:
							<Empty />
					}
				</Form.Item>

				<Form.Item
					name="newProd"
					valuePropName="checked"
					wrapperCol={{
						offset: 4,
						span: 8,
					}}
				>
					<Checkbox>Новый товар</Checkbox>
				</Form.Item>


				<Form.Item
					wrapperCol={{
						offset: 16,
						span: 8,
					}}
				>
					<Button type="primary" htmlType="submit">
						Сохранить
					</Button>
				</Form.Item>
			</Form>
		</>
	)
}
export default FormProduct