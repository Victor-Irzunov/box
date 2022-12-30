import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { message, Typography, BackTop} from 'antd'
import parse from 'html-react-parser'
import { getOneInfoPages } from '../../http/infoPagesAPI'
import CyrillicToTranslit from 'cyrillic-to-translit-js'
function InfoUniversalPage() {
	const cyrillicToTranslit = new CyrillicToTranslit()
	const [data, setData] = useState({})
	let location = useLocation()
	const { pathname } = location
	const pathnames = pathname.split("/").filter((item) => item)
	useEffect(() => {
		getOneInfoPages({ link: cyrillicToTranslit.reverse(pathnames[1]) })
			.then(data => {
				if (data && Object.keys(data).length) setData(data)
				else message.error(data.message)
			})
	}, [pathname])
	return (
		<section className='container mt-6 py-10'>
			<Typography.Title>{data.title}</Typography.Title>
			<BackTop />
			<article>
				{Object.keys(data).length && parse(data.content)}
			</article>
		</section>
	)
}

export default InfoUniversalPage