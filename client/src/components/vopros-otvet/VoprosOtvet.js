import { Comment, List, Tooltip, Avatar, Spin, Empty } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import moment from 'moment'
import React from 'react'
import 'moment/locale/ru'
moment.locale('ru')


// const data = [
// 	{
// 		actions: ['Да, Стас, натуральная.'],
// 		author: 'Стас Борецкий',
// 		avatar: (<Avatar icon={<UserOutlined />} />),
// 		content: 'Косметика в боксах натуральная?',
// 		datetime: '2022-07-12 09:31:33',
// 	},
// 	{
// 		actions: ['Такие пожилания рассматриваются индивидуально.'],
// 		author: 'Надежда Зык',
// 		avatar: (<Avatar icon={<UserOutlined />} />),
// 		content: 'Можно ли доложить в бокс еще придметы?',
// 		datetime: '2022-06-22 11:22:33',
// 	},
// ];
const VoprosOtvet = ({ dataQuestRes = null }) => {



	if (!dataQuestRes) {
		return <Spin />
	}


	return (

		dataQuestRes.length ?

			<List
				className="comment-list"
				header={`Количество диалогов: ${dataQuestRes.length}`}
				itemLayout="horizontal"
				dataSource={dataQuestRes}
				renderItem={(item) => (
					<li>
						<Comment
							actions={[item.response]}
							author={item.name}
							avatar={<Avatar icon={<UserOutlined />} />}
							content={item.question}
							datetime={
								<Tooltip title={item.createdAt}>
									<span>{moment(item.createdAt).fromNow()}</span>
								</Tooltip>
							}
						/>
					</li>
				)}
			/>
			:
			<Empty />
	)
}
export default VoprosOtvet