import { Descriptions } from 'antd'
import React from 'react'



const DescriptionsCompUserData = ({ data }) => {
	return (
		<Descriptions title="Данные">
			<Descriptions.Item label="Аккаунт создан">{data.userData.createdAt}</Descriptions.Item>
			<Descriptions.Item label="Имя">{data.userData.fitstName}</Descriptions.Item>
			<Descriptions.Item label="Фамилия">{+data.userData.lastName ? data.userData.lastName :'-'}</Descriptions.Item>
			<Descriptions.Item label="Отчество">{+data.userData.otchestvo ? data.userData.otchestvo : '-'}</Descriptions.Item>
			<Descriptions.Item label="Дата рождения">{+data.userData.dateBirth ? data.userData.dateBirth : '-'}</Descriptions.Item>
			<Descriptions.Item label="Телефон">{data.userData.phone}</Descriptions.Item>
			<Descriptions.Item label="Город">{data.userData.city}</Descriptions.Item>
			<Descriptions.Item label="Адрес">{data.userData.address}</Descriptions.Item>
			<Descriptions.Item label="Почта">{data.userData.email}</Descriptions.Item>
		</Descriptions>
	)
}
export default DescriptionsCompUserData