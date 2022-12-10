import React from 'react'
import { Space, Input, Button, Row, Col, Form } from 'antd'
import FormSubscripMain from '../forms/formSubscripMain/FormSubscripMain'

function SubscriptionMain() {
	return (
		<Row gutter={{ xs: 8, sm: 16, md: 24 }} justify='space-between' className='mt-14 pb-10'>

			<Col xl={12}>
				<p className='text-2xl'>Будьте в курсе всегда!</p>
				<p className='text-gray-500'>Подпишитесь на рассылку и узнавайте первым о новых акциях и новых поступлениях магазина!</p>
			</Col>
			<Col xl={12}>
				<FormSubscripMain />
			</Col>
		</Row>
	)
}

export default SubscriptionMain