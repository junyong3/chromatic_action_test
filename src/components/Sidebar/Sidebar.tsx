import styled from '@emotion/styled'
import React from 'react'
import { Divider, Drawer, List } from '@mui/material'
import { default as LogoSVG } from '@assets/svg/JYG.svg'
import { DRAWER_WIDTH } from '@config'
import { Link } from 'react-router-dom'
import SidebarNavItem from '@components/SidebarNavItem'
import { To } from '@routes/To'

function Sidebar() {
  return (
    <Drawer variant="permanent" PaperProps={{ sx: { width: DRAWER_WIDTH } }}>
      <LogoWrapper>
        <Link to={To.Home}>
          <Logo />
        </Link>
      </LogoWrapper>

      <Divider />

      <List disablePadding>
        <SidebarNavItem label="사용자 관리" to={To.IAMUsersList} />
        <Divider />
        <SidebarNavItem label="역할 관리" to={To.IAMRolesList} />
        <Divider />
        <SidebarNavItem label="권한 관리" to={To.IAMPermissionsList} />
      </List>
    </Drawer>
  )
}

const LogoWrapper = styled.div`
  padding: 16px 8px;

  > a {
    display: inline-block;
  }
`

const Logo = styled.span`
  display: inline-block;
  width: 88px;
  height: 40px;
  background-image: url(${LogoSVG});
  background-repeat: no-repeat;
  background-position: center;
`

export default Sidebar
