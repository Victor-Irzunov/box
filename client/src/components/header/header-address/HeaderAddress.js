import React from 'react'
// import logo from './img/logo.png'
// import { useLocation } from 'react-router-dom'
import HeaderLinks from './headerLinks/HeaderLinks'
import HeaderTimeTel from './headerTimeTel.js/HeaderTimeTel'
import { useScreens } from '../../../Constants/constants'


	// xs: '480px',
	// sm: '576px',
	// md: '768px',
	// lg: '992px',
	// xl: '1200px',
	// xxl: '1600px',
 
function HeaderAddress() {
	// const screens = useScreens()
	// console.log('screens:',screens)

	return (
		<section className={`pt-1 pb-1 font-light`}>
			<div className='container'>
				<div className={`flex justify-between items-center`}>
					<div>
						<HeaderLinks />
					</div>
					<div className=''>
						<HeaderTimeTel />
					</div>
				</div>
			</div >
		</section >
	)
}

export default HeaderAddress