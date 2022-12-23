import { Badge } from 'antd'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Svg from '../../images/menuIcon/Svg.js'
import { Context } from '../../App.js'
import { observer } from "mobx-react-lite"

const BadgeIconBasked = observer(({ mobil }) => {
	const { dataApp } = useContext(Context)

	return (
		mobil ?
			<div
				className='cursor-pointer ml-3'
			>
				<Badge count={dataApp.basketLength} size="small" showZero>
					<Link to='/korzina'>
						<Svg />
					</Link>
				</Badge>

			</div>
			:
			<div
				className='absolute top-5 right-36 md:right-24 sm:right-12 cursor-pointer'
			>
				<Badge count={dataApp.basketLength} size="small" showZero>
					<Link to='/korzina'>
						<Svg />
					</Link>
				</Badge>

			</div>
	)
})
export default BadgeIconBasked