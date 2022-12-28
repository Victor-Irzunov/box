import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Tooltip, Rate, Comment } from 'antd'
import React, { createElement, useState } from 'react'
import moment from 'moment'
// import { Helmet } from "react-helmet"
import { user } from '../../content/Content'

const Otzyvy = ({ product }) => {
	const [likes, setLikes] = useState(0)
	const [dislikes, setDislikes] = useState(0)
	const [action, setAction] = useState(null)

	const like = () => {
		setLikes(prev => prev + 1)
		setDislikes(0)
		setAction('liked')
	}

	const dislike = () => {
		setLikes(0)
		setDislikes(1)
		setAction('disliked')
	}


	return (
		<>
			<section className='container'>
				<article>
					{
						product.feedbacks.map(el => {
							return (
								<Comment
									actions={
										[
											<Tooltip key="comment-basic-like" title="Like">
												<span onClick={like}>
													{createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
													<span className="comment-action">{likes}</span>
												</span>
											</Tooltip>,
											<Tooltip key="comment-basic-dislike" title="Dislike">
												<span onClick={dislike}>
													{React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
													<span className="comment-action">{dislikes}</span>
												</span>
											</Tooltip>,
											<span key="comment-basic-reply-to">
												<Rate allowHalf value={+el.rating.rate} />
											</span>,
										]
									}
									key={el.id}
									author={<span>{el.name}</span>}
									avatar={<Avatar icon={<UserOutlined />} />}
									content={
										<>
											<p>
												{el.description}
											</p>
											{el.plus !== 'undefined' ?
												<p className='text-xs'>Плюсы: {el.plus}</p>
												:
												undefined
											}
											{el.minus !== 'undefined' ?
												<p className='text-xs'>Минусы: {el.minus}</p>
												:
												undefined
											}
										</>
									}
									datetime={
										<Tooltip title={el.createdAt}>
											<span>{moment(el.createdAt).fromNow()}</span>
										</Tooltip>
									}
								/>
							)
						})
					}
				</article>
			</section>
		</>
	)
}
export default Otzyvy