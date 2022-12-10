import { Drawer } from 'antd'
import React from 'react'
import FormTitleChange from '../forms/formTitleChange/FormTitleChange'


const DrawerModal = ({ open, setOpen, url, form, title }) => {
	const onClose = () => {
		setOpen(false)
	}
	return (

		<Drawer title={title} placement="right" onClose={onClose} open={open}>
			{form === 'FormTitleChange' && <FormTitleChange url={url} setOpen={setOpen} />}
		</Drawer>

	)
}
export default DrawerModal