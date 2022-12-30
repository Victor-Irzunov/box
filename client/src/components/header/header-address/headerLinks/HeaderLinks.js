import React, { useContext } from 'react'
import { Divider, Space } from 'antd'
import { Link } from 'react-router-dom'
import { Context } from '../../../../App'

function HeaderLinks() {
	const { dataApp } = useContext(Context)
	return (
		<Space split={<Divider type="vertical" />}>
			{dataApp.infoPages.length && dataApp.infoPages.map(el => {
				return (
						<Link to={{
						pathname: `/info/${el.link}`
					}}
						state={{ id: el.id }}
					>
						{el.name}
					</Link>
				)
			})}
		</Space>
	)
}

export default HeaderLinks