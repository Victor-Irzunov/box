import {
	Button,
	AutoComplete,
	// InputNumber,
	Radio,
	Form,
	Input,
	Select,
	DatePicker,
	Divider,
	message,
	Checkbox,
	Space,
} from 'antd'
import React, { useState, useContext } from 'react'
import InputMask from 'react-input-mask'
// import { FieldTimeOutlined } from '@ant-design/icons'
import { useCookieList } from '../../hooks/useCookieList'
import moment from 'moment'
import { observer } from 'mobx-react-lite'
import { Context } from '../../App'
import { orderNoUser } from '../../http/orderAPI'

const { Option } = Select
const { TextArea } = Input
const dateFormat = 'DD.MM.YYYY'

const disabledDate = (current) => {
	// Can not select days before today and today
	return current && current < moment() //.endOf('day')
}



const FormBasketOrder = ({ next }) => {

	const { dataProducts } = useContext(Context)
	const [autoCompleteResult, setAutoCompleteResult] = useState([])
	const [tel, setTel] = useState('')
	const [value, setValue] = useState('')
	const [isCheck, setIsCheck] = useState(false)
	const { deleteAllList } = useCookieList(null)
	const [form] = Form.useForm()
	console.log('dataProducts.sendData: ', [...dataProducts.sendData])

	const onFinish = (values) => {
		console.log('Success:', values)
		// setTimeout(() => {
		// next()
		// message.success('Заказ успешно оформлен!')
		// deleteAllList('BasketProduct', null)
		// }, 2000)


		const formData = new FormData()
		formData.append('city', values.address_city)
		formData.append('street', values.address_street)
		formData.append('comment', values.comment)
		formData.append('date', values.date._d.toLocaleDateString("ru-RU"))
		formData.append('dostavka', values.dostavka)
		formData.append('login', values.login)
		formData.append('oplata', values.oplata)
		formData.append('tel', values.tel)
		formData.append('time', values.time)
		formData.append('firstName', values.fitstName)
		formData.append('lastName', values.last_name)
		formData.append('otchestvo', values.otchestvo)
		formData.append('dataBasket', JSON.stringify([...dataProducts.sendData]))

		// console.log('formData-->: ', [...formData])
		// console.log('formData:', formData.get('dataBasket'))
		orderNoUser(formData)
			.then(data => {
				console.log('data order: ', data)
			})
	}




	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
		message.error('Заполните пожалуйста корректно форму')
	}
	const onWebsiteChange = (value) => {
		if (!value) {
			setAutoCompleteResult([]);
		} else {
			setAutoCompleteResult(['@gmail.com', '@tut.by', '@yandex.by', '@mail.ru'].map((domain) => `${value}${domain}`));
		}
	}
	const websiteOptions = autoCompleteResult.map((website) => ({
		label: website,
		value: website,
	}))
	const beforeMaskedValueChange = (newState, oldState, userInput) => {
		var { value } = newState
		var selection = newState.selection
		var cursorPosition = selection ? selection.start : null
		// keep minus if entered by user
		if (value.endsWith('-') && userInput !== '-' && !tel.endsWith('-')) {
			if (cursorPosition === value.length) {
				cursorPosition--
				selection = { start: cursorPosition, end: cursorPosition }
			}
			value = value.slice(0, -1)
		}
		return {
			value,
			selection
		}
	}
	const onChange = (e) => {
		console.log('radio checked', e.target.value)
		setValue(e.target.value)
	}
	const onChangeCheck = (e) => {
		console.log('e.target.checked: ', e.target.checked)
		setIsCheck(e.target.checked)
	}


	return (
		<Form
			name="order"
			form={form}
			labelCol={{
				span: 8,
			}}
			wrapperCol={{
				span: 16,
			}}
			initialValues={{
				address_city: 'minsk'
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>

			<Divider
				orientation="left"
				className='mb-5 text-base'
			>
				Заказчик
			</Divider>


			<Form.Item
				label="Ваше имя"
				name="fitstName"
				rules={[
					{
						required: true,
						message: 'Пожалуйста введите Ваше имя!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="tel"
				label="Телефон"
				rules={[
					{
						required: true,
						message: 'Пожалуйста введите Ваш телефон!',
					},
				]}
			>
				<InputMask
					className='ant-input'
					value={tel}
					onChange={(e) => setTel(e.target.value)}
					// placeholder="-- --- -- --"
					mask="+3\7\5 99 999 99 99"
					maskChar={'-'}
					beforeMaskedValueChange={beforeMaskedValueChange}

					style={{
						width: '100%',
					}}
				/>
			</Form.Item>


			<Form.Item
				label="Почта"
				name="login"
				tooltip="Обязательное поле"
				hasFeedback
				rules={[
					{
						required: true,
						message: 'Пожалуйста введите почту!',
					},
					{
						type: 'email',
						message: 'Введите корректный email!',
					},
				]}
			>
				<AutoComplete
					options={websiteOptions}
					onChange={onWebsiteChange}
					placeholder="exemple@gmail.com"
				/>
			</Form.Item>


			<Divider
				orientation="left"
				className='mb-5 text-base'
			>
				Доставка
			</Divider>

			<Form.Item
				name="dostavka"
				rules={[{ required: true, message: 'Выберите регион для доставки!' }]}
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Radio.Group onChange={onChange} >
					<Radio value="kurer_minsk" className='mb-3'>Курьером в пределах Минска (бесплатно от 50 BYN)</Radio>
					<Radio value="kurer_belarus">Курьером по Беларуси (+15 BYN)</Radio>
				</Radio.Group>
			</Form.Item>


			{value !== 'kurer_belarus' ?
				<Form.Item
					name="address_city"
					label="Город"
				>
					<Select>
						<Option value="minsk">Минск</Option>
					</Select>
				</Form.Item>
				:
				<Form.Item
					name="address_country"
					label="Город"
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите Ваш город!',
						},
					]}
				>
					<Input />
				</Form.Item>
			}



			<Form.Item
				label="Адрес"
				name="address_street"
				rules={[
					{
						required: true,
						message: 'Пожалуйста введите улицу!',
					},
				]}
			>
				<Input />
			</Form.Item>


			{value === 'kurer_belarus' &&
				<>
					<Form.Item
						label="Фамилия"
						name="last_name"
						rules={[
							{
								required: true,
								message: 'Пожалуйста введите фамилию!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Отчество"
						name="otchestvo"
						rules={[
							{
								required: true,
								message: 'Пожалуйста введите отчество!',
							},
						]}
					>
						<Input />
					</Form.Item>
				</>

			}


			<Form.Item
				label="Выберите число"
				name="date"

				rules={[{ required: true, message: 'Выберите число для доставки!' }]}
			>
				<DatePicker
					format={dateFormat}
					disabledDate={disabledDate}
					style={{
						width: '100%',
					}}
				/>
			</Form.Item>


			<Form.Item
				label="Выберите время"
				name="time"
				rules={[{ required: true, message: 'Выберите время для доставки!' }]}
			>
				<Radio.Group>
					<Radio.Button value="10-14">10-14</Radio.Button>
					<Radio.Button value="14-18">14-18</Radio.Button>
					<Radio.Button value="18-22">18-22</Radio.Button>
				</Radio.Group>
			</Form.Item>


			<Divider
				orientation="left"
				className='mb-5 text-base'
			>
				Оплата
			</Divider>


			<Form.Item
				name="oplata"
				rules={[{ required: true, message: 'Выберите форму оплаты!' }]}
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Radio.Group
					onChange={onChange}
					value={value}
				>
					<Space direction="vertical" className='mb-10'>
						<Radio value={'Онлайн оплата картой Visa/MasterCard'}>Онлайн оплата картой Visa/MasterCard</Radio>
						<Radio value={'Онлайн оплата через ЕРИП'}>Онлайн оплата через ЕРИП</Radio>
						<Radio value={'Оплата курьеру наличными/картой'}>Оплата курьеру наличными/картой</Radio>
					</Space>
				</Radio.Group>
			</Form.Item>

			<Form.Item
				label="Комментарий к заказу"
				name="comment"
			>
				<TextArea
					autoSize allowClear
				/>
			</Form.Item>




			<Form.Item
				name="check"
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Checkbox onChange={onChangeCheck}>Я согласен на обработку персональных данных</Checkbox>
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 18,
					// span: 8,
				}}
				className='mt-8'
			>
				<Button
					type="primary"
					size='large'
					htmlType="submit"
					disabled={!isCheck}
				>
					Оформить заказ
				</Button>
			</Form.Item>
		</Form>
	)
}
export default FormBasketOrder