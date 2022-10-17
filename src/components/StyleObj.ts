import styled from '@emotion/styled'

export const FlexWrap = styled.div<{
  width?: string
  backgroundColor?: string
  flexBasis?: string
}>`
  width: ${({ width }) => width ?? ' 600px'};
  height: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor ?? ' #f6f5f5'};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  gap: 18px;
  padding: 20px;

  > div {
    flex-basis: ${({ flexBasis }) => flexBasis ?? 'auto'};
  }
`
