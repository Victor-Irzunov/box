import { Pagination } from 'antd'
import React from 'react'
const PaginationComp = ({ totalItem, onChange, current }) => {
	return (
		<Pagination
			total={totalItem}
			current={current}
			showSizeChanger
			onChange={onChange}
			showQuickJumper
			showTotal={(total) => `Итого: ${total} позиций`}
		/>
	)
}
export default PaginationComp