import { Button, Modal, Space, Image } from 'antd'
import React from 'react'
import {
	ArrowLeftOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import { useScreens } from '../../Constants/constants'


const ModalCookies = ({ setIsModalOpen, isModalOpen, data, btnText }) => {
	const cyrillicToTranslit = new CyrillicToTranslit()
	const screens = useScreens()
	const handleOk = () => {
		setIsModalOpen(false)
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}
	


	return (
		<Modal
			title={<p className='text-2xl'>Товар добавлен в корзину</p>}
			open={isModalOpen}
			onOk={handleOk}
			onCancel={handleCancel}
			footer={[
				<div className='w-full flex justify-between'>
					<Button
						key="back"
						onClick={handleCancel}
						shape="round"
						icon={<ArrowLeftOutlined />}
						size={screens.xs ? 'middle': 'large'}
					>
						{btnText ?'Продолжить':'Продолжить покупки'}
					</Button>
					<Link to={`/${cyrillicToTranslit.transform('корзина')}`}>
						<Button
							onClick={handleOk}
							shape="round"
							type='primary'
							size={screens.xs ? 'middle': 'large'}
						>
							Оформить заказ
						</Button>
					</Link>
				</div>
			]}
		>
			<div className='flex justify-between'>

				<div className='flex border-r'>
					<Image
						preview={false}
						width={100}
						src={Object.keys(data).length && process.env.REACT_APP_API_URL + JSON.parse(data.img)[0].image} />
					<div className='ml-5'>
						<p className='text-lg'>{data.name}</p>
						<p className='text-xs text-slate-400 font-light'>Артикул: {data.id}</p>
					</div>
				</div>
				<p className='text-xl xs:text-sm ml-2 xs:text-center'>{data.price} <span className='xs:text-base xx:text-base'>BYN</span></p>
			</div>

		</Modal>

	)
}
export default ModalCookies