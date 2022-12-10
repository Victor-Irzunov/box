import { Button, Upload, Form, Input,message } from 'antd'
import React from 'react'
import {
	PlusOutlined,
} from '@ant-design/icons'



const FormAddCardSlider = () => {

	const normFile = (e) => {
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	};
	const onFinish = (values) => {
		console.log('Success:', values)
	};
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}

	const props = {
		beforeUpload: (file) => {
			console.log('file.type: ', file.type)
			const isWebp = file.type === 'image/webp';
			if (!isWebp) {
				message.error(`${file.name} is not a wepb file`);
			}
			return isWebp || Upload.LIST_IGNORE;
		},
		onChange: (info) => {
			console.log(info.fileList);
		},
	};
	return (
		<Form
			name="basic91"
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
				label="Изменить название"
				name="title"
				rules={[
					{
						required: true,
						message: 'Пожалуйста введите название!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Изменить картинку"
				// valuePropName="fileList"
				name="upload"
				extra=".webp"
			>
				<Upload
					action="/upload.do"
					listType="picture-card"
					name="logo"
					getValueFromEvent={normFile}
					{...props}
					maxCount={1}
				>
					<div>
						<PlusOutlined />
						<div
							style={{
								marginTop: 8,
							}}
						>
							Загрузить
						</div>
					</div>
				</Upload>
			</Form.Item>

			<Form.Item
				wrapperCol={{
					span: 24,
				}}
			>
				<Button htmlType="submit">
					Сохранить
				</Button>
			</Form.Item>
		</Form>
	);
};
export default FormAddCardSlider