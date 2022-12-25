import React, { useContext, useState } from 'react'
import { Button, Space, Typography, Popover } from 'antd'
import {
	HistoryOutlined,
	PhoneOutlined,
	UserOutlined,
} from '@ant-design/icons'
import { Context } from '../../../../App'
import ModalComponent from '../../../modalLoginRegistrat/ModalComponent'
import { Link } from 'react-router-dom'
import { observer } from "mobx-react-lite"
import { useScreens } from '../../../../Constants/constants'

export const ContentAdmin = () => {
	const { user } = useContext(Context)
	const exit = () => {
		localStorage.removeItem('token')
		user.setIsAuth(false)
		user.setUser(false)
	}
	return (
		<div>
			<p className='mb-2'>
				<Link to='/super-adminka'>Страница администратора</Link>
			</p>
			<hr />
			<p className='mt-2'>
				<Button
					type='text'
					className='p-0'
					onClick={exit}
				>Выход</Button>
			</p>
		</div>
	)
}

export const ContentCourier = () => {
	const { user } = useContext(Context)
	const exit = () => {
		localStorage.removeItem('token')
		user.setIsAuth(false)
		user.setUser(false)
	}
	return (
		<div>
			<p className='mb-2'>
				<Link to='/dlya-voditelya'>Страница курьера</Link>
			</p>
			<hr />
			<p className='mt-2'>
				<Button
					type='text'
					className='p-0'
					onClick={exit}
				>Выход</Button>
			</p>
		</div>
	)
}
export const Content = () => {
	const { user } = useContext(Context)
	const exit = () => {
		localStorage.removeItem('token')
		user.setIsAuth(false)
		user.setUser(false)
	}

	return (
		<div>
			<p className='mb-2'>
				<Link to='/moi-dannye'>Мой профиль</Link>
			</p>
			<p className='mb-2'>
				<Link to='/istoriya-zakazov'>История заказов</Link>
			</p>
			<p className='mb-2'>
				<Link to='/cpisok-sravneniya'>Список сравнения</Link>
			</p>
			<p className='mb-2'>
				<Link to='/spisok-ponravivshikhsya'>Избранные</Link>
			</p>
			<hr />
			<p className='mt-2'>
				<Button
					type='text'
					className='p-0'
					onClick={exit}
				>Выход</Button>
			</p>
		</div>
	)
}


const { Paragraph } = Typography

const HeaderTimeTel = observer(() => {
	const { user } = useContext(Context)
	const [open, setOpen] = useState(false)
	const screens = useScreens()



	const showModal = () => {
		setOpen(true)
	}
	return (

		<div
			className={`border-l pl-2 flex justify-between items-center w-full`}
		>

			<div className={`flex items-center`}>
				<HistoryOutlined className='text-base mr-3' />
				<div>
					<Paragraph
						editable={{
							triggerType: 'text'
						}}
					>
						08:30-20:00 пн-пт
					</Paragraph>
					<Paragraph
						editable={{
							triggerType: 'text'
						}}
					>
						10:00-19:00 сб-вс
					</Paragraph>
				</div>
			</div>



			<div
				className='ml-5 mr-5'
			>
				<Button type='link'
					className=''
					icon={<PhoneOutlined className='text-base' />} href='tel:80290000000'>
					+375 29 000-00-00
				</Button>
			</div>

			<div>
				{
					user.isAuth ?
						<Popover
							placement="bottomRight"
							content={user.userData.role === 'ADMIN' ? ContentAdmin : Content}
							trigger="click"
						>
							<Button
								className='text-base hover:text-blue-500'
								type='text'
								icon={<UserOutlined />}
							>
								{'Привет!'}{' '}
								{user.userData.role === 'ADMIN' && 'Админ'}
							</Button>
						</Popover>
						:
						<Button
							className='text-base hover:text-blue-500'
							type='text'
							icon={<UserOutlined />}
							onClick={showModal}
						>
							{'Личный кабинет'}
						</Button>
				}
			</div>


			<ModalComponent open={open} setOpen={setOpen} />
		</div>
	)
})

export default HeaderTimeTel