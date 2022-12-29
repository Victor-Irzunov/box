import React from 'react'
import { Card, Space, Button, Image } from 'antd'
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
			"absolute sm:top-56 ss:top-56 xm:top-48 xs:top-32 xx:top-56 xy:top-56 right-2"
			: 'absolute sm:top-72 xm:top-52 xs:top-44 xx:top-72 xy:top-72 right-2'}
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
		breakpoint: { max: 464, min: 0 },
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
		 sm:h-80 xm:h-64 xs:h-52 xx:h-80 xy:h-80
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
								<Space>
									<Image src={process.env.REACT_APP_API_URL + JSON.parse(el.imgMini)[0].image} />
									<div>
										<Link to={{
											pathname: `/${el.categories[0].link}/${el.types[0].link}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`,
										}}
											state={{ id: el.id, location: location.pathname }}
											onClick={scrollToTop}
										>
											{el.name}
											<Button type='text'
												className='pl-0'
												
											>
												Посмотреть{' '}
												<ArrowRightOutlined />
											</Button>
										</Link>
										<p className='text-right mr-4'>{el.price} BYN</p>
									</div>
								</Space>
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
									border: '1px solid #ddd'
								}}

							>
								<Space>
									<Image src={process.env.REACT_APP_API_URL + JSON.parse(el.imgMini)[0].image} />
									<div>


										<Link to={{
											pathname: `/${el.categories[0].link}/${el.types[0].link}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`,
										}}
											state={{ id: el.id, location: location.pathname }}
										>
											{el.name}
											<Button type='text' className='pl-0'>
												Посмотреть{' '}
												<ArrowRightOutlined />
											</Button>
										</Link>
									</div>
								</Space>
							</Card>
						)
					})
				}

			</Carousel>
		</div>
	)
}

export default CarouselCard