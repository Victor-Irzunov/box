import { Button, Form, message, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import React from 'react'

import Resizer from "react-image-file-resizer"
import { createSliderImg } from '../../../http/adminAPI'

const resizeFile = (file, size, size2) =>
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			file,
			size,
			size2,
			"WEBP",
			75,
			0,
			(uri) => {
				resolve(uri)
			},
			"file",
		)
	})


const FormSliderImg = () => {
	const [form] = Form.useForm()

	const onFinish = async (values) => {
		// console.log('Success:', values)
		const formData = new FormData()
		for (let k in values.img.fileList) {
			const pic = await resizeFile(values.img.fileList[k].originFileObj, 2000, 1333)
			formData.append('img', pic)
		}
		//!!console ничего не покажет 
		//!!смотри на сервере req.files
		createSliderImg(formData)
		.then(data => {
			if (data) {
				message.success(data.message)
			}
		})
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<Form
			name="slider-img"
			form={form}
			labelCol={{
				span: 24,
			}}
			wrapperCol={{
				span: 24,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item
				label="Загрузите картинку для слайдера"
				name="img"
				rules={[
					{
						required: true,
						message: 'Загрузите картинку!',
					},
				]}
			>
				<Upload
					listType="picture"
					className="upload-list-inline"
				>
					<Button icon={<UploadOutlined />}>Загрузить</Button>
				</Upload>
			</Form.Item>

			<Form.Item
				// wrapperCol={{
				// 	offset: 8,
				// 	span: 16,
				// }}
			>
				<Button type="primary" htmlType="submit" className='mt-2 float-right'>
					Сохранить
				</Button>
			</Form.Item>
		</Form>
	)
}
export default FormSliderImg