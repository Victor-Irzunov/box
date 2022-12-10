import { Avatar, Divider, List, Skeleton, Image, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useScreens } from '../../../Constants/constants'

const ListSearch = ({ data, onClose }) => {
	const [loading, setLoading] = useState(false)

	const screens = useScreens()

	// const [data, setData] = useState([]);
	// const loadMoreData = () => {
	// 	if (loading) {
	// 		return;
	// 	}
	// 	setLoading(true);
	// 	fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
	// 		.then((res) => res.json())
	// 		.then((body) => {
	// 			setData([...data, ...body.results]);
	// 			setLoading(false);
	// 		})
	// 		.catch(() => {
	// 			setLoading(false);
	// 		});
	// };
	// useEffect(() => {
	// 	loadMoreData();
	// }, []);
	return (
		<div
			id="scrollableDiv"
			style={{
				height: '90%',
				overflow: 'auto',
				padding: '0 3em',
				border: '1px solid rgba(140, 140, 140, 0.2)',
				marginTop: '1em',
			}}
		>
			<InfiniteScroll
				dataLength={data.length}
				// next={loadMoreData}
				// hasMore={data.length < 100}
				loader={
					<Skeleton
						avatar
						paragraph={{
							rows: 1,
						}}
						active
					/>
				}
				endMessage={<Divider plain>Это всё, больше нет 🤐</Divider>}
				scrollableTarget="scrollableDiv"
			>
				<List
					dataSource={data}
					itemLayout={screens.xs ? "vertical" : 'horizontal'}
					renderItem={(item) => (
						<List.Item key={item.id}>
							<List.Item.Meta
								avatar={<Image width='100px' src={item.thumbnail} />}
								title={item.title}
								description={item.description}
							/>
							<span className='mr-12 font-semibold'>{item.price} BYN</span>
							<Link
								to={`/muzhskie/${item.category}/${item.id}`}
								onClick={onClose}
								className='text-blue-500 font-semibold'
							>
									Перейти
							</Link>
						</List.Item>
					)}
				/>

			</InfiniteScroll>
		</div>
	);
};
export default ListSearch