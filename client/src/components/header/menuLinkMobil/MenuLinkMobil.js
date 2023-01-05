import { Menu } from 'antd'
import React, { useState, useContext } from 'react'
import { Context } from '../../../App'
import { Link } from 'react-router-dom'
const MenuLinkMobil = ({ setIsActiveMenu }) => {
	const { dataApp } = useContext(Context)
	const [current] = useState('1')
	const items = []
	dataApp.infoPages.forEach(el => {
		items.push(
			{
				label: (
					<Link to={{
						pathname: `/info/${el.link}`
					}}
						state={{ id: el.id }}
						onClick={() => setIsActiveMenu(i => !i)}
					>
						{el.name}
					</Link>),
			},
		)
	})
	return (
		<Menu
			style={{
				background: 'transparent',
				color: '#fff',
			}}
			triggerSubMenuAction='click'
			selectedKeys={[current]}
			mode="inline"
			items={items}
		/>
	)
}
export default MenuLinkMobil