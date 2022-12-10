import { Pagination } from 'antd'
import React from 'react'
const PaginationComp = ({ totalItem,onChange }) => {
	return (
		<Pagination
			total={totalItem}
			showSizeChanger
			onChange={onChange}
			showQuickJumper
			showTotal={(total) => `Итого: ${total} позиций`}
		/>
	)
}
export default PaginationComp