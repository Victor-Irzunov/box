import React, { useState } from 'react'
import { Collapse, BackTop } from 'antd'
import {
	PictureOutlined, ScheduleOutlined,
	DollarCircleOutlined, DeleteOutlined,
	FormOutlined, AppstoreAddOutlined,
	BarsOutlined, ProfileOutlined,
	PartitionOutlined, ApartmentOutlined,
	CloseSquareOutlined, InfoCircleOutlined,
	EditOutlined,CloseOutlined,
} from '@ant-design/icons'
import FormType from '../../components/formsAdmin/formType/FormType'
import FormCategory from '../../components/formsAdmin/formCategory/FormCategory'
import FormProduct from '../../components/formsAdmin/formCreateProduct/FormProduct'
import FormInfoTitle from '../../components/formsAdmin/formInfoTitle/FormInfoTitle'
import Сharacteristic from '../../components/formsAdmin/formInfo/Сharacteristic'
import GetProductChange from '../../components/formsAdmin/formChangeProduct/GetProductChange'
import FormDeleteProduct from '../../components/formsAdmin/formDeleteProduct/FormDeleteProduct'
import ChangeStatusOrder from '../../components/changeStatus/ChangeStatusOrder'
import FormSliderImg from '../../components/formsAdmin/formSliderImg/FormSliderImg'
import FormDelSliderOneImg from '../../components/formsAdmin/formSliderImg/formDelSliderOneImg/FormDelSliderOneImg'
import GetOrderAdmin from '../../components/formsAdmin/formOrdersAdmin/GetOrderAdmin'
import RenderingDataOrder from '../../components/formsAdmin/formOrdersAdmin/RenderingDataOrder'
import FormInfoPages from '../../components/formsAdmin/formInfoPages/FormInfoPages'
import FomrGetOneInfoPage from '../../components/formsAdmin/formInfoPages/changeInfoPage/FomrGetOneInfoPage'
import { Helmet } from "react-helmet"
import FormDeleteGroup from '../../components/formsAdmin/formDeleteGroup/FormDeleteGroup'
const { Panel } = Collapse
const AdminPage = () => {
	const [dataOrder, setDataOrder] = useState([])
	return (
		<section className='pb-28'>
			<Helmet>
				<title>Страница администратора</title>
				<meta name="description" content='Страница администратора' />
			</Helmet>
			<div className='container'>
				<BackTop />
				<p className='text-2xl mt-8 mb-8'>Страница администратора</p>
				<Collapse accordion bordered={false}>
					<Panel header="Добавить / Удалить категорию боксов" extra={<ApartmentOutlined className='text-xl text-rose-600 ml-1' />} key="1" className='p-2'>
						<FormCategory />
					</Panel>

					<Panel header="Добавить / Удалить тип боксов" extra={<PartitionOutlined className='text-xl text-fuchsia-700 ml-1' />} key="2" className='p-2'>
						<FormType />
					</Panel>

					<Panel header="Добавить / Удалить заголовок характеристик" extra={<ProfileOutlined className='text-xl text-cyan-700 ml-1' />} key="3" className='p-2'>
						<FormInfoTitle />
					</Panel>

					<Panel header="Добавить характеристики" extra={<BarsOutlined className='text-xl text-cyan-600 ml-1' />} key="4" className='p-2'>
						<Сharacteristic />
					</Panel>

					<Panel header="Добавить товар" extra={<AppstoreAddOutlined className='text-xl text-pink-500 ml-1' />} key="5" className='p-2'>
						<FormProduct />
					</Panel>

					<Panel header="Изменить товар" extra={<FormOutlined className='text-xl text-purple-600 ml-1' />} key="6" className='p-2'>
						<GetProductChange />
					</Panel>

					<Panel header="Удалить товар" extra={<DeleteOutlined className='text-xl text-red-500 ml-1' />} key="7" className='p-2'>
						<FormDeleteProduct />
					</Panel>

					<Panel header="Удалить группу" extra={<CloseOutlined className='text-xl text-red-500 ml-1' />} key="8" className='p-2'>
						<FormDeleteGroup />
					</Panel>


					<Panel header="Заказы" extra={<DollarCircleOutlined className='text-xl text-orange-400 ml-1' />} key="9" className='p-2'>
						<GetOrderAdmin setDataOrder={setDataOrder} />
						<RenderingDataOrder dataOrder={dataOrder} />
					</Panel>

					<Panel header="Изменить статус заказа" extra={<ScheduleOutlined className='text-xl text-green-500 ml-1' />} key="10" className='p-2'>
						<ChangeStatusOrder />
					</Panel>
					{/* <p className='mt-4 text-xl font-semibold'>Банер</p> */}
					<Panel header='Добавить банер слайдера на главной странице' extra={<PictureOutlined className='text-xl text-blue-500 ml-1' />} key="11" className='p-2'>
						<FormSliderImg />
					</Panel>

					<Panel header='Удалить банер слайдера на главной странице' extra={<CloseSquareOutlined className='text-xl text-red-500 ml-1' />} key="12" className='p-2'>
						<FormDelSliderOneImg />
					</Panel>

					<Panel header='Добавить страницу с информацией' extra={<InfoCircleOutlined className='text-xl text-lime-500 ml-1' />} key="13" className='p-2'>
						<FormInfoPages />
					</Panel>
					<Panel header='Изменить / удалить страницу с информацией' extra={<EditOutlined className='text-xl text-lime-500 ml-1' />} key="14" className='p-2'>
						<FomrGetOneInfoPage />
					</Panel>
				</Collapse>
			</div>
		</section >
	)
}

export default AdminPage