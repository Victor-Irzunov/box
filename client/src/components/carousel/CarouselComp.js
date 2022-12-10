import { Carousel } from 'antd'
import React from 'react'
import { itemCarousel } from '../../content/Content'
import UploadImg from '../carousel/uploadImg/UploadImg'
// import { cardItem } from '../../content/Content'



const CarouselComp = () => {
	return (
		<div className='mt-5'>
			<Carousel autoplay>
				{itemCarousel.map(el => {
					return (
						<div key={el.id} className='w-full relative'>
							<img
								style={{ width: '100%' }}
								src={el.box}
							/>
							{/* <UploadImg id={el.id} /> */}
						</div>
					)
				})}
			</Carousel>
		</div>
	)
}
export default CarouselComp