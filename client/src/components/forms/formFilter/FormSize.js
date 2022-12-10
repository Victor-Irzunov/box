import { Row, Checkbox, Col } from 'antd'
import React from 'react'
const FormSize = () => {
	const onChange = (checkedValues) => {
		console.log('checked = ', checkedValues);
	}
	return (
		<Checkbox.Group

			onChange={onChange}
		>
			<div className='overflow-scroll h-32'>
				<Row>
					<Col span={24}>
						<Checkbox name='39' value="39">39</Checkbox>
					</Col>
					<Col span={24}>
						<Checkbox name='40' value="40">40</Checkbox>
					</Col>
					<Col span={24}>
						<Checkbox name='40.5' value="40.5">40.5</Checkbox>
					</Col>
					<Col span={24}>
						<Checkbox name='41' value="41">41</Checkbox>
					</Col>
					<Col span={24}>
						<Checkbox name='42' value="42">42</Checkbox>
					</Col>
					<Col span={24}>
						<Checkbox name='43' value="43">43</Checkbox>
					</Col>
					<Col span={24}>
						<Checkbox name='43.5' value="43.5">43.5</Checkbox>
					</Col>
					<Col span={24}>
						<Checkbox name='44' value="44">44</Checkbox>
					</Col>
					<Col span={24}>
						<Checkbox name='45' value="45">45</Checkbox>
					</Col>
				</Row>
			</div>
		</Checkbox.Group>
	);
};
export default FormSize