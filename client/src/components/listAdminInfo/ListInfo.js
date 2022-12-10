import React from 'react'
import { Button, List, message, Space, } from 'antd'
import { deleteInfo } from '../../http/adminAPI'

const ListInfo = ({ data, setMessages, dataTitleInfo }) => {
	const deleteFu = id => {
		deleteInfo(id)
			.then(data => {
				setMessages(i => !i)
			})
			.catch(err => {
				message.error(err.message)
			})
	}
	return (

		dataTitleInfo.map(el => {
			return (
				<React.Fragment key={el.id}>
					<p className='text-base font-bold mb-2'>{el.name}</p>
					<Space align='start' size='large' wrap key={el.id}>
						{data.map(elem => {
							if (el.id === elem.infoTitleId) {
								return (
									<div className='' key={elem.id}>
										<p className='text-sm font-semibold'>{elem.name}</p>
										{elem.content.map((item, idx) => {
											return (
												<p key={idx}>{item}</p>
											)
										})}
										<Button
											type='text'
											className='text-red-600 font-light text-xs'
											onClick={() => deleteFu(elem.id)}
										>
											удалить
										</Button>
									</div>
								)
							}

						})}
					</Space>

				</React.Fragment>
			)
		})
	)
}
export default ListInfo

