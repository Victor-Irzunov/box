// import React, { useState, useContext, useEffect } from 'react'
// import { Helmet } from "react-helmet"
// import { Typography, Layout, Space, Button, Divider, BackTop } from 'antd'
// import { titles } from '../../content/Content'
// import { HighlightOutlined, } from '@ant-design/icons'
// import CardComp from '../../components/Card/CardComp'
// import FilterAll from '../../components/filterAll/FilterAll'
// import { textMenPage } from '../../content/Content'
// import TitleAffix from '../../components/titleAffix/TitleAffix'
// import { Context } from '../../App'
// import { observer } from "mobx-react-lite"
// import PaginationComp from '../../components/pagination/PaginationComp'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// import { fetchProducts } from '../../http/productsAPI'

// const { Sider, Content } = Layout
// const { Paragraph } = Typography

// const NovyjGodPage = observer(() => {
// 	const { dataApp, isAdmin } = useContext(Context)
// 	const [editH1, setEditH1] = useState(textMenPage.h1)
// 	const [editH2, setEditH2] = useState(textMenPage.h2)
// 	const [editH3, setEditH3] = useState(textMenPage.h3)
// 	const [editP, setEditP] = useState(textMenPage.p)
// 	const [editP2, setEditP2] = useState(textMenPage.p2)
// 	const [editP3, setEditP3] = useState(textMenPage.p3)


// 	const [itemCard, setItemCard] = useState([])
// 	const [totalItem, setTotalItem] = useState(1)
// 	const [page, setPage] = useState(1)
// 	const [pageSize, setPageSize] = useState(10)


// 	useEffect(() => {
// 		axios.get(`https://dummyjson.com/products?limit=${pageSize}&skip=${page * pageSize - pageSize}`)
// 			.then(data => {
// 				setItemCard(data.data.products)
// 				setTotalItem(data.data.total)
// 			})
// 	}, [page, pageSize])

// 	useEffect(() => {
// 		fetchProducts(page, pageSize)
// 			.then(data => {
// 				console.log('-----data: ', data)
// 				setItemCard(data.rows)
// 				setTotalItem(data.count)
// 			})
// 	}, [page, pageSize])


// 	const onChange = (page, pageSize) => {
// 		setPage(page)
// 		setPageSize(pageSize)
// 	}
// 	const onShowSizeChange = (current, size) => {
// 		console.log('current: ', current)
// 		console.log('size: ', size)
// 		setPageSize(size)
// 	}

// 	return (
// 		<>
// 			<Helmet>
// 				<title>{dataApp.data['/muzhskie'].title}</title>
// 				<meta name="description" content={dataApp.data['/muzhskie'].description} />
// 			</Helmet>

// 			<BackTop />
// 			<section className='container pt-10'>
// 				{
// 					isAdmin && <TitleAffix url={'/muzhskie'} btn={'Изменить Title'} form={'FormTitleChange'} title={'Изменить Title / Description'} />
// 				}


// 				<Space align='center'>
// 					<Typography.Title
// 						editable={isAdmin && {
// 							onChange: setEditH1,
// 							icon: <HighlightOutlined />,
// 						}}
// 						level={1}
// 						className=''
// 					>
// 						Новогодние боксы
// 					</Typography.Title>
// 					<span className='text-slate-400'>{totalItem} товаров</span>
// 				</Space>
// 				<br />
// 				<Space className='mt-6 mb-6'>
// 					<span className='text-slate-400'>Ещё категории:
// 						<Button type="link">
// 							<span className='underline'>Для парня</span>
// 						</Button>
// 						<Button type="link">
// 							<span className='underline'>Для девушки</span>
// 						</Button>
// 						<Button type="link">
// 							<span className='underline'>Для мальчика</span>
// 						</Button>
// 						<Button type="link">
// 							<span className='underline'>Для девочки</span>
// 						</Button>
// 					</span>
// 				</Space>
// 				<br />
// 				<Space>
// 					<div>
// 						<Button
// 							type="primary"
// 							shape="round"
// 							size='small'
// 							className='mr-16'
// 						>
// 							Фильтр подбора
// 						</Button>
// 					</div>
// 					<div>
// 						<span className=' text-slate-400'>
// 							Сортировать по:
// 							<Button
// 								type="text"
// 							>
// 								<span className='underline'>Популярности</span>
// 							</Button>
// 							<Button
// 								type="text"
// 							>
// 								<span className='underline'>Рейтингу</span>
// 							</Button>
// 							<Button
// 								type="text"
// 							>
// 								<span className='underline'>Цене</span>
// 							</Button>
// 						</span>
// 					</div>
// 				</Space>

// 				<Layout className='mt-2'>
// 					<Sider theme='light'>
// 						<FilterAll />
// 					</Sider>





// 					<Content className='pb-20 bg-white'>

// 						<CardComp itemCard={itemCard} />


// 						<br />
// 						<br />
// 						<PaginationComp totalItem={totalItem} onChange={onChange} />



// 						<div className='mt-32'>
// 							<Paragraph editable={{ onChange: setEditP }}>{editP}</Paragraph>
// 							<Divider orientation="left">
// 								<Typography.Title
// 									editable={isAdmin && {
// 										onChange: setEditH2,
// 										icon: <HighlightOutlined />,
// 									}}
// 									level={2}
// 									className=''
// 								>
// 									{editH2}
// 								</Typography.Title>
// 							</Divider>
// 							<Paragraph editable={isAdmin && { onChange: setEditP2 }}>{editP2}</Paragraph>
// 							<Typography.Title
// 								editable={isAdmin && {
// 									onChange: setEditH3,
// 									icon: <HighlightOutlined />,
// 								}}
// 								level={3}
// 								className=''
// 							>
// 								{editH3}
// 							</Typography.Title>
// 							<Paragraph editable={isAdmin && { onChange: setEditP3 }}>{editP3}</Paragraph>
// 						</div>
// 					</Content>
// 				</Layout>

// 			</section>
// 		</>
// 	)
// })

// export default NovyjGodPage