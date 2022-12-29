import React, { useState, useContext, useEffect } from 'react'
import CourouselComp from '../../components/react-image-gallery/CurouselComp'
import { Typography, Row, Col, Rate, Badge, Button, BackTop, message, Tag } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import { Context } from "../../App"
import { CarOutlined, ArrowLeftOutlined, CheckOutlined,DownCircleOutlined } from '@ant-design/icons'
import { Helmet } from "react-helmet"
import BadgeIconHeard from '../../components/badgeIcon/badgeIconHeard/BadgeIconHeard'
import BadgeIconVesy from '../../components/badgeIcon/badgeIconVesy/BadgeIconVesy'
import { ReactComponent as CardSvg } from '../../images/footer/bank_card.svg'
import TabsPtoduct from '../../components/tabsProduct/TabsPtoduct'
import PohozhieTovary from '../../components/pohozhieTovary/PohozhieTovary'
import Content from '../../components/content/Content'
import { useCookieList } from '../../hooks/useCookieList'
import { observer } from "mobx-react-lite"
import { fetchOneProduct } from '../../http/productsAPI'
import { addBasketUserOneProduct } from '../../http/basketAPI'
// import { useScreens } from '../../Constants/constants'



const ProductPage = observer(() => {
	const { dataApp, dataProducts, user } = useContext(Context)
	let location = useLocation()
	const navigate = useNavigate()
	// const screens = useScreens()
	const [editH1, setEditH1] = useState('')
	const [product, setProduct] = useState({})
	const [imgArr, setImgArr] = useState([])
	const [review, setReview] = useState('')
	const { addList } = useCookieList(null)
	const id = location.state?.id
	const loca = location.state?.location

	useEffect(() => {
		fetchOneProduct(id)
			.then(data => {
				setProduct(data)
				setEditH1(data.name)
				dataProducts.setDataOneProduct(data)
				declOfNum(data.feedbacks.length, ['отзывов', 'отзыва', 'отзыв'])
				setImgArr(fuImg(data))
			})
	}, [id])

	const addBasket = id => {
		if (!user.isAuth) {
			addList('BasketProduct', id)
			message.success('Товар добавлен в корзину')
		} else {
			addBasketUserOneProduct(id)
				.then(data => {
					dataApp.setBasketLength(data.length)
					dataProducts.setDataBasket(data)
					message.success('Товар добавлен в корзину')
				})
		}
	}

	function fuImg(data) {
		const img = JSON.parse(data.img)
		const imgMini = JSON.parse(data.imgMini)
		const imgArray = []
		img.forEach((el, idx) => {
			imgMini.forEach((elem, i) => {
				if (idx === i) {
					imgArray.push({ original: process.env.REACT_APP_API_URL + el.image, thumbnail: process.env.REACT_APP_API_URL + elem.image })
					return
				}
				return
			})
		})
		return imgArray
	}

	function declOfNum(n, text_forms) {
		n = Math.abs(n) % 100;
		var n1 = n % 10;
		if (n > 10 && n < 20) setReview(text_forms[0])
		if (n1 > 1 && n1 < 5) setReview(text_forms[1])
		if (n1 === 5) setReview(text_forms[0])
		if (n1 === 1) setReview(text_forms[2])
		if (n1 === 0) setReview(text_forms[0])
	}

	const clickScroll = (params) => {
		setTimeout(() => window.scrollBy({
			top: params,
			left: 0,
			behavior: 'smooth',
		}), 150)
	}
	const goBack = () => navigate(
		`${loca}`
	)

	return (
		<>
			<Helmet>
				<title>{dataApp.data['/muzhskie'].title}</title>
				<meta name="description" content={dataApp.data['/muzhskie'].description} />
			</Helmet>
			<BackTop />
			<section className='container pt-5 pb-20'>
				<Button
					type='link'
					className='text-sm text-slate-500 font-thin mb-6 pl-0'
					onClick={goBack}
				>
					<ArrowLeftOutlined /> назад
				</Button>
				<Typography.Title
				>
					{editH1}
				</Typography.Title>

				<div className='flex w-1/4 sm:w-full xs:w-full xx:w-full xy:w-full justify-start'>
					<div className='flex'>
						<Rate allowHalf value={product.rating} disabled />
						<span className="mt-1.5 ml-3">
							<Badge style={{ backgroundColor: '#52c41aa8', }} count={product.rating} />
						</span>
					</div>
					<div>
						<p
							className='text-slate-400 mt-1.5 underline cursor-pointer'
							onClick={() => clickScroll(1400)}
						>
							{product.feedbacks && product.feedbacks.length} {review}
						</p>
					</div>
				</div>

				<Row gutter={[56, 56]}>
					<Col xl={14} className='mt-10'>
						<CourouselComp className='' imgArr={imgArr} />
						<Button
							type='text'
							className='mt-3'
							onClick={() => clickScroll(900)}
						>похожие боксы <DownCircleOutlined /></Button>
					</Col>
					<Col xl={10} className='p-2 mt-10'>
						<div className='border-b pb-6'>
							<div className='flex justify-between'>
								<div>
									<p className='font-thin text-sm'>Артикул: {product.id}GR{product.groupId}</p>
								</div>
								<div className='flex w-16 justify-between'>
									<BadgeIconVesy
										productPage={true}
										addToComparisonList={addList}
										id={product.id}
									/>
									<BadgeIconHeard
										productPage={true}
										addToLiked={addList}
										id={product.id}
									/>
								</div>
							</div>
							<div className='mt-10'>
								<p>{product.description}</p>
							</div>
						</div>
						<div className='border-b pb-6 pt-6'>
							<p className='text-base text-slate-700 font-light pb-2'>Цена:</p>
							<div className='flex justify-between'>
								<p className='text-3xl'>{product.price && (product.price).toFixed(2)} BYN</p>
								{product.discountPercentage ? <p className='text-[#00FF26] bg-[#ff0084]  py-2 px-3'>скидка на бокс: {product.discountPercentage}%</p> : ''}
							</div>
							<div
								className='flex justify-start mt-8'
							>
								<Button
									type="primary"
									shape="round"
									size={'large'}
									block
									disabled={(user.isAuth ? dataProducts.dataBasket.some(elem => elem.productId === product.id) : dataApp.basketArr.some(elem => elem.id === product.id))}
									icon={(user.isAuth ? dataProducts.dataBasket.some(elem => elem.productId === product.id) : dataApp.basketArr.some(elem => elem.id === product.id)) && <CheckOutlined />}
									className='mr-4'
									onClick={() => addBasket(product.id)}
								>
									{(user.isAuth ? dataProducts.dataBasket.some(elem => elem.productId === product.id) : dataApp.basketArr.some(elem => elem.id === product.id)) ? 'В корзине' : 'В корзину'}
								</Button>
							</div>
						</div>
						<div className='border-b pb-4 pt-2'>
							<div>
								<Button type="link" size='small'>
									Доставка
								</Button>
								<span>по Минску и Беларуси</span>
							</div>
							<Button type='text' size='small'>Гарантия: 6 месяцев</Button>
						</div>
						<div className='flex pt-2 justify-evenly'>
							<div className='flex'>
								<CardSvg className='icon-card' />
								<Button type='link'>Рассрочка и кредит</Button>
							</div>
							<div className='flex'>
								<CarOutlined style={{ fontSize: '1.7em', color: 'gray' }} className='mt-1' />
								<Button type='link'>Доставка по Беларуси</Button>
							</div>
						</div>
					</Col>
				</Row>
				<div className='mt-28' id='box' />
				{Object.keys(product).length &&
					<PohozhieTovary product={product} />
				}
				<TabsPtoduct product={product} />
				<Content />
			</section>
		</>
	)
})

export default ProductPage