import React, { useState, useContext, useEffect } from 'react'
import CourouselComp from '../../components/react-image-gallery/CurouselComp'
import { Typography, Row, Col, Rate, Badge, Button, BackTop } from 'antd'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Context } from "../../App"
import { HighlightOutlined, CarOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import { Helmet } from "react-helmet"
// import axios from 'axios'
import BadgeIconHeard from '../../components/badgeIcon/badgeIconHeard/BadgeIconHeard'
import BadgeIconVesy from '../../components/badgeIcon/badgeIconVesy/BadgeIconVesy'
import { ReactComponent as CardSvg } from '../../images/footer/bank_card.svg'
import TabsPtoduct from '../../components/tabsProduct/TabsPtoduct'
import PohozhieTovary from '../../components/pohozhieTovary/PohozhieTovary'
import FormRadioColor from '../../components/forms/formFilter/FormRadioColor'
import FormSizeBtn from '../../components/forms/formSizeBtn/FormSizeBtn'
import Content from '../../components/content/Content'
import { useCookieList } from '../../hooks/useCookieList'
import { observer } from "mobx-react-lite"
import { fetchOneProduct } from '../../http/productsAPI'



const ProductPage = observer(() => {
	const { isAdmin, dataApp, dataProducts } = useContext(Context)
	const { id } = useParams()
	let location = useLocation()



	const navigate = useNavigate()
	const [editH1, setEditH1] = useState('')
	const [product, setProduct] = useState({})
	const [imgArr, setImgArr] = useState([])
	const [review, setReview] = useState('')
	const { addList } = useCookieList(null)




	// useEffect(() => {
	// 	axios.get(`https://dummyjson.com/products/${id}`)
	// 		.then(data => {
	// 			setProduct(data.data)
	// 			setEditH1(data.data.title)
	// 			dataProducts.setDataOneProduct(data.data)
	// 			declOfNum(5, ['отзывов', 'отзыва', 'отзыв'])
	// 			setImgArr(data.data.images.map(el => {
	// 				return { original: el, thumbnail: el }
	// 			}))
	// 		})
	// }, [id])

	useEffect(() => {
		fetchOneProduct(id)
			.then(data => {
				setProduct(data)
				setEditH1(data.name)
				dataProducts.setDataOneProduct(data)
				console.log('--data', data)
				declOfNum(5, ['отзывов', 'отзыва', 'отзыв'])
				setImgArr(fuImg(data))

			})
	}, [])

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

	const clickScroll = () => {
		setTimeout(() => window.scrollBy({
			top: 800,
			left: 0,
			behavior: 'smooth',
		}), 150)
	}

	const goBack = () => navigate(-1)

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
					editable={isAdmin && {
						onChange: setEditH1,
						icon: <HighlightOutlined />,
					}}
					level={1}
					className=''
				>
					{editH1}
				</Typography.Title>

				<div className='flex w-1/4 justify-between'>
					<div className='flex'>
						<Rate allowHalf value={product.rating} disabled />
						<span className="mt-1.5 ml-3">
							<Badge style={{ backgroundColor: '#52c41aa8', }} count={product.rating} />
						</span>
					</div>
					<div>
						<p
							className='text-slate-400 mt-1.5 underline cursor-pointer'
							onClick={() => clickScroll()}
						>
							5 {review}
						</p>
					</div>
				</div>

				<Row gutter={[56, 56]}>
					<Col xl={14} className='mt-10'>
						<CourouselComp className='' imgArr={imgArr} />
					</Col>

					<Col xl={10} className='p-2 mt-10'>
						<div className='border-b pb-6'>
							<div className='flex justify-between'>
								<div>
									<p className='font-thin text-sm'>Артикул: {product.id}</p>
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
								{/* <FormRadioColor />
								<FormSizeBtn /> */}
								<p>{product.description}</p>
							</div>
						</div>
						<div className='border-b pb-6 pt-6'>
							<p className='text-base text-slate-700 font-light pb-2'>Цена:</p>
							<div className='flex justify-between'>
								<p className='text-3xl'>{product.price} BYN</p>
								<p className='text-[#00FF26] bg-[#ff0084]  py-2 px-3'>скидка на бокс: {product.discountPercentage ? product.discountPercentage : ''}%</p>
							</div>
							<div
								className='flex justify-between mt-8'
							>
								<Button
									type="primary"
									shape="round"
									size={'large'}
									block
									className='mr-4'
								>
									В корзину
								</Button>
								<Button type="primary" ghost shape="round" size={'large'} block>Заказать в один клик</Button>
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

				<div className='mt-28' />
				<PohozhieTovary id={id} />
				<TabsPtoduct />
				<Content />
			</section>
		</>
	)
})

export default ProductPage