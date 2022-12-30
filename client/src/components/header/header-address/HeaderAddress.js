import React from 'react'
// import { useLocation } from 'react-router-dom'
import HeaderLinks from './headerLinks/HeaderLinks'
import HeaderTimeTel from './headerTimeTel.js/HeaderTimeTel'
// import { useScreens } from '../../../Constants/constants'

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