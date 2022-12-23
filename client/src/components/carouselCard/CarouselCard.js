import React from 'react'
import { Card, Space, Button, Image } from 'antd'
// import { cardItem } from '../../content/Content'
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
			"absolute sm:top-56 xs:top-28 xx:top-56 right-2"
			: 'absolute sm:top-72 xs:top-36 xx:top-64 xy:top-56 right-2'}
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

	return (
		<div className='overflow-hidden sm:h-80 xs:h-44 xx:h-72 xy:h-64'>
			<Carousel
				arrows={false}
				customButtonGroup={<ButtonGroup product={product} />}
				responsive={responsive}
			// className='h-auto'
			>
				{product ?
					product.map((el) => {
						return (
							<Card
								bordered={false}
								hoverable={true}
								key={el.id}
								style={{
									background: '#efefef',
									marginRight: '1em',
									overflow: 'hidden'
								}}>
								<Space>
									<Image src={process.env.REACT_APP_API_URL + JSON.parse(el.imgMini)[0].image} />
									<div>
										<Link to={{
											pathname: `/${el.categories[0].link}/${el.types[0].link}/${cyrillicToTranslit.transform(el.name.split(' ').join('-'))}`,
										}}
											state={{ id: el.id, location: location.pathname }}
										>
											{el.name}
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
									// background: '#eed7e5',
									// height: '220px',
									marginLeft: '0.5em',
									marginRight: '0.5em',
									overflow: 'hidden',
									border: '1px solid #ff0084'
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