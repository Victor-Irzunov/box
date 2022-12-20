import { Divider } from 'antd'
import React, { useState, useEffect } from 'react'
import CarouselCard from '../carouselCard/CarouselCard'
import axios from 'axios'
import { fetchProductsPohozhie } from '../../http/productsAPI'


const PohozhieTovary = ({ id }) => {
	const [product, setProduct] = useState([])
	const [open, setOpen] = useState(false)
	const showDrawer = () => {
		setOpen(true)
	}

// console.log('💊-------💊------💊id: ', id)
	useEffect(() => {
		// axios.get(`https://dummyjson.com/products?limit=10`)
		// 	.then(data => {
		// 		setProduct(data.data.products)
		// 	})
		fetchProductsPohozhie(id)
			.then(data => {
				// console.log('data-data: ', data)
				setProduct(data)
			})
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
			<CarouselCard product={product} />
		</div>
	)
}
export default PohozhieTovary