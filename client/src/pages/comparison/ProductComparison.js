import { Typography,Row,Col } from 'antd'
import React from 'react'
import ComparisonList from '../../components/comparisonComp/ComparisonList'
const { Title } = Typography


function ProductComparison() {

	return (
		<section className='container pt-9 pb-12'>
			<Title>Список сравнения</Title>
			<Row>
				
				<Col xl={24}>
					<ComparisonList />
				</Col>
			</Row>

		</section>
	)
}

export default ProductComparison