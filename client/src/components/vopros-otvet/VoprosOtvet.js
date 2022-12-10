import { Comment, List, Tooltip, Avatar } from 'antd'
import {UserOutlined} from '@ant-design/icons'
import moment from 'moment'
import React from 'react'
import 'moment/locale/ru'
moment.locale('ru')


const data = [
	{
		actions:['Да, Стас, натуральная.'],
		author: 'Стас Борецкий',
		avatar: (<Avatar icon={<UserOutlined />} />),
		content: 'Косметика в боксах натуральная?',
		datetime: '2022-07-12 09:31:33',
	},
	{
		actions: ['Такие пожилания рассматриваются индивидуально.'],
		author: 'Надежда Зык',
		avatar:(<Avatar  icon={<UserOutlined />} />),
		content: 'Можно ли доложить в бокс еще придметы?',
		datetime: '2022-06-22 11:22:33',
	},
];
const VoprosOtvet = () => (
	<List
		className="comment-list"
		header={`${data.length} вопроса`}
		itemLayout="horizontal"
		dataSource={data}
		renderItem={(item) => (
			<li>
				<Comment
					actions={item.actions}
					author={item.author}
					avatar={item.avatar}
					content={item.content}
					datetime={
						<Tooltip title={item.datetime}>
							<span>{moment(item.datetime).fromNow()}</span>
						</Tooltip>
					}
				/>
			</li>
		)}
	/>
);
export default VoprosOtvet