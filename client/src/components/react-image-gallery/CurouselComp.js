import ImageGallery from 'react-image-gallery'
import React from 'react';

const images = [
	{
		original: 'https://picsum.photos/id/1018/1000/600/',
		thumbnail: 'https://picsum.photos/id/1018/250/150/',
	},
	{
		original: 'https://picsum.photos/id/1015/1000/600/',
		thumbnail: 'https://picsum.photos/id/1015/250/150/',
	},
	{
		original: 'https://picsum.photos/id/1019/1000/600/',
		thumbnail: 'https://picsum.photos/id/1019/250/150/',
	},
	{
		original: 'https://img.championat.com/c/1350x759/news/big/g/t/trendy-krossovok-2021_16143524381305802667.jpg',
		thumbnail: 'https://img.championat.com/c/1350x759/news/big/g/t/trendy-krossovok-2021_16143524381305802667.jpg',
	},
	{
		original: 'https://picsum.photos/id/1018/1000/600/',
		thumbnail: 'https://picsum.photos/id/1018/250/150/',
	},
	{
		original: 'https://picsum.photos/id/1019/1000/600/',
		thumbnail: 'https://picsum.photos/id/1019/250/150/',
	},
	{
		original: 'https://img.championat.com/c/1350x759/news/big/g/t/trendy-krossovok-2021_16143524381305802667.jpg',
		thumbnail: 'https://img.championat.com/c/1350x759/news/big/g/t/trendy-krossovok-2021_16143524381305802667.jpg',
	},

];

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