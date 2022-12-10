import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined,UserOutlined } from '@ant-design/icons'
import { Avatar, Tooltip, Rate,Comment } from 'antd'
import React, { createElement, useState } from 'react'
import moment from 'moment'
// import { Helmet } from "react-helmet"
import { user } from '../../content/Content'

const Otzyvy = () => {
	const [likes, setLikes] = useState(13)
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

	const actions = [
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
		<span key="comment-basic-reply-to"><Rate allowHalf defaultValue={4.5} /></span>,
	]


	return (
		<>
			<section className='container'>
				<article>
					{
						user.map(el => {
							return (
								<Comment
									actions={actions}
									key={el.id}
									author={<span>{el.user}</span>}
									avatar={<Avatar icon={<UserOutlined />} />}
									content={
										<p>
											{el.text}
										</p>
									}
									datetime={
										<Tooltip title={el.date}>
											<span>{moment(el.date).fromNow()}</span>
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