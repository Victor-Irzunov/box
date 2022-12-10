import { Tabs, Typography, Button, Descriptions, Row, Col } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import FormOtzyvy from '../forms/formOtzyvy/FormOtzyvy'
import { Context } from '../../App'
import { observer } from "mobx-react-lite"
import Otzyvy from '../otzyvy/Otzyvy'
import VoprosOtvet from '../vopros-otvet/VoprosOtvet'
// import { HighlightOutlined, } from '@ant-design/icons'
import Property from './property/Property'
import FormQuestion from '../forms/formQuestion/FormQuestion'

const { Paragraph } = Typography

const BtnAndFormOtzyvy = observer(() => {
	const { dataApp } = useContext(Context)
	return (
		<>
			{
				dataApp.isBtnFormOtzyvy ?
					<FormOtzyvy />
					:
					<Button
						type='primary'
						// disabled={!isAdmin}
						onClick={() => dataApp.setIsBtnFormOtzyvy(true)}
					>
						Добавить отзыв
					</Button>
			}
			<hr className='mt-5 pb-3' />
			<Otzyvy />
		</>
	)
})
const BtnAndFormQuestion = observer(() => {
	const { dataApp } = useContext(Context)
	return (
		<>
			{
				dataApp.isBtnFormQuestion ?
					<FormQuestion />
					:
					<Button
						type='primary'
						// disabled={!isAdmin}
						onClick={() => dataApp.setIsBtnFormQuestion(true)}
					>
						Задать вопрос
					</Button>
			}
			<hr className='mt-5 pb-3' />
			<VoprosOtvet />
		</>
	)
})




const ListProperty = observer(() => {
	const { dataProducts, isAdmin } = useContext(Context)
	const [editP, setEditP] = useState('')

	useEffect(() => {
		setEditP(dataProducts.dataOneProduct.description)
	}, [dataProducts.dataOneProduct])
	return (
		<>
			<Paragraph
				editable={isAdmin && {
					onChange: setEditP,
				}}
				style={{ marginLeft: '1em' }}
			>
				{editP}
			</Paragraph>
			<Property />
		</>
	)
})

const itemTabsProduct = [
	{
		key: 1,
		label: "Описание",
		children: (
			<ListProperty />
		)
	},
	{
		key: 2,
		label:
			`Отзывы`,
		children: (
			<BtnAndFormOtzyvy />
		)
	},
	{
		key: 3,
		label: 'Вопрос-ответ',
		children: (<BtnAndFormQuestion />),
	},
]


const TabsPtoduct = () => {


	// const onChange = (key) => {
	// 	console.log(key)
	// }
	return (
		<Tabs
			// onChange={onChange}
			type="card"
			items={itemTabsProduct}
			size='large'
		/>
	)
}
export default TabsPtoduct