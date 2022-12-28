import { Divider, Button } from 'antd'
import React, { useState } from 'react'
import CarouselCard from '../carouselCard/CarouselCard'
import DrawerModal from '../drawerModal/DrawerModal'


const MainCard = ({cardItem}) => {
	const [open, setOpen] = useState(false)
	const showDrawer = () => {
		setOpen(true)
	}
	return (
		<div className="site-card-wrapper relative mt-20">
			<Divider orientation="left" style={{ fontSize: '1.8em', color: '#ccc' }} className=''>Новинки</Divider>
			<CarouselCard cardItem={cardItem} />
		</div>
	)
}
export default MainCard