import { Row, Col, Empty } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../App'
import { fetchInfoTitle } from '../../../http/productsAPI'

const property = [
	{
		title: 'Основные',
		id: 1,
		children: [
			{
				type: 'Тип',
				kakoj: 'Для парня',
			},
			{
				type: 'Назначение',
				kakoj: 'Подарок',
			},
			{
				type: 'Цвет коробки',
				kakoj: 'Белый',
			},
			{
				type: 'Количество в упаковке',
				kakoj: '6 шт.',
			},
		]
	},
	{
		title: 'Вес',
		id: 2,
		children: [
			{
				type: 'Вес общий',
				kakoj: '200 гр.',
			},
			{
				type: 'Вес предмета 1',
				kakoj: '11.5 гр',
			},
		]
	},
	{
		title: 'Конструктивные особенности',
		id: 3,
		children: [
			{
				type: 'Материал верха',
				kakoj: 'бумага',
			},
			{
				type: 'Внутренний материал',
				kakoj: 'текстиль',
			},
			{
				type: 'Материал наполнителя',
				kakoj: 'бумага',
			},
			{
				type: 'Вид застежки',
				kakoj: 'шнуровка',
			},
		]
	},
	{
		title: 'Производитель',
		id: 3,
		children: [
			{
				type: 'Страна производства',
				kakoj: 'Китай'
			}
		]
	}

]

const Property = () => {
	const { dataProducts } = useContext(Context)
	const [dataTitleInfo, setDataTitleInfo] = useState([])

	useEffect(() => {
		fetchInfoTitle()
			.then(data => {
				setDataTitleInfo(data)
			})
	}, [])


	return (
		!dataProducts.dataOneProduct?.info
			? <Empty />
			:
			<Row justify='space-between' gutter={[42, 12]}>
				{dataTitleInfo.map((elem, idx) => {
					return (
						<Col
							xl={8} sm={12} xm={24} xs={24}
							className='mt-10 p-3'
							key={elem.id}
						>
							<h6
								key={elem.id}
								className='font-bold text-base mb-2'
							>
								{elem.name}
							</h6>
							{dataProducts.dataOneProduct.info.map((el) => {
								if (elem.id === el.titleInfoId) {
									return (
										<React.Fragment key={el.id}>
											<div className='flex justify-between'>
												<p>{el.title}</p>
												<p className='text-left'>{el.description}</p>
											</div>
										</React.Fragment>
									)
								} 
							})}
						</Col>
					)
				})}
			</Row>
	)
}
export default Property
