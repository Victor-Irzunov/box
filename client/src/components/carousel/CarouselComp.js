import { Carousel } from 'antd'
import React from 'react'
// import { useScreens } from '../../Constants/constants'


const CarouselComp = ({imgData}) => {
	// const screens = useScreens()
	
	return (
		<div className='mt-5'>
			<Carousel autoplay>
				{imgData.map(el => {
					return (
						<div key={el.id} className='w-full relative'>
							<img
								style={{ width: '100%' }}
								src={process.env.REACT_APP_API_URL + el.img}
							/>
						</div>
					)
				})}
			</Carousel>
		</div>
	)
}
export default CarouselComp