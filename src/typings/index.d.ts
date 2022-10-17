/// <reference types="vite-plugin-svgr/client" />
declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module 'quill-image-resize-module-react'

declare module 'quill' {
  import Quill = require('ReactQuill')
  export default Quill
}
