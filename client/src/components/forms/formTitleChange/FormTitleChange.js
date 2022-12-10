import { Button, Form, Input, message } from 'antd'
import React, { useContext } from 'react'
import { titles } from '../../../content/Content'
import { Context } from '../../../App'

const { TextArea } = Input


const FormTitleChange = ({ url, setOpen, }) => {
	const { dataApp } = useContext(Context)


	const onFinish = (values) => {
		if (values.title.length < 50) message.warning('Title меньше 50 символов')
		if (values.description.length < 150) message.warning('Description меньше 150 символов')
		dataApp.setData({ ...dataApp.data, [url]: { title: values.title, description: values.description } })
		message.success('Изменено успешно!')
		setOpen(false)
	}
	const onFinishFailed = (errorInfo) => {
		message.error('Ошибка:', errorInfo)
	};
	return (
		<Form
			name="basic90"
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
				label="Изменить title"
				name="title"
				rules={[
					{
						required: true,
						message: 'Пожалуйста введите новый title!',
					},
				]}
			>
				<TextArea
					rows={6}
					showCount maxLength={130}
					placeholder='Оптимально 50-70 символов'
					defaultValue={titles[url].title}
				/>
			</Form.Item>

			<Form.Item
				label="Изменить description"
				name="description"
				rules={[
					{
						required: true,
						message: 'Пожалуйста введите новый description!',
					},
				]}
			>
				<TextArea
					rows={6}
					showCount maxLength={400}
					placeholder='Рекомендовано 150-300 символов'
					defaultValue={titles[url].description}
				/>
			</Form.Item>

			<Form.Item
				wrapperCol={{
					span: 16,
				}}
			>
				<Button htmlType="submit">
					Изменить
				</Button>
			</Form.Item>
		</Form>
	);
};
export default FormTitleChange