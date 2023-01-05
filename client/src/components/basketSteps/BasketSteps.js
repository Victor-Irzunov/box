import { Button, Steps, Divider } from 'antd'
import React, { useState } from 'react'
import BasketCard from '../basketCard/BasketCard'
import BasketDostavkaIOplata from '../basketDostavkaIOplata/BasketDostavkaIOplata'
import ResultComp from '../result/ResultComp'
import { useScreens } from '../../Constants/constants'
const BasketSteps = ({ data, setData }) => {
	const [current, setCurrent] = useState(0)
	const screens = useScreens()
	const next = () => {
		setCurrent(current + 1)
	}
	const prev = () => {
		setCurrent(current - 1)
	}
	const steps = [
		{
			title: 'Товары и услуги',
			content: <BasketCard data={data} setData={setData} />,
		},
		{
			title: 'Доставка и оплата',
			content: <BasketDostavkaIOplata next={next} data={data} />,
			disabled: !data.length
		},
		{
			title: 'Заказ оформлен',
			content: <ResultComp title='Заказ оформлен!' subTitle='куда Вы дальше предпочитаете перейти?' />,
			disabled: true
		},
	]
	const onChange = (value) => {
		setCurrent(value)
	}
	const items = steps.map((item) => ({
		key: item.title,
		title: item.title,
		disabled: item.disabled
	}))
	return (
		<>
			<Steps
				current={current}
				items={items}
				onChange={onChange}
				type="navigation"
				className="site-navigation-steps"
			/>
			<div className="steps-content">
				{steps[current].content}
			</div>

			<Divider />
			<div className="steps-action flex justify-end">
				{(current > 0 && current !== steps.length - 1) && (
					<Button
						style={{
							margin: '0 8px',
						}}
						size='large'
						type='text'
						onClick={() => prev()}
					>
						Назад
					</Button>
				)}
				{current < 1 && (
					<Button
						type="primary"
						size={screens.xs ? 'middle': 'large'}
						className={`${!data.length && 'hidden'}`}
						onClick={() => {
							next()
						}}>
						Оформить заказ
					</Button>
				)}
			</div>
		</>
	)
}
export default BasketSteps