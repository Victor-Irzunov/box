import { Space, Image, Switch, Typography } from 'antd'
import { HighlightOutlined,  } from '@ant-design/icons'
import React,{useState} from 'react'
import logohistory from '../../images/historyStore/box-history.jpeg'

const { Paragraph } = Typography

function HisotyStore() {
	const [editH1, setEditH1] = useState('box-Store - самый крупный онлайн-магазин подарочных боксов в Беларуси.')
	const [editContent, setEditContent] = useState(`Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
	Design, a design language for background applications, is refined by Ant UED Team. Ant
	Design, a design language for background applications, is refined by Ant UED Team. Ant
	Design, a design language for background applications, is refined by Ant UED Team. Ant
	Design, a design language for background applications, is refined by Ant UED Team. Ant
	Design, a design language for background applications, is refined by Ant UED Team.`)

	
	return (
		<Space
			// wrap={true}
			size={[16, 8]}
			className='mt-20 pb-10'
		>
			<Image src={logohistory} width='90%' />
			<div>
				<Typography.Title
					// editable={{
					// 	triggerType: 'text',
					// 	onChange: setEditH1,
					// 	icon: <HighlightOutlined />,
					// }}
					level={1}
					style={{
						margin: 0,
					}}
				>
					{editH1}
				</Typography.Title>
				<Paragraph
					ellipsis={{ rows: 2, expandable: true, symbol: 'читать дальше' }}
					// editable={{
					// 	icon: <HighlightOutlined />,
					// 	onChange:setEditContent,
					// }}
					className='text-gray-500'
				>
					{editContent}
				</Paragraph>
			</div>
		</Space>
	)
}

export default HisotyStore