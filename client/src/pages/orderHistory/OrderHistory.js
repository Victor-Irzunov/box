import React, { useState } from 'react'
import { Typography, Empty, Spin } from 'antd'
import { useEffect } from 'react'
import { getAllOrderUser } from '../../http/orderAPI'
import { Helmet } from "react-helmet"
import DescriptionHistoryOrder from '../../components/descriptionsHistoryOrder/DescriptionHistoryOrder'
const { Title } = Typography
function OrderHistory() {
	const [data, setData] = useState({})
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		getAllOrderUser()
			.then(data => {
				setData(data)
				setLoading(false)
			})
	}, [])
	if (loading) {
		return <Spin />
	}
	return (
		<section className='container pt-5 pb-20'>
			<Helmet>
				<title>История заказов</title>
				<meta name="description" content='История заказов' />
			</Helmet>
			<div>
				<Title>История заказов</Title>
				{data && Object.keys(data).length ?
					<DescriptionHistoryOrder data={data} />
					:
					<Empty />
				}
			</div>
		</section>
	)
}
export default OrderHistory