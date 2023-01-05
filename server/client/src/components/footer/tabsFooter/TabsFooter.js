import { Tabs } from 'antd'
import React from 'react'
import {
	InstagramOutlined,
	FacebookOutlined,
	WhatsAppOutlined,
	SkypeOutlined,
} from '@ant-design/icons'
import { useScreens } from '../../../Constants/constants'





const TabsFooter = () => {
	const screens = useScreens()
	const itemsTabsFooter = [
		{
			label: 'Телефон',
			key: '1',
			children: <p className='text-[#00FF26] text-lg xs:text-base'>+375 29 000-00-00 <br /> +375 33 000-00-00</p>,
		},
		{
			label: 'Адрес',
			key: '2',
			children: [<p className='text-[#00FF26] text-lg xs:text-base'>г.Минск <br className={screens.xs && 'hidden'} /> ул. Минская д. 100</p>],
		},
		{
			label: 'Месседжеры',
			key: '3',
			children: [<div className='flex justify-center'><WhatsAppOutlined className='text-[#00FF26] xs:text-base' style={{ fontSize: '1.8em', marginBottom: '0.5em', marginRight: '0.5em' }} /> <SkypeOutlined className='text-[#00FF26]' style={{ fontSize: '2em' }} /></div>]
		},
		{
			label: 'Соц. сети',
			key: '4',
			children: [<div className='flex justify-center'><InstagramOutlined className='text-[#00FF26] xs:text-base' style={{ fontSize: '2em', marginBottom: '0.5em', marginRight: '0.5em' }} /> <FacebookOutlined className='text-[#00FF26]' style={{ fontSize: '2em' }} /></div>]
		},
		{
			label: 'Почта',
			key: '5',
			children: <p className='text-[#00FF26] text-lg xs:text-base'>exemple@gmail.com</p>,
		},
	]

	return (

		<Tabs
			tabPosition={screens.xs ? 'top' : 'left'}
			items={itemsTabsFooter}
			style={screens.xs ? { color: '#fff', marginTop: '2em', textAlign: 'center' } : { color: '#fff', marginTop: '2em' }}
			size='small'
		/>

	)
}
export default TabsFooter