import React, { useState, useContext, useEffect } from 'react'
import { Helmet } from "react-helmet"
import { Typography, Layout, Space, Button, Divider, BackTop, Empty } from 'antd'
import { HighlightOutlined, UpCircleOutlined, DownCircleOutlined } from '@ant-design/icons'
import CardComp from '../../components/Card/CardComp'
import FilterAll from '../../components/filterAll/FilterAll'
import { textMenPage } from '../../content/Content'
import TitleAffix from '../../components/titleAffix/TitleAffix'
import { Context } from '../../App'
import { observer } from "mobx-react-lite"
import PaginationComp from '../../components/pagination/PaginationComp'
import { Link, useLocation } from 'react-router-dom'
import { fetchProducts } from '../../http/productsAPI'

const { Sider, Content } = Layout
const { Paragraph } = Typography



const UniversalPage = observer(() => {
	const { dataApp, isAdmin } = useContext(Context)
	const [editH1, setEditH1] = useState('')
	const [editH2, setEditH2] = useState(textMenPage.h2)
	const [h2, setH2] = useState('')
	const [editH3, setEditH3] = useState(textMenPage.h3)
	const [editP, setEditP] = useState(textMenPage.p)
	const [editP2, setEditP2] = useState(textMenPage.p2)
	const [editP3, setEditP3] = useState(textMenPage.p3)

	let location = useLocation()
	const localPath = location.pathname.split('/').join('')
	const arrLocalPath = location.pathname.split('/').filter(function (el) {
		return (el != null && el != "" || el === 0)
	})

	const [itemCard, setItemCard] = useState([])
	const [totalItem, setTotalItem] = useState(1)
	const [page, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(10)
	const [categoryId, setCategoryId] = useState(null)
	const [typeId, setTypeId] = useState(null)
	const [type, setType] = useState([])
	const [isReset, setIsReset] = useState(false)
	const [isBtnSortRatng, setIsBtnSortRatng] = useState(false)
	const [isBtnSortPrice, setIsBtnSortPrice] = useState(false)

	const [inputValueFrom, setInputValueFrom] = useState(15)
	const [inputValueBefore, setInputValueBefore] = useState(null)
	// console.log('-------------------------------------------------------location: ', location)
	console.log('-----------------------------------------------comp-🧤---🧤-render-------',)
	
	useEffect(() => {
		if (dataApp.dataMenu) {
		// console.log('🧤---🧤')
		dataApp.dataMenu.forEach(el => {
			if (el.link === arrLocalPath[0]) {
				setCategoryId(el.id)
				setEditH1(el.name)
				setTypeId(null)
				setType(el.types)
			}
			if (arrLocalPath.length === 2) {
				el.types.forEach(elem => {
					if (elem.link === arrLocalPath[1]) {
						setTypeId(elem.id)
						setH2(elem.name)
					}
				})
			}
		})
	}
	}, [arrLocalPath])

	useEffect(() => {
		console.log('💊💊💊useEffect: ', categoryId, typeId)
		if (categoryId) {
			console.log('---------if (categoryId) {---------')
			fetchProducts(page, pageSize, categoryId, typeId)
			.then(data => {
				console.log('💡--💡data: ', data)
				setItemCard(data.rows)
				setTotalItem(data.count)
			})
		}
	}, [page,
		pageSize,
		localPath,
		categoryId,
		typeId,
		isReset
	])

	const sendFormFilter = () => {
		console.log('⛑️---------⛑️')
		fetchProducts(page, pageSize, categoryId, typeId, inputValueFrom, inputValueBefore)
			.then(data => {
				console.log('-----data2: ', data)
				setItemCard(data.rows)
				setTotalItem(data.count)
			})
			.finally(() => {
				setInputValueFrom(15)
				setInputValueBefore(null)
			})
	}

	const onChange = (page, pageSize) => {
		setPage(page)
		setPageSize(pageSize)
	}

	const resetFilter = () => setIsReset(i => !i)

	const filterUpDownPrice = () => {
		if (!isBtnSortPrice) {
			setIsBtnSortPrice(i => !i)
			return setItemCard(prev => prev.sort((a, b) => a.price - b.price))
		}
		setIsBtnSortPrice(i => !i)
		return setItemCard(prev => prev.sort((a, b) => b.price - a.price))
	}

	const filterUpDownRating = () => {
		if (!isBtnSortRatng) {
			setIsBtnSortRatng(i => !i)
			return setItemCard(prev => prev.sort((a, b) => a.rating - b.rating))
		}
		setIsBtnSortRatng(i => !i)
		return setItemCard(prev => prev.sort((a, b) => b.rating - a.rating))
	}

	return (
		<>
			<Helmet>
				<title>{dataApp.data['/muzhskie'].title}</title>
				<meta name="description" content={dataApp.data['/muzhskie'].description} />
			</Helmet>

			<BackTop />
			<section className='container pt-10'>
				{
					isAdmin && <TitleAffix url={'/muzhskie'} btn={'Изменить Title'} form={'FormTitleChange'} title={'Изменить Title / Description'} />
				}
				<Space align='center'>
					<Typography.Title
						// editable={isAdmin && {
						// 	onChange: setEditH1,
						// 	icon: <HighlightOutlined />,
						// }}
						level={1}
						className=''
					>
						{editH1}
					</Typography.Title>
					<h2>{h2}</h2>
					<span className='text-slate-400'>{totalItem} товаров</span>
				</Space>
				<br />
				<Space className='mt-6 mb-6'>
					<span className='text-slate-400'>Ещё категории:
						{type.map(el => {
							if (el.link !== arrLocalPath[1]) {
								return (
									<Link to={`/${arrLocalPath[0]}/${el.link}`} key={el.id} >
										<Button type='link'>
											<span className='underline'>{el.name}</span>
										</Button>
									</Link>
								)
							}
						})}
					</span>
				</Space>
				<br />
				<Space>
					<div>
						<Button
							type="primary"
							shape="round"
							size='small'
							className='mr-16'
						>
							Фильтр подбора
						</Button>
					</div>
					<div>
						<span className=' text-slate-400'>
							Сортировать по:
							<Button
								type="text"
								onClick={filterUpDownRating}
							>
								<span className='underline'>Рейтингу</span>
								{!isBtnSortRatng ?
									<DownCircleOutlined />
									:
									<UpCircleOutlined />
								}
							</Button>
							<Button
								type="text"
								onClick={filterUpDownPrice}
							>
								<span className='underline'>Цене</span>
								{!isBtnSortPrice ?
									<DownCircleOutlined />
									:
									<UpCircleOutlined />
								}
							</Button>
						</span>
					</div>
				</Space>

				<Layout className='mt-2'>
					<Sider theme='light'>
						<FilterAll
							sendFormFilter={sendFormFilter}
							inputValueFrom={inputValueFrom}
							inputValueBefore={inputValueBefore}
							setInputValueFrom={setInputValueFrom}
							setInputValueBefore={setInputValueBefore}
							resetFilter={resetFilter}
						/>
					</Sider>



					<Content className='pb-20 bg-white'>

						{
							totalItem
								?
								<>
									<CardComp itemCard={itemCard} />
									<br />
									<br />
									<PaginationComp totalItem={totalItem} onChange={onChange} />
								</>
								:
								<Empty>
									<p className='mb-7'>
										По данному фильтру товара нет!
									</p>
									<Button onClick={resetFilter}>
										Сбросить фильтр
									</Button>
								</Empty>
						}
						<div className='mt-32'>
							<Paragraph editable={{ onChange: setEditP }}>{editP}</Paragraph>
							<Divider orientation="left">
								<Typography.Title
									editable={isAdmin && {
										onChange: setEditH2,
										icon: <HighlightOutlined />,
									}}
									level={2}
									className=''
								>
									{editH2}
								</Typography.Title>
							</Divider>
							<Paragraph editable={isAdmin && { onChange: setEditP2 }}>{editP2}</Paragraph>
							<Typography.Title
								editable={isAdmin && {
									onChange: setEditH3,
									icon: <HighlightOutlined />,
								}}
								level={3}
								className=''
							>
								{editH3}
							</Typography.Title>
							<Paragraph editable={isAdmin && { onChange: setEditP3 }}>{editP3}</Paragraph>
						</div>


					</Content>



				</Layout>

			</section>
		</>
	)
})

export default UniversalPage

	// useEffect(() => {
	// 	axios.get(`https://dummyjson.com/products?limit=${pageSize}&skip=${page * pageSize - pageSize}`)
	// 		.then(data => {
	// 			setItemCard(data.data.products)
	// 			setTotalItem(data.data.total)
	// 		})
	// }, [page, pageSize])