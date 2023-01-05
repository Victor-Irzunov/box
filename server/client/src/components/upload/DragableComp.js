import React, { useCallback, useRef, useState } from 'react'
import { Tooltip, Upload, Modal } from 'antd'
import update from 'immutability-helper'
import { FileImageOutlined } from '@ant-design/icons'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
const type = 'DragableUploadList'
const DragableUploadListItem = ({ originNode, moveRow, file, fileList }) => {
	const ref = useRef(null)
	const index = fileList.indexOf(file)
	const [{ isOver, dropClassName }, drop] = useDrop({
		accept: type,
		collect: (monitor) => {
			const { index: dragIndex } = monitor.getItem() || {};
			if (dragIndex === index) {
				return {}
			}
			return {
				isOver: monitor.isOver(),
				dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
			}
		},
		drop: (item) => {
			moveRow(item.index, index);
		},
	})
	const [, drag] = useDrag({
		type,
		item: {
			index,
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	})
	drop(drag(ref))
	const errorNode = <Tooltip title="картинка">{originNode.props.children}</Tooltip>
	return (
		<div
			ref={ref}
			className={`ant-upload-draggable-list-item ${isOver ? dropClassName : ''}`}
			style={{
				cursor: 'move',
			}}
		>
			{file.status === 'error' ? errorNode : originNode}
		</div>
	)
}
const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file[0]);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	})
const DragableComp = ({onChange ,fileList, setFileList, }) => {
	const [previewOpen, setPreviewOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const [previewTitle, setPreviewTitle] = useState('')
	const onchange = ({ fileList: newFileList }) => {
		setFileList(newFileList)
	}
	const handleCancel = () => setPreviewOpen(false)
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj)
		}
		setPreviewImage(file.url || file.preview)
		setPreviewOpen(true)
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
	}
	const moveRow = useCallback(
		(dragIndex, hoverIndex) => {
			const dragRow = fileList[dragIndex];
			setFileList(
				update(fileList, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, dragRow],
					],
				}),
			)
		},
		[fileList],
	)
	return (
		<>
			<DndProvider backend={HTML5Backend}>
				<Upload
					fileList={fileList}
					multiple={true}
					onPreview={handlePreview}
					listType="picture-card"
					itemRender={(originNode, file, currFileList) => (
						<DragableUploadListItem
							originNode={originNode}
							file={file}
							fileList={currFileList}
							moveRow={moveRow}
						/>
					)}
					onChange={e => {
						onchange(e)
						onChange(e)
					}}
				>
					<div className='flex flex-col'>
						<div className='pt-2'>
							{"+ Добавить"}
						</div>

						<div className='mt-1'>
							<FileImageOutlined className='text-2xl' />
						</div>
					</div>
				</Upload>
			</DndProvider>
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
	)
}
export default DragableComp