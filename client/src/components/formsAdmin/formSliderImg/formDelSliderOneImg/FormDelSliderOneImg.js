import React, { useContext, useEffect, useState } from 'react'
import {
	Button, Popconfirm,
	Form, message, Checkbox, Image
} from 'antd'
import { deleteSliderImg } from '../../../../http/adminAPI'
import { Context } from '../../../../App'
import { getSliderImg } from '../../../../http/imgAPI'

function FormDelSliderOneImg() {
	const { dataApp } = useContext(Context)
	const [data, setData] = useState([])
	const [isSelect, setIsSelect] = useState(false)
	const [elId, setElId] = useState([])

	useEffect(() => {
		getSliderImg()
			.then(data => {
				setData(data)
			})
	}, [])

	const onChange = checkedValues => {
		setElId(checkedValues)
	}


	const deleteImg = () => {
		console.log('elId: ', elId)
		if (elId.length) {
			deleteSliderImg({ dataId: JSON.stringify(elId) })
				.then(data => {
					message.success(data.message)
				})
		} else {
			message.warning('Выберите банер для удаления!')
		}

	}


	return (
		<div className='pb-12'>
			<p>Выберите банер для удаления</p>
			<Checkbox.Group onChange={onChange}>
				<div className='flex justify-between'>
					{data.map(el => {
						return (
							<div className={`mr-1 text-center`}>
								<Image src={process.env.REACT_APP_API_URL + el.img} />
								<Checkbox value={el.id} className='mt-2'></Checkbox>
							</div>
						)
					})}
				</div>
			</Checkbox.Group>
			<Popconfirm
				title={elId.length > 1 ? "Удалить банера" : "Удалить банер"}
				onConfirm={deleteImg}
				okText="Да"
				cancelText="Нет"
			>
				<Button type='primary' className='mt-4 float-right'>
					Удалить
				</Button>
			</Popconfirm>
		</div>
	)
}

export default FormDelSliderOneImg