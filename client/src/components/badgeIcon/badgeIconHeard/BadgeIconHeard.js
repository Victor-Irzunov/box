// import { HeartOutlined } from '@ant-design/icons'
import { Badge, Tooltip } from 'antd'
import heart from '../../../images/menuIcon/heart.svg'
import React, { useContext } from 'react'
import { ReactComponent as Heart } from '../../../images/menuIcon/heart.svg'
import './BadgeIconHeard.css'
import { Context } from '../../../App'
import { observer } from "mobx-react-lite"

const BadgeIconHeard = observer(({ cardComp, header, productPage, addToLiked, id }) => {
	const { dataApp } = useContext(Context)
	return (
		<>
			{cardComp &&
				<div
					className='absolute top-2 right-4 cursor-pointer z-10'
					onClick={() => addToLiked('LikedList', id)}
				>
					<Tooltip title="Нравится">
						<Heart className={dataApp.likedArr.includes(id) ? 'icon-heart activeliked' : 'icon-heart'} />
					</Tooltip>
				</div>
			}

			{
				header &&
				<div className='absolute top-5 right-48 cursor-pointer'>
					<Badge count={dataApp.likedLength} size="small">
						<img
							src={heart}
							className='w-6 hover:scale-110 duration-500'
						/>
					</Badge>
				</div>
			}

			{productPage &&
				<div
					className='cursor-pointer'
					onClick={() => addToLiked('LikedList', id)}
				>
					<Tooltip title="Нравится">
						<Heart className={dataApp.likedArr.includes(id) ? 'icon-heart activeliked' : 'icon-heart'} />
					</Tooltip>
				</div>
			}
		</>

	)
})
export default BadgeIconHeard