import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'

function EmptyLayout() {
  return (
    <MainWrap>
      <ContentWrap>
        <Outlet />
      </ContentWrap>
    </MainWrap>
  )
}

const MainWrap = styled.div`
  min-height: 100%;
  display: flex;
  justify-content: center;
  background: #fafafa;
`

export const ContentWrap = styled.main`
  height: auto;
  width: 1152px;
  padding: 24px 32px;
`

export default EmptyLayout
