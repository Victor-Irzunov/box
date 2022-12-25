import React, { useContext, useState } from 'react'
import { Typography, Empty, Result, Spin } from 'antd'
import { Context } from '../../App'
import { Link } from 'react-router-dom'
import { MehOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { getAllOrderUser } from '../../http/orderAPI';
import DescriptionHistoryOrder from '../../components/descriptionsHistoryOrder/DescriptionHistoryOrder';

const { Title } = Typography

function OrderHistory() {
	const { user } = useContext(Context)
	const [data, setData] = useState({})
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		getAllOrderUser()
			.then(data => {
				console.log('data:', data)
				setData(data)
				setLoading(false)
			})
	}, [])

	if (loading) {
		return <Spin />
	}

	return (
		<section className='container pt-5 pb-20'>
			<div className=''>
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