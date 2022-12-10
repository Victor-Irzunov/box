import React from 'react'
import { Typography } from 'antd'

const { Paragraph } = Typography

function BrandMain() {
	return (
		<div className='pt-12 pb-12'>
			<Typography.Title
				//   editable
				level={2}
				style={{
					margin: 0,
				}}
			>
				Подарочные боксы
			</Typography.Title>

			<Paragraph>
				Выбор подарка всегда дело непростое и мы готовы снять с вас эту задачу. Мы собрали множество уникальных подарочных боксов для женщин и мужчин, для мальчиков и девочек. В нашем каталоге можно выбрать подарок на любой повод и вкус: на День рождения, 8 марата, Новый год и т.п.
				Экономьте свое время, ведь любой подарок у нас можно купить с доставкой!
			</Paragraph>
		</div>
	)
}

export default BrandMain