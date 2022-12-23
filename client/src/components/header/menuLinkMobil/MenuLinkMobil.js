import { Menu } from 'antd'
import React, { useState, useContext } from 'react'
import { Context } from '../../../App'
import { NavLink, Link } from 'react-router-dom'

const MenuLinkMobil = ({ setIsActiveMenu }) => {
	const { dataApp } = useContext(Context)
	const [current, setCurrent] = useState('1')
	const onClick = (e) => {
		setCurrent(e.key)
	}

	const items = [
		{
			label: (
				<NavLink to="/oplata"
					className=''
					onClick={() => setIsActiveMenu(i => !i)}
				>
					Оплата
				</NavLink>),
			key: 'oplata',
		},
		{
			label: (
				<NavLink to="/vozvrat"
					className=''
					onClick={() => setIsActiveMenu(i => !i)}
				>
					Доставка
				</NavLink>),
			key: 'dostavka',
		},
		{
			label: (
				<NavLink to="/vozvrat"
					className=''
					onClick={() => setIsActiveMenu(i => !i)}
				>
					Возврат
				</NavLink>),
			key: 'vozvrat',
		},
	]




	return (

		<Menu
			// onClick={onClick}
			style={{
				background: 'transparent',
				color: '#fff',
				// borderBottom: '1px solid #03030317',
				// paddingBottom: '1em'
			}}
			triggerSubMenuAction='click'
			selectedKeys={[current]}
			mode="inline"
			items={items}
		/>
	)
}
export default MenuLinkMobil