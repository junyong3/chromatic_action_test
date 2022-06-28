import React from 'react'
import Sidebar from '@components/Sidebar'
import { DRAWER_WIDTH } from '@config'
import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'

function IAMLayout() {
  return (
    <Wrapper id="layout">
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
`

const Main = styled.main`
  margin-left: ${DRAWER_WIDTH}px;
  background: #fafafa;
  padding: 24px 32px;
`

export default IAMLayout
