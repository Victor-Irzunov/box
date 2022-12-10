import { Divider, Button } from 'antd'
import React, { useState } from 'react'
import CarouselCard from '../carouselCard/CarouselCard'
import DrawerModal from '../drawerModal/DrawerModal'


const MainCard = () => {
	const [open, setOpen] = useState(false)
	const showDrawer = () => {
		setOpen(true)
	}
	return (
		<div className="site-card-wrapper relative">
			<Divider orientation="left" style={{ fontSize: '2em', color: '#ccc' }} className=''>Новинки</Divider>
			<CarouselCard />
		</div>
	)
}
export default MainCard