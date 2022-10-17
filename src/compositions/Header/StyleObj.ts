import styled from '@emotion/styled'
import { Breadcrumbs } from '@mui/material'
import Typography from '@components/Typography'

export const ListHeaderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`

export const Navigation = styled(Breadcrumbs)<{ hasbutton: 'true' | 'false' }>`
  margin-top: ${({ hasbutton }) => (hasbutton === 'true' ? '4px' : '8px')};
`

export const SubText = styled(Typography)`
  margin: 8px 0 12px 0;
`

export const SubHeaderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0 16px 0;
`
