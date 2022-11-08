import styled from '@emotion/styled'

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: start;
  > * {
    flex: 1;
  }
`
