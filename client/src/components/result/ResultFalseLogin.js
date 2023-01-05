import React, {useState} from 'react'
import { Link ,useLocation } from 'react-router-dom'
import { Button, Result } from 'antd'
import ModalComponent from '../modalLoginRegistrat/ModalComponent'
const ResultFalseLogin = ({ title = 'У Вас нет доступа! Необходимо войти в систему.', subTitle = 'Хотите войти как администратор?', handleCancel }) => {
	const [open, setOpen] = useState(false)
	const location = useLocation()
	const fromPage = location?.state?.from.pathname || '/'
	return (
		<>
			<Result
				status="warning"
				title={title}
				subTitle={subTitle}
				extra={[
					<Link to='/' key={1} onClick={handleCancel} className='text-blue-600 mr-3'>
						На главную
					</Link>,
					<Button onClick={() => setOpen(true)}>
						Вход
					</Button>
				]}
			/>
			<ModalComponent open={open} setOpen={setOpen} fromPage={fromPage} />
		</>
	)
}
export default ResultFalseLogin