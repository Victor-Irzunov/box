import React, { useEffect, useState } from 'react'
import FormInfo from './FormInfo'
import { Button, message } from 'antd'
import { fetchInfo, fetchInfoTitle } from '../../../http/productsAPI'
import ListInfo from '../../listAdminInfo/ListInfo'

function Сharacteristic() {
	const [data, setData] = useState([])
	const [dataTitleInfo, setDataTitleInfo] = useState([])
	const [isActive, setIsActive] = useState(false)
	const [messages, setMessages] = useState(false)

	useEffect(() => {
		fetchInfo()
			.then(data => {
				setData(data)
			}).catch(error => {
				message.error(error)
			})
		fetchInfoTitle()
			.then(data=>setDataTitleInfo(data))
	}, [messages])

	return (
		<div>
			<p className='mb-4 text-base'>Добавить характеристики</p>
			<FormInfo data={data} setMessages={setMessages}  />
			<Button
				type='text'
				className='font-bold mb-8'
				onClick={() => setIsActive(i => !i)}
			>Смотреть описание</Button>
			<div>
				{isActive &&
					<ListInfo data={data} setMessages={setMessages} dataTitleInfo={dataTitleInfo} />
				}
			</div>
		</div>
	)
}

export default Сharacteristic