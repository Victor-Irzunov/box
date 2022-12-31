import React from 'react'
import HeaderLinks from './headerLinks/HeaderLinks'
import HeaderTimeTel from './headerTimeTel/HeaderTimeTel'
function HeaderAddress() {
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