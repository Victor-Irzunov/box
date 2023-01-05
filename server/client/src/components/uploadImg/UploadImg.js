import { Upload, Modal } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useEffect, useState } from 'react'


const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	})



const UploadImg = ({ onChange, fileList, setFileList }) => {
	// const [fileList, setFileList] = useState([])
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState('');
	const [previewTitle, setPreviewTitle] = useState('');
	const handleCancel = () => setPreviewOpen(false)


	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj)
		}
		setPreviewImage(file.url || file.preview)
		setPreviewOpen(true)
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
	}
	const onchange = ({ fileList: newFileList }) => {
		setFileList(newFileList)
	}


	// useEffect(() => {
	// 	setFileList(fileList2)
	// }, [fileList2])


	return (
		<>
			{/* <ImgCrop rotate> */}
				<Upload
					listType="picture-card"
					fileList={fileList}
					multiple={true}
					onChange={e => {
						onchange(e)
						onChange(e)
					}}
					onPreview={handlePreview}
				>
					{fileList.length < 10 && '+ Upload'}
				</Upload>
			{/* </ImgCrop> */}
			<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
				<img
					alt="example"
					style={{
						width: '100%',
					}}
					src={previewImage}
				/>
			</Modal>
		</>
	);
};
export default UploadImg