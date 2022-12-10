import { Tabs } from 'antd'
import React, { useState } from 'react'
import {
	InstagramOutlined,
	FacebookOutlined,
	WhatsAppOutlined,
	SkypeOutlined,
} from '@ant-design/icons'


const itemsTabsFooter = [
	{
		label: 'Телефон',
		key: '1',
		children: <p className='text-[#00FF26] text-lg'>+375 29 000-00-00 <br /> +375 33 000-00-00</p>,
	},
	{
		label: 'Адрес',
		key: '2',
		children: [<p className='text-[#00FF26] text-lg'>г.Минск <br /> ул. Минская д. 100</p>],
	},
	{
		label: 'Месаджеры',
		key: '3',
		children: [<WhatsAppOutlined className='text-[#00FF26]' style={{ fontSize: '1.8em', marginBottom: '0.5em' }} />, <br />, <SkypeOutlined className='text-[#00FF26]' style={{ fontSize: '2em' }} />],
	},
	{
		label: 'Соц. сети',
		key: '4',
		children: [<InstagramOutlined className='text-[#00FF26]' style={{ fontSize: '1.8em', marginBottom: '0.5em' }} />, <br />, <FacebookOutlined className='text-[#00FF26]' style={{ fontSize: '2em' }} />],
	},
	{
		label: 'Почта',
		key: '5',
		children:  <p className='text-[#00FF26] text-lg'>exemple@gmail.com</p>,
	},
]


const TabsFooter = () => {
	const [tabPosition, setTabPosition] = useState('left')
	const changeTabPosition = (e) => {
		setTabPosition(e.target.value)
	}
	return (

		<Tabs
			tabPosition={tabPosition}
			items={itemsTabsFooter}
			style={{ color: '#fff', marginTop:'2em'}}
		/>

	)
}
export default TabsFooter