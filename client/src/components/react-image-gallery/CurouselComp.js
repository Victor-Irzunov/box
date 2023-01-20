import ImageGallery from 'react-image-gallery'
import React from 'react'

const CourouselComp = ({ imgArr }) => {
	return (
		<ImageGallery
			items={imgArr}
			thumbnailPosition='bottom'
			// showBullets
			showPlayButton={false}
			// showIndex
		/>
	)
}

export default CourouselComp