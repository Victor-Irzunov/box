import { Radio } from 'antd'
import React from 'react'


const onChange = (e) => {
	console.log(`radio checked:${e.target.value}`);
};


const FormSizeBtn = () => (
	<div className=''>
		<Radio.Group
			defaultValue="43"
			// size="small"
			// disabled
			onChange={onChange}
			style={{
				// width:'30px',

			}}
		>
			<Radio.Button
				value="39"
			>
				39
			</Radio.Button>
			<Radio.Button value="40">40</Radio.Button>
			<Radio.Button value="40.5">40.5</Radio.Button>
			<Radio.Button value="41">41</Radio.Button>
			<Radio.Button value="42">42</Radio.Button>
			<Radio.Button value="43">43</Radio.Button>
			<Radio.Button value="43.5">43.5</Radio.Button>
			<Radio.Button value="44">44</Radio.Button>
		</Radio.Group>
	</div>
);
export default FormSizeBtn