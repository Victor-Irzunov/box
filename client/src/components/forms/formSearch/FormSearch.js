// import { Spin, Input } from 'antd'
// import { AudioOutlined } from '@ant-design/icons'
// import useDebounce from '../../../hooks/useDebounce'
// import { searchProducts } from '../../../http/productsAPI'
// import { observer } from 'mobx-react-lite'
// import { Context } from '../../../App'
// import React, { useState, useContext } from 'react'
// import { useScreens } from '../../../Constants/constants'
// const { Search } = Input


// const FormSearch = observer(({ setIsBool }) => {
// 	const { dataProducts } = useContext(Context)
// 	const debouncedSearch = useDebounce(searchProducts, 1000)
// 	const screens = useScreens()
// 	const [value, setValue] = useState('')

// 	const f1 = () => {
// 		setTimeout(() => { setIsBool(true) }, 1000)
// 	}

// 	const suffix = (
// 		<>
// 			<AudioOutlined
// 				style={{
// 					fontSize: 16,
// 					color: '#1890ff',
// 				}}
// 			/>
// 		</>
// 	)

// 	const onSearch = (value) => {
// 		debouncedSearch(value)
// 		dataProducts.setIsSpin(true)
// 		f1()
// 	}
// 	return (
// 		<Search
// 			placeholder="введите текст"
// 			size="large"
// 			suffix={suffix}
// 			allowClear
// 			value={value}
// 			loading={dataProducts.isSpin ? true : false}
// 			onSearch={onSearch}
// 			onChange={(e)=>setValue(e.target.value)}
// 			style={screens.xs ? {
// 				width: '100%'
// 			} : { width: '60%' }
// 			}
// 			enterButton="Поиск"
// 		/>
// 	)
// })
// export default FormSearch