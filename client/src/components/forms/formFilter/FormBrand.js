import { Row, Checkbox, Col } from 'antd'
import React from 'react'


const FormBrand = () => {
	const onChange = (checkedValues) => {
		console.log('checked = ', checkedValues);
	}
	return (
		<Checkbox.Group

			onChange={onChange}
		>
			<Row>
				<Col span={24}>
					<Checkbox value="adidas">Adidas</Checkbox>
				</Col>
				<Col span={24}>
					<Checkbox value="nike">Nike</Checkbox>
				</Col>
				<Col span={24}>
					<Checkbox value="reebok">Reebok</Checkbox>
				</Col>
				<Col span={24}>
					<Checkbox value="puma">Puma</Checkbox>
				</Col>
				<Col span={24}>
					<Checkbox value="jordan">Jordan</Checkbox>
				</Col>

			</Row>
		</Checkbox.Group>
	);
};
export default FormBrand