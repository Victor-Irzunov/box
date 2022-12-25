import React, { useState } from 'react'
import { Row, Col, Divider } from 'antd'
import FormType from '../../components/formsAdmin/formType/FormType'
import FormInfo from '../../components/formsAdmin/formInfo/FormInfo'
import FormCategory from '../../components/formsAdmin/formCategory/FormCategory'
import FormProduct from '../../components/formsAdmin/formCreateProduct/FormProduct'
import FormInfoTitle from '../../components/formsAdmin/formInfoTitle/FormInfoTitle'
import Сharacteristic from '../../components/formsAdmin/formInfo/Сharacteristic'
import GetProductChange from '../../components/formsAdmin/formChangeProduct/GetProductChange'
import FormDeleteProduct from '../../components/formsAdmin/formDeleteProduct/FormDeleteProduct'
import GetOrderAdmin from '../../components/ordersAdmin/GetOrderAdmin'
import RenderingDataOrder from '../../components/ordersAdmin/RenderingDataOrder'
import ChangeStatusOrder from '../../components/changeStatus/ChangeStatusOrder'


const AdminPage = () => {
	const [dataOrder, setDataOrder] = useState([])


	return (
		<section className='pb-28'>
			<div className='container'>
				<p className='text-2xl mt-8'>Страница администратора</p>
				<Row gutter={[0, 30]} className='pt-10 pb-10'>
					<Col xl={12}>
						<FormCategory />
					</Col>
					<Col xl={12}>
						<FormType />
					</Col>
					<Divider />
					<Col xl={12}>
						<FormInfoTitle />
					</Col>
				</Row>

				<Divider />

				<Row gutter={[10, 10]} className=''>

					<Col xl={24}>
						{/* <p className='mb-4 text-base'>Добавить характеристики</p> */}
						<Сharacteristic />
					</Col>
				</Row>

				<Divider />

				<Row>
					<Col xl={24}>
						<p className='text-xl mb-10'>Добавить товар</p>
						<FormProduct />
					</Col>
				</Row>
				<Divider />

				<Row>
					<Col xl={24}>
						<p className='text-xl mb-10'>Изменить товар</p>
						<GetProductChange />
					</Col>
				</Row>
				<Divider />
				<Row>
					<Col xl={24}>
						<p className='text-xl mb-10'>Удалить товар</p>
						<FormDeleteProduct />
					</Col>
				</Row>
				<Divider />
				<Row>
					<Col xl={24}>
						<p className='text-xl mb-10'>Заказы</p>
						<GetOrderAdmin setDataOrder={setDataOrder} />
						<RenderingDataOrder dataOrder={dataOrder} />
					</Col>

				</Row>
				<Divider />
				<Row>

					<Col xl={24}>
						<p className='text-xl mb-10'>Изменить статус заказа</p>
						<ChangeStatusOrder />
					</Col>
				</Row>
			</div>
		</section>
	)
}

export default AdminPage