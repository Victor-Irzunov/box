import React from 'react'
// import logo from './img/logo.png'
// import { useLocation } from 'react-router-dom'
import HeaderLinks from './headerLinks/HeaderLinks'
import HeaderTimeTel from './headerTimeTel.js/HeaderTimeTel'
// import { Space, Row, Col } from 'antd'
// import {
// 	UserOutlined,
// } from '@ant-design/icons'


function HeaderAddress() {

	// const location = useLocation()
	// let isPath = location.pathname === '/'


	return (
		<section className='pt-1 pb-1 font-light'>
			<div className='container'>
				<div className='flex justify-between items-center'>
					<div className=''>
						<HeaderLinks />
					</div>
					<div className=''>
						<HeaderTimeTel />
					</div>
				</div>
			</div >
		</section >
	)
}

export default HeaderAddress