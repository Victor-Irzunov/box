import { Affix, Button } from 'antd'
import React, { useState } from 'react'
import DrawerModal from '../drawerModal/DrawerModal'


const TitleAffix = ({ url, btn, form,title }) => {
	const [open, setOpen] = useState(false)
	const showDrawer = () => {
		setOpen(true)
	}
	return (
		<>
			<Affix offsetTop={120}
				// onChange={(affixed) => console.log(affixed)}
			>
				<Button onClick={showDrawer}>{btn}</Button>
			</Affix>
			<DrawerModal open={open} setOpen={setOpen} url={url} form={form} title={title} />
		</>
	)
}
export default TitleAffix