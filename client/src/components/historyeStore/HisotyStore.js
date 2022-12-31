import { Image, Typography } from 'antd'
import React, { useState } from 'react'
import logohistory from '../../images/historyStore/box-history.jpeg'
const { Paragraph } = Typography
function HisotyStore() {
	const [editH1] = useState('box-Store - самый крупный онлайн-магазин подарочных боксов в Беларуси.')
	const [editContent] = useState(`Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
	Design, a design language for background applications, is refined by Ant UED Team. Ant
	Design, a design language for background applications, is refined by Ant UED Team. Ant
	Design, a design language for background applications, is refined by Ant UED Team. Ant
	Design, a design language for background applications, is refined by Ant UED Team. Ant
	Design, a design language for background applications, is refined by Ant UED Team.`)
	return (
		<div
			className='sm:mt-20 pb-10 xm:mt-12 ss:mt-12
			 xx:mt-6 xy:mt-6
			 flex justify-between 
			 xy:flex-wrap xy:justify-center
			  xx:flex-wrap xx:justify-center 
			  xs:flex-wrap xs:justify-center 
			  sm:flex-nowrap'
		>
			<Image src={logohistory} width='90%' className='mb-5' />
			<div>
				<Typography.Title
					style={{
						margin: 0,
						fontSize: '1.6em',
						marginLeft: '1em',
					}}
				>
					{editH1}
				</Typography.Title>
				<Paragraph
					ellipsis={{ rows: 2, expandable: true, symbol: 'читать дальше' }}
					className='text-gray-500 ml-6'
				>
					{editContent}
				</Paragraph>
			</div>
		</div>
	)
}
export default HisotyStore