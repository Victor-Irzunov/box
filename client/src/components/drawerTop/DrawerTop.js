import { Button, Drawer, Radio, Space } from 'antd'
import React, { useState, useContext } from 'react'
import FormSearch from '../forms/formSearch/FormSearch'
import { observer } from 'mobx-react-lite'
import { Context } from '../../App'
import ListSearch from './listSearch/ListSearch'



const DrawerTop = observer(({ open, onClose }) => {
	const { dataProducts } = useContext(Context)
	const [placement, setPlacement] = useState('top')
	const [isBool, setIsBool] = useState(false)

	// const onChange = (e) => {
	// 	setPlacement(e.target.value);
	// };
	return (
		<>
			<Drawer
				title="Поиск по каталогу"
				placement={placement}
				onClose={onClose}
				open={open}
				key={placement}
				// style={{ textAlign: 'center' }}
				// size='large'
				height={isBool ? '80vh' : '50vh'}
			// className='pb-2'
			>
				<div className='text-center'>
					<FormSearch setIsBool={setIsBool} />
					{isBool && <span className='block mt-5 float-right'>Итого: {dataProducts?.dataSearchProducts?.products?.length || 0}</span>}
				</div>
				<ListSearch data={dataProducts?.dataSearchProducts?.products || []} onClose={onClose} />
			</Drawer>
		</>
	);
})
export default DrawerTop