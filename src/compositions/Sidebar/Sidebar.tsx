import { Divider, Drawer, List } from '@mui/material'
import { DRAWER_WIDTH } from '@config'
import { Link } from 'react-router-dom'
import { To } from '@routes/To'
import { LogoWrapper, Logo } from './StyleObj'
import { SidebarProps } from './Props'
import SidebarMenuItem from '@components/SidebarMenuItem'
import { Fragment } from 'react'

function Sidebar({ menuList }: SidebarProps) {
  return (
    <Drawer
      variant="permanent"
      style={{
        position: 'relative',
      }}
      PaperProps={{ sx: { width: DRAWER_WIDTH } }}
    >
      <LogoWrapper>
        <Link to={To.Home}>
          <Logo />
        </Link>
      </LogoWrapper>
      <List disablePadding>
        {menuList.map((menu, index) => (
          <Fragment key={index}>
            <Divider />
            <SidebarMenuItem item={menu} />
          </Fragment>
        ))}
      </List>
      <Divider />
    </Drawer>
  )
}

export default Sidebar
