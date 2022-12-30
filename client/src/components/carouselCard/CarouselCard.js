import React from 'react'
import { Card, Rate, Button, Image } from 'antd'
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
		<div className={!product
			?
			"absolute sm:top-56 ss:top-56 xm:top-64 xs:top-60 xx:top-56 xy:top-56 right-2"
			: 'absolute sm:top-72 xm:top-64 xs:top-64 xx:top-72 xy:top-56 right-2'}
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
		items: 5
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 3
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2
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
		<div className='overflow-hidden
		 sm:h-80 xm:h-72 xs:h-72 xx:h-80 xy:h-72
		 mb-20
		 '>
			<Carousel
				arrows={false}
				customButtonGroup={<ButtonGroup product={product} />}
				responsive={responsive}
				className='relative'
			>
				{product ?
					product.map((el) => {
						return (
							<Card
								hoverable={true}
								key={el.id}
								style={{
									marginRight: '1em',
									overflow: 'hidden',
								}}
								className='border-[#d8d6d7]'
							>
								<div className='flex'>
									<Image src={process.env.REACT_APP_API_URL + JSON.parse(el.imgMini)[0].image} />
									<div className='w-9/12 p-2'>
										<Link to={{
											pathname: `/${el.categories[0].link}/${el.types[0].link}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`,
										}}
											state={{ id: el.id, location: location.pathname }}
											onClick={scrollToTop}
										>
											<p className='font-semibold text-lg xm:text-base'>{el.name}</p>
											<Button type='text'
												 className='absolute bottom-4 right-0'
											>
												Посмотреть{' '}
												<ArrowRightOutlined />
											</Button>
										</Link>
										<Rate allowHalf defaultValue={el.rating} disabled />
										<p className='mr-2 mt-2'>Цена: {el.price} BYN</p>
									</div>
								</div>
							</Card>
						)
					})
					:
					cardItem.map(el => {
						return (
							<Card
								bordered={false}
								key={el.id}
								hoverable={true}
								style={{
									background: '#fff',
									marginLeft: '0.5em',
									marginRight: '0.5em',
									overflow: 'hidden',
									border: '1px solid #ddd',
									position: 'relative'
								}}
							>
								<div className='flex'>
									<Image src={process.env.REACT_APP_API_URL + JSON.parse(el.imgMini)[0].image} />
									<div className='w-9/12 p-2'>
										<Link to={{
											pathname: `/${el.categories[0].link}/${el.types[0].link}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`,
										}}
											state={{ id: el.id, location: location.pathname }}
										>
											<p className='font-semibold text-lg xm:text-base'>{el.name}</p>
											<Button type='text' className='absolute bottom-4 right-0'>
												Посмотреть{' '}
												<ArrowRightOutlined />
											</Button>
										</Link>
										<Rate allowHalf defaultValue={el.rating} disabled />
										<p className='mr-2 mt-2'>Цена: {el.price} BYN</p>
									</div>
								</div>
							</Card>
						)
					})
				}
			</Carousel>
		</div>
	)
}

export default CarouselCard