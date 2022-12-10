import Icon, { HomeOutlined } from '@ant-design/icons';
import React from 'react';
const ArrowSvg = () => (
	<svg t="1667627371207" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22573" xmlnsXlink="http://www.w3.org/1999/xlink" width="64" height="64"><path d="M170.666667 522.666667h736v-21.333334H153.6L398.933333 256l-14.933333-14.933333L119.466667 503.466667l-6.4 8.533333 6.4 8.533333L384 782.933333l14.933333-14.933333L153.6 522.666667h6.4z" fill="#000" p-id="22574"></path></svg>
)

const ArrowIcon = (props) => <Icon component={ArrowSvg} {...props} />

const ArrowLeft = () => (
	<ArrowIcon
		className='text-lg'
	/>

);
export default ArrowLeft