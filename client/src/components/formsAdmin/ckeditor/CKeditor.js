import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import './CKeditor.css'

function CKeditor({ onChange, setTextArticle , data}) {
	const handleOnChange = (e, editor) => {
		setTextArticle(editor.getData())
	}
	return (
		<div className='editor' >
			<CKEditor
				editor={ClassicEditor}
				onChange={(e, editor) => {
					handleOnChange(e, editor)
					onChange(e)
				}}
				data={data}
			/>
		</div>
	)
}

export default CKeditor