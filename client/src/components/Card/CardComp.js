// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { Rate, Card, Row, Col, Button, Tooltip, Badge, Image } from 'antd'
import React, { useContext, useState } from 'react'
import Svg from '../../images/menuIcon/Svg'
// import { itemCard } from '../../content/Content'
import { Link } from 'react-router-dom'
import BadgeIconVesy from '../badgeIcon/badgeIconVesy/BadgeIconVesy'
import BadgeIconHeard from '../badgeIcon/badgeIconHeard/BadgeIconHeard'
import { observer } from "mobx-react-lite"
import { Context } from '../../App'
import { useCookieList } from '../../hooks/useCookieList'
import CyrillicToTranslit from 'cyrillic-to-translit-js'


const CardComp = ({ itemCard }) => {
	const { dataApp } = useContext(Context)
	const [visible, setVisible] = useState(false)
	const [idPreviewGroup, setIdPreviewGroup] = useState(null)
	const cyrillicToTranslit = new CyrillicToTranslit()
	const { addList } = useCookieList(null)


	const addBasket = () => {
		dataApp.setBasketLength(dataApp.basketLength + 1)
	}


	return (
		<Row gutter={[0, 0]}>
			{itemCard && itemCard.map((el, idx) => {
				const img = JSON.parse(el.img)
				return (
					<Col xl={8} key={el.id}>
						<Card
							className='hover:border-[#ff0084] relative'
							key={el.id}
						>
							<BadgeIconVesy
								cardComp={true}
								addToComparisonList={addList}
								id={el.id}
							/>
							<BadgeIconHeard
								cardComp={true}
								addToLiked={addList}
								id={el.id}
							/>
							<div className='h-60 overflow-hidden'>
								<Image
									preview={{
										visible: false,
									}}
									src={process.env.REACT_APP_API_URL + img[0].image}
									onClick={
										() => {
											setVisible(true)
											setIdPreviewGroup(el.id)
										}

									}
								/>
								<div
									style={{
										display: 'none',
									}}
								>
									<Image.PreviewGroup
										preview={{
											visible: idPreviewGroup === el.id && visible,
											onVisibleChange: (vis) => setVisible(vis),

										}}
									>
										{img.map((elem, idx) => {
											return (
												<Image
													src={process.env.REACT_APP_API_URL + elem.image}
													key={idx}
												/>
											)
										})}
									</Image.PreviewGroup>
								</div>
							</div>


							<div className='h-72 p-2 cursor-pointer'>
								<Link to={{
									pathname: `/${el.categories[0].link}/${el.types[0].link}/${el.id}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`
								}}>
									<div className='h-36 mb-3 flex flex-col justify-between'>
										<p className='font-bold text-lg'>{el.name}</p>
										<p className='text-sm'>
											{el.description}
										</p>
										<p className='font-thin text-xs'>Артикул:
											{el.id}
										</p>
										<div>
											<Rate allowHalf defaultValue={el.rating} disabled />
											<span className="ant-rate-text"> <Badge style={{
												backgroundColor: '#1cac32',
											}} count={el.rating} /></span>
										</div>
									</div>
								</Link>

								<div
								>
									<Badge
										status="success"
										text="в наличии"
									/>
									<p className='uppercase text-2xl font-semibold'>{el.price} BYN</p>
									<Tooltip title="Добавить в корзину">
										<Button
											type="primary"
											shape="round"
											size="large"
											onClick={() => addBasket()}
											icon={<Svg />}
											className='absolute bottom-3 right-3'
										/>
									</Tooltip>
								</div>
							</div>

						</Card>
					</Col>
				)
			})}




		</Row >
	)
}
export default CardComp