// 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
import ReactQuill from 'react-quill'
import ImageResize from 'quill-image-resize-module-react'

ReactQuill.Quill.register('modules/imageResize', ImageResize)

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  [{ size: ['small', false, 'large', 'huge'] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote'],
  [
    { align: '' },
    { align: 'center' },
    { align: 'right' },
    { align: 'justify' },
  ],
  [{ list: 'ordered' }, { list: 'bullet' }],

  [
    'link',
    // 'video',
    'urlImage',
    // 'image'
  ],
  [
    { color: [] },
    { background: [] },
    // 'code-block'
  ],

  [{ font: [] }],
]

export const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'background',
  'color',
  'link',
  'image',
  'urlImage',
  'video',
  'code-block',
  'width',
]

export const modules = {
  toolbar: {
    container: toolbarOptions,
    handlers: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      urlImage: () => {},
    },
  },
  imageResize: {
    parchment: ReactQuill.Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize', 'Toolbar'],
    handleStyles: {
      // backgroundColor: 'red',
      // border: 'black',
    },
  },
}

export const imageUrlHandler = (q: ReactQuill) => {
  // 이미지 핸들 로직
  const tooltip = q.getEditor().theme.tooltip
  const originalSave = tooltip.save
  const originalHide = tooltip.hide
  // tooltip.root.classList.add('toolbar-img-url')
  tooltip.save = function () {
    const range = q.getEditor().getSelection(true)
    const value = this.textbox.value
    if (value) {
      q.getEditor().insertEmbed(range.index, 'image', value, 'user')
    }
  }

  tooltip.hide = function () {
    tooltip.save = originalSave
    tooltip.hide = originalHide
    tooltip.hide()
  }
  tooltip.edit('urlImage')
  tooltip.textbox.placeholder = 'Image URL'
}
export const toolbarAddIcon = () => {
  const icon = ReactQuill.Quill.import('ui/icons')
  icon[
    'urlImage'
  ] = `<svg  aria-hidden="true" viewBox="0 0 24 24" data-testid="AddPhotoAlternateIcon" aria-label="fontSize medium"><path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z"></path></svg>`
}
