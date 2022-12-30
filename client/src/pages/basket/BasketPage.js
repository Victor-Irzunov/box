import React, { useState, useContext, useEffect } from 'react'
import { BackTop, Typography, message } from 'antd'
import BasketSteps from '../../components/basketSteps/BasketSteps'
import { Context } from '../../App'
import { observer } from "mobx-react-lite"
import { fetchProductNoUser } from '../../http/productsAPI'
import { getAllBasketUser } from '../../http/basketAPI'
// import { useScreens } from '../../Constants/constants'
const { Title } = Typography
const BasketPage = observer(() => {
	const { dataApp, dataProducts, user } = useContext(Context)
	const [data, setData] = useState([])
	// const screens = useScreens()
	useEffect(() => {
		if (!user.isAuth) {
			if (dataApp.basketLength) {
				fetchProductNoUser(dataApp.basketArr)
					.then(data => {
						if (!!data.length) {
							setData(data)
						} else {
							message.warning('Корзина пуста')
						}
					})
					.catch(() => {
						setData([])
						message.success('Корзина пуста')
					})
			} else {
				setData([])
				message.success('В корзине пусто')
			}
		} else {
			getAllBasketUser()
				.then(data => {
					if (data.length) {
						// dataApp.setBasketLength(data.length)
						const dataArr = []
						data.forEach(el => {
							dataArr.push({ ...el.product, countBasket: el.count })
						})
						// dataProducts.setDataBasket(dataArr)
						setData(dataArr)
					} else {
						message.warning('Пока в корзине пусто')
					}
				}
				)
		}
	}, [
		dataApp.basketLength,
		dataApp.basketArr,
		dataProducts.dataBasket
	])
	return (
		<section className='container min-h-screen flex flex-col justify-evenly pb-10 pt-10 '>
			<Title>Моя корзина</Title>
			<BackTop />
			<BasketSteps data={data} setData={setData} />
		</section>
	)
})
export default BasketPage