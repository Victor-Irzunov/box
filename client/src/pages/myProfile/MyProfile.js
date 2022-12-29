import React, {  useEffect, useState } from 'react'
import { Typography, Empty, Spin } from 'antd'
import { getMyAccount } from '../../http/userAPI'
import DescriptionsCompUserData from '../../components/descriptionsMyProfile/DescriptionsCompUserData'
const { Title } = Typography

function MyProfile() {
	const [data, setData] = useState({})
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		getMyAccount()
			.then(data => {
				console.log('getMyAccount: ', data)
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