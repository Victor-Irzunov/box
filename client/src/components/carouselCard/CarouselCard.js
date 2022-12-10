import React from 'react'
import { Card, Space, Button, Image } from 'antd'
import { cardItem } from '../../content/Content'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
	ArrowRightOutlined,
	ArrowLeftOutlined,
} from '@ant-design/icons'

const ButtonGroup = ({ next, previous, ...rest }) => {
	const { carouselState: { currentSlide } } = rest
	return (
		<div className="absolute top-56 right-10">
			<Button className={currentSlide === 0 ? 'disable' : ''} onClick={() => previous()} ><ArrowLeftOutlined /> Назад</Button>
			<Button onClick={() => next()} >Вперед <ArrowRightOutlined /></Button>
		</div>
	);
};
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
const CarouselCard = ({ product }) => {

	return (
		<div className='overflow-hidden h-64'>
			<Carousel
				arrows={false}
				customButtonGroup={<ButtonGroup />}
				responsive={responsive}
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
									height: '200px',
									marginRight: '1em',
									overflow: 'hidden'
								}}>
								<Space>
									<Image src={process.env.REACT_APP_API_URL + JSON.parse(el.imgMini)[0].image} style={{ width: '250px' }} />
									<div>
										{el.name}
										{/* {el.btn} */}
										<Button></Button>
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
									border:'1px solid #ff0084'
								}}

							>
								<Space>
								<Image src={el.image} className='' />
									<div>
										{el.title}
										<Button type='link' href={el.link} className='pl-0'>
											Посмотреть{' '}
											<ArrowRightOutlined />
										</Button>
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