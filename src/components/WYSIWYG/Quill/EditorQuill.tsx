import { useCallback, useEffect, useRef, useState } from 'react'
import { EditorQuillProps } from '@components/WYSIWYG/Quill/Props'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {
  formats,
  imageUrlHandler,
  modules,
  toolbarAddIcon,
} from '@components/WYSIWYG/Quill/Options'
import './style/custom-quill-style.css'
import CustomQuill from '@components/WYSIWYG/Quill/CustomQuill'

function EditorQuill(props: EditorQuillProps) {
  const {
    defaultEditorValue,
    editorValueChange,
    disable = false,
    height,
  } = props
  const quillRef = useRef<ReactQuill>(null)
  const [editorValue, setEditorValue] = useState<ReactQuill.Value>('')

  toolbarAddIcon()

  useEffect(() => {
    if (quillRef.current) {
      const quillObj = quillRef.current
      const toolbar = quillObj.getEditor().getModule('toolbar')
      // console.log(quillObj)
      if (height) {
        quillObj.editor.container.children[0].style.minHeight = height
        quillObj.editor.container.children[0].style.maxHeight = height
      }

      toolbar.addHandler('urlImage', imageUrlHandler.bind(null, quillObj))
    }
  }, [height, quillRef])
  // const [getText, setText] = useState('')

  const onChangeEditorValue = useCallback(
    (editorValue: ReactQuill.Value) => {
      // if (quillRef.current) {
      //   const quillObj = quillRef.current
      //   console.log(quillObj.getEditor().editor.delta.ops)
      // }
      setEditorValue(editorValue)
      editorValueChange(editorValue)
    },
    [editorValueChange]
  )

  useEffect(() => {
    setEditorValue(defaultEditorValue)
  }, [defaultEditorValue])

  return (
    <CustomQuill
      style={{
        backgroundColor: '#fff',
      }}
      ref={quillRef}
      placeholder={'내용을 입력하세요'}
      // defaultValue={defaultEditorValue}
      value={editorValue || ''}
      onChange={onChangeEditorValue}
      tabIndex={2}
      theme="snow"
      modules={modules}
      formats={formats}
      readOnly={disable}
    ></CustomQuill>
  )
}

export default EditorQuill
