import React from 'react'
import { Divider, Space, Typography } from 'antd'
import { Link as LinkDom } from 'react-router-dom'

function HeaderLinks() {
	return (
		<Space split={<Divider type="vertical" />}>
				<LinkDom to=''>Оплата и доставка</LinkDom>
				<LinkDom to=''>Кредит</LinkDom>
				<LinkDom to=''>Рассрочка</LinkDom>
				<LinkDom to=''>Возврат</LinkDom>
				<LinkDom to=''>Гарантия</LinkDom>
		</Space>
	)
}

export default HeaderLinks