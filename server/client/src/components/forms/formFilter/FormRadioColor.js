import { Radio, Space } from 'antd'
import React, { useState } from 'react'

const FormRadioColor = () => {
	const onChange = e => {
		console.log('radio checked', e.target.value)
	}

	const color = [
		{
			value: 'red',
			class: 'bg-red-500',
			id: 1,
		},
		{
			value: 'white',
			class: 'border border-gray-300 bg-white',
			id: 2,
		},
		{
			value: 'blue',
			class: 'bg-blue-500',
			id: 3,
		},
		{
			value: 'green',
			class: 'bg-green-500',
			id: 4,
		},
		{
			value: 'yellow',
			class: 'bg-yellow-300',
			id: 5,
		},
		{
			value: 'black',
			class: 'bg-black',
			id: 6,
		},
		{
			value: 'blue',
			class: 'bg-blue-300',
			id: 7,
		},
		{
			value: 'pink',
			class: 'bg-pink-300',
			id: 8,
		},
		{
			value: 'gray',
			class: 'bg-gray-400',
			id: 9,
		},
	]



	return (
		<div className='mb-2 flex justify-start flex-wrap'>
			{color.map(el => {
				return (
					<label className='relative' key={el.id}>
						<input type='radio' name='radio' className='radio' onClick={onChange} value={el.value} />
						<span className={`absolute top-0 left-0 w-6 h-6 ${el.class}`} />
					</label>
				)
			})}
		</div>
	)
}
export default FormRadioColor