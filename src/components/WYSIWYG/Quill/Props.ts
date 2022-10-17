import ReactQuill from 'react-quill'

export type EditorQuillProps = {
  editorValueChange: (value: ReactQuill.Value) => void
  defaultEditorValue: string
  height?: string
  disable?: boolean
}
