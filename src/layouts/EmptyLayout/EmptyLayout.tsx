import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'

function EmptyLayout() {
  return (
    <MainWrap>
      <Main>
        <Outlet />
      </Main>
    </MainWrap>
  )
}

const MainWrap = styled.div`
  min-height: 100%;
  display: flex;
  justify-content: center;
  background: #fafafa;
`

const Main = styled.main`
  height: auto;
  width: 1152px;
  padding: 24px 32px;
`

export default EmptyLayout
