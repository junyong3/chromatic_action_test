import styled from '@emotion/styled'

export const QuillEditorWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: flex-start;
  padding-top: 12px;
  .header {
    flex-basis: 50px;
    width: 100%;
  }
  .editor-quill {
    flex: 1;
    height: 300px;
    width: 100%;
  }
`
