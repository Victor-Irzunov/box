import React, {useState} from 'react'
import ChangeStatusOrder from '../../components/changeStatus/ChangeStatusOrder'
import GetOrderAdmin from '../../components/formsAdmin/formOrdersAdmin/GetOrderAdmin'
import RenderingDataOrder from '../../components/formsAdmin/formOrdersAdmin/RenderingDataOrder'
import { Collapse } from 'antd'
const { Panel } = Collapse

function CourierPage() {
  const [dataOrder, setDataOrder] = useState([])

  return (
   <section className='pb-28'>
			<div className='container'>
				<p className='text-2xl mt-8 mb-8'>Страница администратора</p>
				<Collapse accordion bordered={false}>

					<Panel header="Заказы" key="8" className='p-2'>
						<GetOrderAdmin setDataOrder={setDataOrder} courier={true} />
						<RenderingDataOrder dataOrder={dataOrder} />
					</Panel>

					<Panel header="Изменить статус заказа" key="9" className='p-2'>
						<ChangeStatusOrder courier={true} />
					</Panel>
				</Collapse>
			</div>
		</section >
  )
}

export default CourierPage