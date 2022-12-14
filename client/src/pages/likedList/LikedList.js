import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, Typography, Button, message, Empty, BackTop } from 'antd'
import CardComp from '../../components/Card/CardComp'
import { ClearOutlined } from '@ant-design/icons'
import { Context } from '../../App'
import { fetchProductNoUser } from '../../http/productsAPI'
import {useLocation} from 'react-router-dom'
import { useCookieList } from '../../hooks/useCookieList'
import { observer } from "mobx-react-lite"
import { Helmet } from "react-helmet"
const { Title } = Typography
const LikedList = observer(() => {
	const { dataApp } = useContext(Context)
	let location = useLocation()
	const { deleteAllList, deleteOneList } = useCookieList(null)
	const [itemCard, setItemCard] = useState([])
	useEffect(() => {
		if (dataApp.likedLength) {
			fetchProductNoUser(dataApp.likedArr)
			.then(data => {
				if (Array.isArray(data)) {
					setItemCard(data)
				} else {
					message.success(data.message)
				}
			})
		} else {
			setItemCard([])
			message.success('Тут пусто')
		}
	}, [dataApp.likedLength, dataApp.likedArr])

	function clearAllList() {
		deleteAllList('LikedList')
		setItemCard([])
	}
	function deleteOneElCookies(id) {
		deleteOneList('LikedList', id)
	}
	return (
		<section className='container pt-9 pb-12'>
			<Helmet>
				<title>Понравившиеся товары</title>
				<meta name="description" content='Понравившиеся товары' />
			</Helmet>
			<Title>Понравившиеся товары</Title>
			<BackTop />
			{itemCard.length ?
				<div className='w-full flex justify-end mb-3'>
					<Button
						type='text' danger
						onClick={() => clearAllList()}
					>
						<ClearOutlined />
						Очистить список
					</Button>
				</div>
				:
				<Empty />
			}
			<Row>
				<Col xl={24}>
					<CardComp itemCard={itemCard} location={location} likedList={true} deleteOneElCookies={deleteOneElCookies} />
				</Col>
			</Row>
		</section>
	)
})
export default LikedList