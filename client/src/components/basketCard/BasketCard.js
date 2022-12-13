import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Image, Button, Empty, Typography, Divider } from 'antd'
import { MinusOutlined, PlusOutlined, CloseOutlined } from '@ant-design/icons'
import { Context } from '../../App'
import { useCookieList } from '../../hooks/useCookieList'
import ProductPage from '../../pages/productPage/ProductPage'

const ButtonGroup = Button.Group
const { Text } = Typography


const BasketCard = observer(({ data }) => {
	const { dataApp, dataProducts } = useContext(Context)
	const { addList, minusList, deleteOneList } = useCookieList(null)
	const [totalWithoutDiscount, setTotalWithoutDiscount] = useState(0)
	const [totalDiscount, setTotalDiscount] = useState(0)
	const [total, setTotal] = useState(0)
	
	const [isUpload, setUpload] = useState(false)

	// console.log('data: ', data)

	useEffect(() => {
		let totalCost = 0
		let discount = 0
		const sendData = []
		if (data.length > 0) {
			data.forEach(el => {
				dataApp.basketArr.forEach(elem => {
					if (el.id === elem.id) {
						totalCost += el.price * elem.count
						if (el.discountPercentage) {
							discount += +(el.price * elem.count) * el.discountPercentage / 100
						}
						sendData.push({ poductId: el.id, count: elem.count })
					}
				}
				)
			})
			let total = totalCost - discount
			setTotalWithoutDiscount((totalCost.toFixed(2)))
			setTotalDiscount((discount).toFixed(2))
			setTotal((total).toFixed(2))
			dataProducts.setSendData(sendData)
		}
	}, [data.length, isUpload])

	const addBasket = id => {
		if (!dataApp.isAuth) {
			addList('BasketProduct', id)
			setUpload(i => !i)
		}
	}
	const minusBasket = id => {
		if (!dataApp.isAuth) {
			minusList('BasketProduct', id)
			setUpload(i => !i)
		}
	}
	const deleteBasket = id => {
		if (!dataApp.isAuth) {
			deleteOneList('BasketProduct', id)
			setUpload(i => !i)
		}
	}

	return (
		<div className='p-2 mt-10'>
			{data.length ?
				data.map((el, idx) => {
					let count
					if (dataApp.basketLength) {
						count = dataApp.basketArr[idx]?.count
					}

					return (
						<div key={el.id} className='mb-4 flex justify-between bg-white border'>
							<div className='p-2'>
								<div className='flex'>
									<Image
										preview={false}
										width={130}
										src={process.env.REACT_APP_API_URL + JSON.parse(el.img)[0].image} />
									<div className='ml-5'>
										<p className='text-lg'>{el.name}</p>
										<p className='text-xs text-slate-400 font-light'>Артикул: {el.id}</p>
									</div>
								</div>
							</div>
							<div className='flex justify-center items-center'>
								<ButtonGroup>
									<Button
										onClick={() => minusBasket(el.id)}
										size='large'
										disabled={count === 1}
									>
										<MinusOutlined />
									</Button>
									<Button
										size='large'

									>
										{count}
									</Button>

									<Button
										onClick={() => addBasket(el.id)}
										size='large'
									>
										<PlusOutlined />
									</Button>
								</ButtonGroup>
							</div>
							<div className='border-l w-44 flex items-center px-5 bg-gray-100 relative'>
								<div className=''>
									<p className='font-extralight'>Цена:</p>
									<p className='text-2xl mt-2'>{(el.price * count).toFixed(2)} <span className='text-xl font-light'>BYN</span></p>
								</div>
								<Button
									onClick={() => deleteBasket(el.id)}
									className='absolute top-0 right-0'
									icon={<CloseOutlined className='text-red-500' />}
								/>
							</div>
						</div>
					)
				})
				:
				<div className='w-full'>
					<Empty />
				</div>
			}
			<div className={`mb-6 w-full flex flex-col items-end mt-20 ${!data.length && 'hidden'}`}>
				<p className='text-base'>Общая стоимость:</p>
				<span className='text-lg font-light mb-3'>{totalWithoutDiscount} <span className='text-base font-light'>BYN</span></span>
				<Text>Cумма скидки:</Text>
				<Text>{totalDiscount} BYN</Text>
				<p className='text-xl mt-5'>Итоговая стоимость:</p>
				<span className='text-2xl font-light'>{total} <span className='text-xl font-light'>BYN</span></span>
			</div>
		</div>

	)
})

export default BasketCard