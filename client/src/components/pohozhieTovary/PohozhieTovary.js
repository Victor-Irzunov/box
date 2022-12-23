import { Divider } from 'antd'
import React, { useState, useEffect } from 'react'
import CarouselCard from '../carouselCard/CarouselCard'
import { fetchProductsPohozhie } from '../../http/productsAPI'


const PohozhieTovary = ({ product }) => {
	const [productData, setProductData] = useState([])

	useEffect(() => {
		if (Object.keys(product).length) {
			fetchProductsPohozhie({groupId: product.groupId, id: product.id })
				.then(data => {
					console.log('data-data: ', data)
					setProductData(data)
				})
		}
	}, [])


	return (
		<div className="site-card-wrapper relative">
			<Divider
				orientation="left"
				style={{ fontSize: '1.5em', color: '#ccc' }}
				className=''
			>
				Похожие товары
			</Divider>
			<CarouselCard product={productData} />
		</div>
	)
}
export default PohozhieTovary