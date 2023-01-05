import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { message, Typography, BackTop, Empty } from 'antd'
import parse from 'html-react-parser'
import { getOneInfoPages } from '../../http/infoPagesAPI'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
import { Helmet } from "react-helmet"
function InfoUniversalPage() {
	const cyrillicToTranslit = new CyrillicToTranslit()
	const [data, setData] = useState({})
	let location = useLocation()
	const { pathname } = location
	const pathnames = pathname.split("/").filter((item) => item)
	useEffect(() => {
		getOneInfoPages({ link: cyrillicToTranslit.reverse(pathnames[1]) })
			.then(data => {
				if (data) setData(data)
				else message.error(data.message)
			})
	}, [pathname])
	return (
		<section className='container mt-6 py-10'>
			<Helmet>
				<title>{data.title}</title>
				<meta name="description" content={data.title} />
			</Helmet>
			<Typography.Title>{data.title}</Typography.Title>
			<BackTop />
			<article>
				{Object.keys(data).length ? parse(data.content) : <Empty />}
			</article>
		</section>
	)
}

export default InfoUniversalPage