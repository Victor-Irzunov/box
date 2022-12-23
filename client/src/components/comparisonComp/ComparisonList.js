import React, { useEffect, useContext, useState } from 'react'
import {
	Radio, Table,
	Tooltip, Typography,
	Image, Rate,
	Button, message, Tag
} from 'antd'
import { CheckOutlined, DeleteOutlined, ClearOutlined } from '@ant-design/icons'
import { fetchInfoTitle, fetchProductNoUser } from '../../http/productsAPI'
import { Context } from '../../App'
import {
	Link, useLocation
} from 'react-router-dom'
import Svg from '../../images/menuIcon/Svg'
import { useCookieList } from '../../hooks/useCookieList'
import ModalCookies from '../modalCookies/ModalCookies'
import { observer } from "mobx-react-lite"
import {
	PushpinOutlined,
	ArrowRightOutlined,
	ArrowLeftOutlined,

} from '@ant-design/icons'
import { addBasketUserOneProduct } from '../../http/basketAPI'
import { useScreens } from '../../Constants/constants'
import CyrillicToTranslit from 'cyrillic-to-translit-js'

const { Paragraph, Text } = Typography

const BtnComp = observer(({ el }) => {
	const { dataApp, user, dataProducts } = useContext(Context)
	const [dataModal, setDataModal] = useState({})
	const { addList } = useCookieList(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	function addBasket(el) {
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
		<div className='mr-3'>
			{(user.isAuth ? dataProducts.dataBasket.some(elem => elem.productId === el.id) : dataApp.basketArr.some(elem => elem.id === el.id)) ?
				<Link to='/korzina'>
					<Tooltip title="Товар в корзине">
						<Button
							type="primary"
							shape="round"
							size='small'
							icon={<CheckOutlined />}
							className=''
						/>
					</Tooltip>
				</Link>
				:
				<Tooltip title="Добавить в корзину">
					<Button
						type="primary"
						shape="round"
						size='small'
						onClick={() => addBasket(el)}
						icon={<Svg />}
						className=''
					/>
				</Tooltip>
			}
			<ModalCookies isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} data={dataModal} btnText={"продолжить"} />
		</div>
	)
})



const ComparisonList = observer(() => {
	const { dataApp, user, dataProducts } = useContext(Context)
	const screens = useScreens()
	const [colomns, setColomns] = useState([])
	const { deleteAllList, deleteOneList } = useCookieList(null)
	const [isLoading, setIsLoading] = useState(true)
	const [selectionType, setSelectionType] = useState('')
	const [isUpdate, setIsUpdate] = useState(false)
	const cyrillicToTranslit = new CyrillicToTranslit()
	let location = useLocation()

	useEffect(() => {
		let dataTitleInfo
		if (dataApp.vesyLength) {
			fetchInfoTitle()
				.then(data => {
					dataTitleInfo = data
				})
			const col = []
			fetchProductNoUser(dataApp.vesyArr)
				.then(data => {
					if (Array.isArray(data)) {
						data.forEach((el, idx) => {
							col.push(
								{
									title: <div className='relative'>
										<Image
											src={process.env.REACT_APP_API_URL + JSON.parse(el.img)[0].image}
											className=''
										/>
										<div className='absolute top-0 right-0 bg-white'>
											<Button type="text"
												danger
												onClick={() => deleteOneElCookies(el.id, idx)}
												size='small'
											>
												<DeleteOutlined />
												удалить
											</Button>
										</div>
									</div>,
									render: () => {
										return (
											<div key={el.id} >
												<Link to={{
													pathname: `/${el.categories[0].link}/${el.types[0].link}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`,
												}}
													state={{ id: el.id, location: location.pathname }}
												>
													<Paragraph
														ellipsis={{ rows: 1, symbol: '...' }}
														className='font-semibold text-base'
													>
														{el.name}
													</Paragraph>
												</Link>
												<div className='flex justify-between'>
													<p>{el.price} BYN</p>
													<BtnComp el={el} />
												</div>
												<Rate allowHalf defaultValue={4.5} disabled />
												{dataTitleInfo && dataTitleInfo.map((elem) => {
													return (
														<div className='mb-3 mt-2 border-b' key={elem.id}>
															<p className='font-semibold text-sm mb-2'>
																{elem.name}
															</p>
															{el.info.map((item, idx) => {
																if (elem.id === item.titleInfoId) {
																	return (
																		<div key={item.id}>
																			<div className='flex justify-between mb-2'>
																				<p>{item.title}</p>
																				<Tag color="pink">{item.description}</Tag>
																			</div>
																		</div>
																	)
																}
															})}
														</div>
													)
												})}
											</div>
										)
									},

								})
						})
						setColomns(col)
						setIsLoading(false)
					} else {
						message.warning(data.message)
						setIsLoading(false)
						setColomns([])
					}
				})
		} else {
			message.success('Тут пусто')
			setColomns([])
			setIsLoading(false)
		}
	}, [dataApp.vesyLength])

	function clearAllList() {
		deleteAllList('ComparisonList')
	}

	function deleteOneElCookies(id) {
		deleteOneList('ComparisonList', id)
	}

	const fixedElem = (value) => {
		if (value === 'left') {
			colomns.map((el, idx) => {
				if (idx === 0) {
					el.fixed = true
					return
				}
				if (idx === colomns.length - 1) {
					el.fixed = false
					return
				}
			})
		}
		if (value === 'right') {
			colomns.map((el, idx) => {
				if (idx === 0) {
					el.fixed = false
					return
				}
				if (idx === colomns.length - 1) {
					el.fixed = 'right'
					return
				}
			})
		}
		if (!value) {
			colomns.map((el, idx) => {
				if (idx === 0) {
					el.fixed = false
					return
				}
				if (idx === colomns.length - 1) {
					el.fixed = false
					return
				}
			})
		}

	}
	const data = [{}]

	return (
		<div>
			{Object.entries(screens)
				.filter((screen) => !!screen[1])
				.map((screen) => (
					<Tag color="blue" key={screen[0]}>
						{screen[0]}
					</Tag>
				))}
			{dataApp.vesyLength ?
				<div className='w-full flex justify-end mb-3'>
					<Button
						type='text' danger
						onClick={() => clearAllList()}
					>
						<ClearOutlined />
						Очистить список сравнения
					</Button>
				</div>
				:
				undefined
			}
			{screens.xs &&
				<Radio.Group
					onChange={({ target: { value } }) => {
						fixedElem(value)
						setSelectionType(value)
					}}
					value={selectionType}
					className='w-full'
				>
					<div className='flex justify-between mb-3'>
						<Radio.Button value="left"><ArrowLeftOutlined /> <PushpinOutlined rotate={315} /></Radio.Button>
						<Radio.Button value=""><PushpinOutlined rotate={45} /></Radio.Button>
						<Radio.Button value="right"><PushpinOutlined rotate={315} /> <ArrowRightOutlined /></Radio.Button>
					</div>
				</Radio.Group>
			}
			<Table
				columns={colomns}
				className="virtual-table"
				dataSource={colomns.length ? data : []}
				loading={isLoading}
				bordered
				pagination={false}
				size='small'
				scroll={{
					x: 600,
					y: 300,
				}}
			/>

		</div>
	)
})

export default ComparisonList