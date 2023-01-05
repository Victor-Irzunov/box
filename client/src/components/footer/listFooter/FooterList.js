import { List, Button } from 'antd'
import React from 'react'

const FooterList = ({ data, title }) => {
	return (
		<List
			size="small"
			header={<div className='ml-8 text-white font-bold'>{title}</div>}
			dataSource={data}
			renderItem={(item) => <List.Item key={item.key}>
				<Button type="link" className='text-white hover:text-[#00FF26]'>{item.label}</Button>
			</List.Item>}
		/>
	)
}
export default FooterList