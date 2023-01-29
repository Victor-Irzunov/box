import { Divider } from 'antd'
import React from 'react'
import CarouselCard from '../carouselCard/CarouselCard'
const MainCard = ({ cardItem }) => {
	return (
		<div className="site-card-wrapper relative mt-20">
			<Divider
				orientation="left"
				style={{ fontSize: '2.2em', color: '#5d5959' }}
				className=''
			>
				Новое поступление
			</Divider>
			<CarouselCard cardItem={cardItem} />
		</div>
	)
}
export default MainCard