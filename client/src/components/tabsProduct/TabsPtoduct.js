import { Tabs, Typography, Button, Descriptions, Row, Col, Tooltip } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import FormOtzyvy from '../forms/formOtzyvy/FormOtzyvy'
import { Context } from '../../App'
import { observer } from "mobx-react-lite"
import Otzyvy from '../otzyvy/Otzyvy'
import VoprosOtvet from '../vopros-otvet/VoprosOtvet'
// import { HighlightOutlined, } from '@ant-design/icons'
import Property from './property/Property'
import FormQuestion from '../forms/formQuestion/FormQuestion'
import { isBuyThisProductUser } from '../../http/orderAPI'
import { otzyvRatinOneUserProduct } from '../../http/otzyvyAPI'
// import { isBuyThisProductUser } from '../../http/orderAPI'

const { Paragraph } = Typography

const BtnAndFormOtzyvy = observer(({ product, isBuyProd, isOtzyvUserProd }) => {
	const { dataApp, user } = useContext(Context)
	const [isBtnFormOtzyvy, setIsBtnFormOtzyvy] = useState(false)

	return (
		<>
			{
				user.isAuth ?
					(isBtnFormOtzyvy ?
						<FormOtzyvy product={product} />
						:
						(
							isOtzyvUserProd
								?
								(<p>Вы уже оставляли отзыв о данном товаре.</p>)
								:
								(<Tooltip title={isBuyProd ? '' : 'Отзыв можно добавить, только после покупки данного товара!'}>
									<Button
										type='primary'
										disabled={!isBuyProd}
										onClick={() => setIsBtnFormOtzyvy(true)}
									>
										Добавить отзыв
									</Button>
								</Tooltip>)
						)
					)
					:
					<p>Отзывы смогут оставить только зарегистрированные пользователи.</p>
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
	const { dataProducts } = useContext(Context)
	const [editP, setEditP] = useState('')

	useEffect(() => {
		setEditP(dataProducts.dataOneProduct.description)
	}, [dataProducts.dataOneProduct])


	return (
		<>
			<Paragraph
				style={{ marginLeft: '1em' }}
			>
				{editP}
			</Paragraph>

			<Property />
		</>
	)
})




const TabsPtoduct = ({ product }) => {
	const [isBuyProd, setIsBuyProd] = useState(false)
	const [isOtzyvUserProd, setIsOtzyvUserProd] = useState(false)
	const { user } = useContext(Context)

	const onChange = key => {
		if (user.isAuth) {
			if (key === 2) {
				isBuyThisProductUser(product.id)
					.then(data => {
						console.log('isBuyThisProductUser:', data)
						if (data) {
							setIsBuyProd(true)
						} else {
							setIsBuyProd(false)
						}
					})
				otzyvRatinOneUserProduct(product.id)
					.then(data => {
						if (data) {
							setIsOtzyvUserProd(true)
						} else {
							setIsOtzyvUserProd(false)
						}
					})
			}
		}
	}

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
				<BtnAndFormOtzyvy product={product} isBuyProd={isBuyProd} isOtzyvUserProd={isOtzyvUserProd} />
			)
		},
		{
			key: 3,
			label: 'Вопрос-ответ',
			children: (<BtnAndFormQuestion />),
		},
	]


	return (
		<Tabs
			onChange={onChange}
			type="card"
			items={itemTabsProduct}
			size='large'
		/>
	)
}
export default TabsPtoduct