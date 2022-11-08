import styled from '@emotion/styled'

export const CancelBox = styled.div<{ isTab: boolean }>`
  ${({ isTab }) => {
    return !isTab
      ? {
          border: '1px solid rgba(224, 224, 224, 1)',
          padding: '16px',
        }
      : ''
  }}

  border-radius: 4px;
  background-color: white;

  > .conditionWrap {
    width: 100%;
    padding: 8px;
  }

  > .buttonWrap {
    width: 100%;
    padding-top: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
