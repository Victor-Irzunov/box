import { UploadOutlined } from '@ant-design/icons'
import { Button, message, Upload } from 'antd'
import React from 'react'
// const props = {
// 	name: 'file',
// 	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
// 	headers: {
// 		authorization: 'authorization-text',
// 	},
// 	onChange(info) {
// 		if (info.file.status !== 'uploading') {
// 			console.log(info.file, info.fileList)
// 		}
// 		if (info.file.status === 'done') {
// 			message.success(`${info.file.name} file uploaded successfully`)
// 		} else if (info.file.status === 'error') {
// 			message.error(`${info.file.name} file upload failed.`)
// 		}
// 	},
// }
const UploadImg = ({ id, }) => {

	return (
		<Upload
			action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
			listType="picture"
			maxCount={1}
			className={'absolute top-2 right-5'}>
			<Button
				icon={<UploadOutlined />}
				onClick={() => console.log('id: ', id)}
			>
				Загрузить фото (max: 1, 1920x700)
			</Button>
		</Upload>
	)
}
export default UploadImg