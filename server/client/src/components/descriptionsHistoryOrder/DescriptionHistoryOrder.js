import { Badge, Descriptions } from 'antd'
import React from 'react'
import moment from 'moment'
import '../../../node_modules/moment/locale/ru'
moment.locale('ru')



const DescriptionHistoryOrder = ({ data, orderAdmin }) => {
	return (
		data.map(el => {
			return (
				<Descriptions
					size='small' key={el.id}
					title={`Заказ номер ${el.id}`}
					className='mb-5 bg-gray-100' layout="vertical"
					bordered
					contentStyle={{fontWeight:'500'}}
				>
					<Descriptions.Item label="Дата заказа">{moment(el.createdAt).format('LLLL')}</Descriptions.Item>
					<Descriptions.Item label="Название товара">{el.product.name}</Descriptions.Item>
					<Descriptions.Item label="Количество">{el.count}</Descriptions.Item>
					<Descriptions.Item label="На сумму">{el.price * el.count} BYN</Descriptions.Item>
					<Descriptions.Item label="Скидка">{(+(el.price * el.count) * el.product.discountPercentage / 100).toFixed(2)} BYN</Descriptions.Item>
					<Descriptions.Item label="Оплата">{el.order.oplata}</Descriptions.Item>
					<Descriptions.Item label="Телефон для связи">{el.order.phone}</Descriptions.Item>
					<Descriptions.Item label="Дата доставки">{el.order.date}</Descriptions.Item>
					<Descriptions.Item label="Время доставки">{el.order.time}</Descriptions.Item>
					<Descriptions.Item label="Способ доставки">{el.order.delivery === "kurer_minsk" ? "Курьером по Минску":"По Беларуси"}</Descriptions.Item>
					<Descriptions.Item label="Адрес доставки">г. {el.order.city}{' '}ул.{el.order.address}</Descriptions.Item>
					<Descriptions.Item label="Комментарий">{el.order.comment}</Descriptions.Item>
					{orderAdmin &&
						<Descriptions.Item label="Статус заказа" span={3}>
							{
								el.status ?
									<Badge status="processing" text="Товар заказан, не доставлен" />
									:
									<Badge status="success" text="Товар доставлен" />
							}
						</Descriptions.Item>
					}
				</Descriptions>
			)
		})

	)
}
export default DescriptionHistoryOrder