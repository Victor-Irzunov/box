import { Typography,Row,Col } from 'antd'
import React from 'react'
import ComparisonList from '../../components/comparisonComp/ComparisonList'
import { Helmet } from "react-helmet"
const { Title } = Typography

function ProductComparison() {
	return (
		<section className='container pt-9 pb-12'>
			<Helmet>
				<title>Список сравнения</title>
				<meta name="description" content='Список сравнения' />
			</Helmet>
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