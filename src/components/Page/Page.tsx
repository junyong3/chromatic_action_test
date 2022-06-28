import React, { PropsWithChildren } from 'react'
import styled from '@emotion/styled'

function Page({ children }: PropsWithChildren<Record<string, unknown>>) {
  return <Main id="page">{children}</Main>
}

const Main = styled.main`
  width: 100%;
`

export default Page
