
import { Menu } from 'antd';
import React, { useState, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
import logo from '../../../images/logo/logo3.webp'
import { Context } from '../../../App'
// import { useScreens } from '../../../Constants/constants'


const HeaderMenu = () => {
	const { dataApp } = useContext(Context)
	const [current, setCurrent] = useState('main')
	// const screens = useScreens()
	const onClick = e => { setCurrent(e.key) }


	 const items = [
		{
			label: (
				<NavLink to="/">
					<img src={logo} className='inline w-36' />
				</NavLink>),
			key: 'main'
		},
	]
	dataApp.dataMenu.forEach(el => {
		const type = []
		el.types.forEach((elem) => {
			type.push({
				label: (
					<Link to={`/${el.link}/${elem.link}`} >
						{elem.name}
					</Link>
				),
				key: elem.link + el.id
			})
		})
		items.push({
			label: (<NavLink to={`/${el.link}`} className='text-white' >
				{el.name}
			</NavLink>),
			key: el.link + el.id,
			children: type
		})
	})

	return (
		<div
			style={{ position: 'relative' }}
		>
			<Menu
				onClick={onClick}
				selectedKeys={[current]}
				mode="horizontal"
				
				items={items}
				style={{
					background: 'transparent',
					color: '#fff',
				}}
			/>
		</div>
	)
}
export default HeaderMenu
