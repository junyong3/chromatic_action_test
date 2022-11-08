import Sidebar from '@compositions/Sidebar'
import { DRAWER_WIDTH } from '@config'
import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'
import { SidebarProps } from '@compositions/Sidebar/Props'

function SidebarLayout({ menuList }: SidebarProps) {
  return (
    <Wrapper id="layout">
      <Sidebar menuList={menuList} />
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

export default SidebarLayout
