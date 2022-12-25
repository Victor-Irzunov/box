import { Menu } from 'antd'
import React, { useState, useContext } from 'react'
import { Context } from '../../../App'
import { NavLink, Link } from 'react-router-dom'

const MenuMobil = ({setIsActiveMenu}) => {
	const { dataApp } = useContext(Context)
	const [current, setCurrent] = useState('1')
	const onClick = (e) => {
		setCurrent(e.key)
	}

	const items = [
		{
			label: (
				<NavLink to="/" className='' onClick={()=>setIsActiveMenu(i=>!i)}>
					Главная
				</NavLink>),
			key: 'main',
		},
	]
	dataApp.dataMenu.forEach(el => {
		const type = []
		el.types.forEach((elem, idx) => {
			type.push({
				label: (
					<NavLink
						to={`/${el.link}/${elem.link}`}
						onClick={()=>setIsActiveMenu(i=>!i)}
					>
						{elem.name}
					</NavLink>
				),
				key: elem.link + el.id
			})
		})
		items.push({
			label: (<NavLink
				to={`/${el.link}`}
				className='text-white'
				onClick={()=>setIsActiveMenu(i=>!i)}
			>
				{el.name}
			</NavLink>),
			key: el.link + el.id,
			children: type
		})
	})



	return (
		<Menu
			style={{
				background: 'transparent',
				color: '#fff',
				paddingBottom: '1em'
			}}
			selectedKeys={[current]}
			mode="inline"
			triggerSubMenuAction='click'
			items={items}
		/>
	)
}
export default MenuMobil