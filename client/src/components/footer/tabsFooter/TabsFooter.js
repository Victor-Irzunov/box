import { Tabs } from 'antd'
import React, { useState } from 'react'
import {
	InstagramOutlined,
	FacebookOutlined,
	WhatsAppOutlined,
	SkypeOutlined,
} from '@ant-design/icons'
import { useScreens } from '../../../Constants/constants'


const itemsTabsFooter = [
	{
		label: 'Телефон',
		key: '1',
		children: <p className='text-[#00FF26] text-lg xs:text-base'>+375 29 000-00-00 <br /> +375 33 000-00-00</p>,
	},
	{
		label: 'Адрес',
		key: '2',
		children: [<p className='text-[#00FF26] text-lg xs:text-base'>г.Минск <br /> ул. Минская д. 100</p>],
	},
	{
		label: 'Месаджеры',
		key: '3',
		children: [<div className='flex'><WhatsAppOutlined className='text-[#00FF26] xs:text-base' style={{ fontSize: '1.8em', marginBottom: '0.5em', marginRight:'0.5em' }} /> <SkypeOutlined className='text-[#00FF26]' style={{ fontSize: '2em' }} /></div>]
	},
	{
		label: 'Соц. сети',
		key: '4',
		children: [<div className='flex'><InstagramOutlined className='text-[#00FF26] xs:text-base' style={{ fontSize: '2em', marginBottom: '0.5em', marginRight:'0.5em' }} /> <FacebookOutlined className='text-[#00FF26]' style={{ fontSize: '2em' }} /></div>]
	},
	{
		label: 'Почта',
		key: '5',
		children:  <p className='text-[#00FF26] text-lg xs:text-base'>exemple@gmail.com</p>,
	},
]


const TabsFooter = () => {
	const [tabPosition, setTabPosition] = useState('left')
	const screens = useScreens()
	
	return (

		<Tabs
			tabPosition={screens.xs ? 'top': 'left'}
			items={itemsTabsFooter}
			style={{ color: '#fff', marginTop: '2em' }}
			// size='small'
		/>

	)
}
export default TabsFooter