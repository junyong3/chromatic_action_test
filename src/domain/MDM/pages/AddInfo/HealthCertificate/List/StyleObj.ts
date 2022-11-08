import styled from '@emotion/styled'

type rectBoxSY = {
  background: string
}
export const RectColorBox = styled.div<rectBoxSY>`
  width: 10px;
  height: 10px;
  background: ${(rectBoxSY) => {
    return rectBoxSY.background
  }};
  align-self: center;
  margin-right: 4px;
`
