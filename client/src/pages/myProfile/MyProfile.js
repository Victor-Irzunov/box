import React, { useContext, useEffect, useState } from 'react'
import { Typography, Empty, Spin } from 'antd'
import { Context } from '../../App'
import { getMyAccount } from '../../http/userAPI'
import DescriptionsCompUserData from '../../components/descriptionsMyProfile/DescriptionsCompUserData'

const { Title } = Typography

function MyProfile() {
	const { user } = useContext(Context)
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

	// <Result
					// 	icon={<MehOutlined style={{ color: '#ff0084' }} />}
					// 	title="Страница только для зарегистрированных пользователей или пользователей, которые сделали покупку в нашем магазине."
					// 	extra={
					// 		<Link to='/' className='text-[#ff0084]'>перейти на главную</Link>
					// 	}
					//  /> 