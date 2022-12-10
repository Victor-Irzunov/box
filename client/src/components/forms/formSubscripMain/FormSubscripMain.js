import { Button, Checkbox, Form, Input } from 'antd'
import React, { useState } from 'react'
const FormSubscripMain = () => {
	const [isCheck, setIsCheck] = useState(false)
	const onFinish = (values) => {
		console.log('Success:', values);
	}
	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	}
	const onChange = (e) => {
		setIsCheck(e.target.checked)
	}


	return (
		<Form
			name="basic112"
			layout="inline"
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			<Form.Item
				name="username"
			>
				<Input placeholder='Ваше имя' />
			</Form.Item>

			<Form.Item
				name="email"
				rules={[
					{
						required: true,
						message: 'Введите email!',
					},
				]}
			>
				<Input placeholder='Ваш email' />
			</Form.Item>
			<Form.Item
			>
				<Button disabled={!isCheck} htmlType="submit">
					Подпишитесь
				</Button>
			</Form.Item>
			<br />
			<br />
			<Form.Item
				name="check"
				wrapperCol={{
					span: 24,
				}}
			>
				<Checkbox onChange={onChange}>Я согласен на обработку персональных данных</Checkbox>
			</Form.Item>


		</Form >
	);
};
export default FormSubscripMain