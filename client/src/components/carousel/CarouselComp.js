import { Carousel } from 'antd'
import React from 'react'
const CarouselComp = ({ imgData }) => {
	return (
		<div className='mt-5'>

			<Carousel autoplay className='' dots={false}>
				{imgData.map(el => {
					return (
						<div key={el.id} className='' >
							<img
								src={process.env.REACT_APP_API_URL + el.img}
								alt='изображение'
							/>
						</div>
					)
				})}
			</Carousel>


		</div>
	)
}
export default CarouselComp