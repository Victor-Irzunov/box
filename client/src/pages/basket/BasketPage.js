import React, { useState, useContext, useEffect } from 'react'
import { Button, Typography, message } from 'antd'
import BasketSteps from '../../components/basketSteps/BasketSteps'
import ModalComponent from '../../components/modalLoginRegistrat/ModalComponent'
import { Context } from '../../App'
import { observer } from "mobx-react-lite"
import { fetchProductBasketNoUser } from '../../http/productsAPI'

const { Title } = Typography

const BasketPage = observer(() => {
	const { dataApp, dataProducts } = useContext(Context)
	const [open, setOpen] = useState(false)
	const [data, setData] = useState([])


	useEffect(() => {
		fetchProductBasketNoUser(dataApp.basketArr)
			.then(data => {
				// console.log('BasketPage data:', data)
				if (!!data.length) {
					setData(data)
				} else {
					message.warning('Корзина пуста')
				}
			})
			.catch(data => {
				setData([])
				message.success('Корзина пуста')
		})
	}, [dataApp.basketLength, dataApp.basketArr])



	return (
		<section className='container min-h-screen flex flex-col justify-evenly pb-10 pt-10 '>
			<Title>Моя корзина</Title>

			<BasketSteps data={data} />





			<div>
				<span>Рекомендуем войти в&nbsp;
					<Button
						type='text'
						onClick={() => setOpen(true)}
						className='p-0 text-[#1d4ed8]'
					>
						Личный кабинет
					</Button>
					&nbsp;или&nbsp;
					<Button
						type='text'
						onClick={() => {
							setOpen(true)
						}}
						className='p-0 text-[#1d4ed8]'
					>
						Зарегистрироваться
					</Button>
				</span>


			</div>
			<ModalComponent setOpen={setOpen} open={open} />
		</section>
	)
})

export default BasketPage