import React from 'react'
import { Divider, Drawer, List } from '@mui/material'
import { DRAWER_WIDTH } from '@config'
import { Link } from 'react-router-dom'
import SidebarNavItem from '@components/SidebarNavItem'
import { To } from '@routes/To'
import { SampleLogoWrapper } from './StyleObj'
import { SampleLogo } from '@components/Sample/Header/StyleObj'
import { SideMenuBarProps } from './Props'

function SideMenuBar(props: SideMenuBarProps) {
  const { label3, label1, label2 } = props
  return (
    <Drawer
      variant="permanent"
      style={{
        position: 'relative',
      }}
      PaperProps={{ sx: { width: DRAWER_WIDTH } }}
    >
      <SampleLogoWrapper>
        <Link to={To.Home}>
          <SampleLogo />
        </Link>
      </SampleLogoWrapper>

      <Divider />

      <List disablePadding>
        <SidebarNavItem label={label1} to={To.IAMUsersList} />
        <Divider />
        <SidebarNavItem label={label2} to={To.IAMRolesList} />
        <Divider />
        <SidebarNavItem label={label3} to={To.IAMPermissionsList} />
      </List>
    </Drawer>
  )
}

export default SideMenuBar
