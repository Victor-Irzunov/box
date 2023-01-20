import React from 'react'
import { Card, Rate, Button, Image, Badge } from 'antd'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
	ArrowRightOutlined,
	ArrowLeftOutlined,
} from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
const ButtonGroup = ({ next, previous, product, ...rest }) => {
	const { carouselState: { currentSlide } } = rest
	return (
		<div
			className='absolute -bottom-12 right-2'
		>
			<Button className={currentSlide === 0 ? 'disable' : ''}
				onClick={() => previous()} >
				<ArrowLeftOutlined />
				Назад
			</Button>
			<Button onClick={() => next()} >
				Вперед
				<ArrowRightOutlined />
			</Button>
		</div>
	)
}
const responsive = {
	superLargeDesktop: {
		breakpoint: { max: 4000, min: 3000 },
		items: 6
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 5
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 3
	},
	mobile: {
		breakpoint: { max: 620, min: 0 },
		items: 1
	}
}
const CarouselCard = ({ product, cardItem }) => {
	const cyrillicToTranslit = new CyrillicToTranslit()
	let location = useLocation()

	function scrollToTop() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	return (
		<div className='overflow-hidden relative py-14 px-1'>
			<Carousel
				arrows={false}
				customButtonGroup={<ButtonGroup product={product} />}
				responsive={responsive}
				className=''
			>
				{product ?
					product.map((el) => {
						return (
							<Badge.Ribbon key={el.id} text={`-${el.discountPercentage}%`}>
								<Card
									hoverable={true}
									
									style={{
										marginLeft: '1em',
										overflow: 'hidden',
									}}
									className='shadow-xl'
								>
									<div className=''>
										<div className='w-full min-h-[180px]'>
											<Image src={process.env.REACT_APP_API_URL + JSON.parse(el.img)[0].image}
												width='100%'
											/>
										</div>
										<div className='p-2'>
											{el.categories.length ?
												<Link to={{
													pathname: `/${el.categories[0].link}/${el.types[0].link}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`,
												}}
													state={{ id: el.id, location: location.pathname }}
													onClick={scrollToTop}
												>
													<p className='font-semibold text-lg xm:text-base'>{el.name}</p>
													<p className='text-xs xm:text-xs mb-1'>{el.description}</p>
													<div className='flex'>
														<Rate allowHalf value={el.rating} disabled />
														<span className="mt-1.5 ml-3">
															<Badge style={{ backgroundColor: '#52c41aa8', }} count={el.rating} />
														</span>
													</div>
													<div className='flex justify-between items-start mt-1'>
														<p className='text-xl font-semibold'>{(el.price - el.price * el.discountPercentage / 100).toFixed(2)} BYN</p>
														<div className='text-right'>
															<p className='uppercase text-base font-extralight line-through decoration-from-font'>{(el.price).toFixed(2)} BYN</p>
															<p className='font-extralight text-xs'>скидка {el.discountPercentage}%</p>
														</div>
													</div>

												</Link>
												:
												undefined
											}

										</div>
									</div>
								</Card>
							</Badge.Ribbon>
						)
					})
					:
					cardItem.map(el => {
						return (
							<Badge.Ribbon key={el.id} text="New">
								<Card
									bordered={false}
									
									hoverable={true}
									style={{
										background: '#fff',
										marginLeft: '1em',
										overflow: 'hidden',
									}}
									className='shadow-xl'
								>
									<div className=''>
										<div className='w-full min-h-[180px]'>
											<Image src={process.env.REACT_APP_API_URL + JSON.parse(el.img)[0].image}

											/>
										</div>

										<div className='p-4'>
											{el.categories.length ?
												<Link to={{
													pathname: `/${el.categories[0].link}/${el.types[0].link}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`,
												}}
													state={{ id: el.id, location: location.pathname }}
												>
													<p className='font-semibold text-lg xm:text-base mb-2'>{el.name}</p>
													<p className='text-xs xm:text-xs mb-2'>{el.description}</p>
													<div className='flex'>
														<Rate allowHalf value={el.rating} disabled />
														<span className="mt-1.5 ml-3">
															<Badge style={{ backgroundColor: '#52c41aa8', }} count={el.rating} />
														</span>
													</div>
													<p className='mt-4 text-xl font-semibold'>{el.price} BYN</p>
												</Link>
												:
												undefined
											}
										</div>
									</div>
								</Card>
							</Badge.Ribbon>
						)
					})
				}
			</Carousel>
		</div>
	)
}
export default CarouselCard