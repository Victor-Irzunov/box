import React, {  useEffect, useState } from 'react'
import { Typography, Empty, Spin } from 'antd'
import { getMyAccount } from '../../http/userAPI'
import DescriptionsCompUserData from '../../components/descriptionsMyProfile/DescriptionsCompUserData'
import { Helmet } from "react-helmet"
const { Title } = Typography

function MyProfile() {
	const [data, setData] = useState({})
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		getMyAccount()
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
				<title>Мой профиль</title>
				<meta name="description" content='Мой профиль' />
			</Helmet>
			<div>
				<Title>Мой профиль</Title>
				{Object.keys(data).length &&
					data.userData ?
					<DescriptionsCompUserData data={data} />
					:
					<Empty />
				}
			</div>
		</section>
	)
}
export default MyProfile