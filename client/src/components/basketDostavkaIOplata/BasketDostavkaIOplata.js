import React from 'react'
import FormBasketOrder from '../formsBasket/FormBasketOrder'
import { Row, Col } from 'antd'
import BasketCard from '../basketCard/BasketCard'

function BasketDostavkaIOplata({ next, data }) {
	return (
		<div className='pt-12'>
			<p className='text-center mb-6 text-xl'>Данные для оформления заказа</p>
			<Row gutter={[10,10]}>

				<Col xl={10}>
					<FormBasketOrder next={next} />
				</Col>


				<Col xl={14}>
					<BasketCard data={data} />
				</Col>
			</Row>
		</div>
	)
}

export default BasketDostavkaIOplata