import { Divider } from 'antd'
import React from 'react'
import CarouselCard from '../carouselCard/CarouselCard'
const MainCard = ({cardItem}) => {
	return (
		<div className="site-card-wrapper relative mt-20">
			<Divider orientation="left" style={{ fontSize: '1.8em', color: '#ccc' }} className=''>Новинки</Divider>
			<CarouselCard cardItem={cardItem} />
		</div>
	)
}
export default MainCard