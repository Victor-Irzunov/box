
import { Badge } from 'antd'
import React, { useContext } from 'react'
import { observer } from "mobx-react-lite"
import vesy from '../../../images/menuIcon/scale.svg'
import { ReactComponent as Vesy } from '../../../images/menuIcon/scale.svg'
import './BadgeIconVesy.css'
import { Context } from '../../../App'
import {Tooltip }from 'antd'



const BadgeIconVesy = observer(({ cardComp, header,productPage, addToComparisonList, id }) => {
	const { dataApp } = useContext(Context)

	return (
		<>
			{
				cardComp &&
				<div
					className='absolute top-2 right-14 cursor-pointer z-10'
					onClick={() => addToComparisonList('ComparisonList', id)}
				>
					<Tooltip title="Добавить в сравнение">

						<Vesy className={dataApp.vesyArr.includes(id) ? 'icon-vesy activevesy' : 'icon-vesy'} />
					</Tooltip>
				</div>
			}
			{
				header &&
				<div className='absolute top-5 right-60 cursor-pointer'>
					<Badge count={dataApp.vesyLength} size="small">
						<img
							src={vesy}
							className='w-6 hover:scale-110 duration-500'
						/>
					</Badge>
				</div>
			}
			{
				productPage &&
				<div
					className='cursor-pointer'
					onClick={() => addToComparisonList('ComparisonList', id)}
				>
					<Tooltip title="Добавить в сравнение">

						<Vesy className={dataApp.vesyArr.includes(id) ? 'icon-vesy activevesy' : 'icon-vesy'} />
					</Tooltip>
				</div>
			}

		</>

	)
})
export default BadgeIconVesy