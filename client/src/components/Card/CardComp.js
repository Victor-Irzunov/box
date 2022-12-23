// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { Rate, Card, Row, Col, Button, Tooltip, Badge, Image, message } from 'antd'
import React, { useContext, useState } from 'react'
import Svg from '../../images/menuIcon/Svg'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import BadgeIconVesy from '../badgeIcon/badgeIconVesy/BadgeIconVesy'
import BadgeIconHeard from '../badgeIcon/badgeIconHeard/BadgeIconHeard'
// import { observer } from "mobx-react-lite"
import { Context } from '../../App'
import { useCookieList } from '../../hooks/useCookieList'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import ModalCookies from '../modalCookies/ModalCookies'
import { addBasketUserOneProduct } from '../../http/basketAPI'


const CardComp = ({ itemCard, page, location, deleteOneElCookies }) => {
	const { dataApp, user, dataProducts } = useContext(Context)
	const [visible, setVisible] = useState(false)
	const [idPreviewGroup, setIdPreviewGroup] = useState(null)
	const cyrillicToTranslit = new CyrillicToTranslit()
	const { addList } = useCookieList(null)
	const [dataModal, setDataModal] = useState({})
	const [isModalOpen, setIsModalOpen] = useState(false)

	const addBasket = el => {
		if (!user.isAuth) {
			addList('BasketProduct', el.id)
		} else {
			addBasketUserOneProduct(el.id)
				.then(data => {
					dataApp.setBasketLength(data.length)
					dataProducts.setDataBasket(data)
					message.success('Товар добавлен в корзину')
				})
		}
		setDataModal(el)
		setIsModalOpen(true)
	}

	return (
		<Row gutter={[0, 0]}>
			{itemCard && itemCard.map((el, idx) => {
				const img = JSON.parse(el.img)

				return (
					<React.Fragment key={el.id}>
						<Col
							xl={8}
							key={el.id}
							md={12}
						>
							<Card
								className='hover:border-[#ff0084] relative'
								key={el.id}
							>
								<BadgeIconVesy
									cardComp={true}
									addToComparisonList={addList}
									id={el.id}
								/>
								{location.pathname !== "/spisok-ponravivshikhsya" ?
									<BadgeIconHeard
										cardComp={true}
										addToLiked={addList}
										id={el.id}
									/>
									:
									<div className='absolute top-0 right-0 bg-white cursor-pointer z-10'>
										<Tooltip title="удалить">
											<Button type="text"
												danger
												onClick={() => deleteOneElCookies(el.id, idx)}
												size='small'
											>
												<CloseOutlined />
											</Button>
										</Tooltip>
									</div>
								}
								<div className='h-80 overflow-hidden'>
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
									// className='object-cover bg-center'
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
										pathname: `/${el.categories[0].link}/${el.types[0].link}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`,
									}}
										state={{ page: page, id: el.id, location: location.pathname }}
									>
										<div className='h-36 mb-3 flex flex-col justify-between'>
											<p className='font-bold text-lg'>{el.name}</p>
											<p className='text-sm'>
												{el.description}
											</p>
											<p className='font-thin text-xs'>Артикул:
												{el.id}GR{el.groupId}
											</p>
											<div>
												<Rate allowHalf defaultValue={el.rating} disabled />
												<span className="ant-rate-text">
													<Badge style={{ backgroundColor: '#1cac32' }} count={el.rating} />
												</span>
											</div>
										</div>
									</Link>

									<div
									>
										<Badge
											status="success"
											text="в наличии"
										/>
										<p className='uppercase text-2xl font-semibold'>{(el.price).toFixed(2)} BYN</p>
										{(user.isAuth ? dataProducts.dataBasket.some(elem => elem.productId === el.id) : dataApp.basketArr.some(elem => elem.id === el.id)) ?
											<Link to='/korzina'>
												<Tooltip title="Товар в корзине">
													<Button
														type="primary"
														shape="round"
														size="large"
														icon={<CheckOutlined />}
														className='absolute bottom-3 right-3'
													/>
												</Tooltip>
											</Link>
											:
											<Tooltip title="Добавить в корзину">
												<Button
													type="primary"
													shape="round"
													size="large"
													onClick={() => addBasket(el)}
													icon={<Svg />}
													className='absolute bottom-3 right-3'
												/>
											</Tooltip>
										}

									</div>
								</div>

							</Card>
						</Col>

					</React.Fragment>
				)

			})}

			{
				Object.keys(dataModal).length !== 0
				&&
				<ModalCookies isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} data={dataModal} />
			}



		</Row >

	)
}
export default CardComp