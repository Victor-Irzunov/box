import React from 'react'
import { Row, Col, Divider } from 'antd'
import FormType from '../../components/formsAdmin/formType/FormType'
import FormInfo from '../../components/formsAdmin/formInfo/FormInfo'
import FormCategory from '../../components/formsAdmin/formCategory/FormCategory'
import FormProduct from '../../components/formsAdmin/formProduct/FormProduct'
import FormInfoTitle from '../../components/formsAdmin/formInfoTitle/FormInfoTitle'
import Сharacteristic from '../../components/formsAdmin/formInfo/Сharacteristic'


const AdminPage = () => {


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
					<Col xl={24}>

					</Col>
				</Row>
			</div>
		</section>
	)
}

export default AdminPage