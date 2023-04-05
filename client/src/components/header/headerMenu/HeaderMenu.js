
import { Menu } from 'antd';
import React, { useState, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom'
// import logo from '../../../images/logo/logo3.webp'
import logo from '../../../images/logo/logo5.png'
import { Context } from '../../../App'
const HeaderMenu = () => {
	const { dataApp } = useContext(Context)
	const [current, setCurrent] = useState('main')
	const onClick = e => { setCurrent(e.key) }
	 const items = [
		{
			label: (
				<NavLink to="/">
					<img src={logo} alt='логотип компании' className='inline w-36' />
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
				// theme='dark'
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
