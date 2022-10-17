import ReactQuill from 'react-quill'

// TODO (https://github.com/zenoamaro/react-quill/issues/784)
// ReactQuill toolbar 2개 생기는 버그는 merge는 되었지만 아직 npm에 올라가지 않음
// 나중에 npm 업데이트 확인되면, 버전 올리고 해당 class는 제거 예정.

export default class CustomQuill extends ReactQuill {
  destroyEditor() {
    if (!this.editor) return
    this.unhookEditor(this.editor)
  }

  instantiateEditor() {
    if (this.editor) {
      this.hookEditor(this.editor)
    }
    super.instantiateEditor()
  }
}
