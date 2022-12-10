import { Col, InputNumber, Row, Slider, Form, Button } from 'antd'
import React, { useState } from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'

const IntegerStep = ({ onValuesChange }) => {
	const [inputValue, setInputValue] = useState(1)

	const onChange = (newValue) => {
		setInputValue(newValue)
	}
	return (
		// <Form.Item name="from">
		<Row>
			<Col span={24}>
				<span>от</span>
			</Col>
			<Col span={24}>
				<Slider
					min={15}
					max={400}
					step={0.1}
					onChange={onChange}
					value={typeof inputValue === 'number' ? inputValue : 0}
				/>
			</Col>
			<Col span={12}>

				<InputNumber
					min={15}
					max={400}
					step={0.1}
					style={{
						margin: '0 16px',
					}}
					value={inputValue}
					onChange={onValuesChange}
				/>
			</Col>
		</Row>
		// {/* </Form.Item> */}
	)
}
const DecimalStep = () => {
	const [inputValue, setInputValue] = useState(0)
	const onChange = (value) => {
		if (isNaN(value)) {
			return
		}
		setInputValue(value)
		console.log('------value: ', value)
	}
	return (
		// <Form.Item name='before'>
		<Row>
			<Col span={24}>
				<span>до</span>
			</Col>
			<Col span={24}>
				<Slider
					min={15}
					max={400}
					onChange={onChange}
					value={typeof inputValue === 'number' ? inputValue : 0}
					step={0.1}

				/>
			</Col>
			<Col span={12}>

				<InputNumber
					min={15}
					max={400}
					style={{
						margin: '0 16px',
					}}
					step={0.1}
					value={inputValue}
					onChange={onChange}
				/>

			</Col>
		</Row>
		// </Form.Item>
	)
}

const style = {
	display: 'inline-block',
	height: 250,
	marginBottom: 20,
	// marginLeft: 70,
};

const marks = {
	15: '15',
	50: '50',
	100: '100',
	150: '150',
	200: '200',
	250: '250',
	300: '300',
	350: '350',
	400: '400',
}


const FormPrice = (
	{ inputValueFrom, setInputValueFrom,
		inputValueBefore, setInputValueBefore,
		sendFormFilter, resetFilter
	}
) => {
	// const [inputValueFrom, setInputValueFrom] = useState(15)
	// const [inputValueBefore, setInputValueBefore] = useState(0)

	const onChangeFrom = (newValue) => setInputValueFrom(newValue)
	const onChangeBefore = (value) => {
		if (isNaN(value)) return
		setInputValueBefore(value)
	}
	// const sendForm = () => {
	// 	console.log('---sendForm--inputValueFrom: ', inputValueFrom)
	// 	console.log('---sendForm--inputValueBefore: ', inputValueBefore)
	// }
	const onFinishFailed = (errorInfo) => {
		console.log('ошибка в отправке:', errorInfo);
	}


	return (
		<div>
			<Form
				onFinish={sendFormFilter}
				onFinishFailed={onFinishFailed}
			>
				{/* <IntegerStep />
			<DecimalStep /> */}
				{/* </Form> */}

				<Row>
					<Col xl={12}>
						<Row>
							<Col span={24} offset={2}>
								<span>от</span>
							</Col>
							<Col span={24} >
								<Form.Item name='from'>
									<div style={style}>

										<Slider
											vertical
											marks={marks}
											min={15}
											max={400}
											step={0.1}
											onChange={onChangeFrom}
											value={typeof inputValueFrom === 'number' ? inputValueFrom : 0}
										/>

									</div>
								</Form.Item>
							</Col>
							<Col span={24}>

								<InputNumber
									min={15}
									max={400}
									step={0.1}
									style={{
										margin: '0 5px 0 5px',
									}}
									value={inputValueFrom}
									onChange={onChangeFrom}
								/>
							</Col>
						</Row>
					</Col>
					<Col xl={12}>
						<Row>
							<Col span={24} offset={2}>
								<span>до</span>
							</Col>
							<Col span={24} className='overflow-y-hidden'>
								<Form.Item name="before">
									<div style={style}>

										<Slider
											vertical
											marks={marks}
											min={inputValueFrom}
											max={400}
											onChange={onChangeBefore}
											value={typeof inputValueBefore === 'number' ? inputValueBefore : 0}
											step={0.1}
										/>

									</div>
								</Form.Item>
							</Col>
							<Col span={24}>

								<InputNumber
									min={inputValueFrom}
									max={400}
									// style={{
									// 	margin: '0 16px',
									// }}
									step={0.1}
									value={inputValueBefore}
									onChange={onChangeBefore}
								/>

							</Col>
						</Row>
					</Col>
				</Row>
				<Form.Item
				// wrapperCol={{
				// 	offset: 8,
				// 	span: 16,
				// }}
				>
					<Button
						type="primary"
						htmlType="submit"
						className='mt-5 ml-2'
					>
						Фильтровать
					</Button>
				</Form.Item>
			</Form>
			<Button
				type='text'
				onClick={resetFilter}
				className='text-xs'
				icon={<CloseCircleOutlined />}
			>

				Сбросить фильтр
			</Button>
		</div>
	)
}
export default FormPrice