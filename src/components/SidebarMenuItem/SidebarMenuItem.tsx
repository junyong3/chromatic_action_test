import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SxProps,
  Theme,
} from '@mui/material'
import { Fragment, useState } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import { SidebarMenuItemProps } from './Props'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

function SidebarMenuItem({
  item,
  sx,
}: {
  item: SidebarMenuItemProps
  sx?: SxProps<Theme>
}) {
  const Component = item.subMenuList?.length ? MultiMenu : SingleMenu
  return <Component item={item} sx={sx} />
}

const SingleMenu = ({
  item: { to = '#', label },
  sx,
}: {
  item: SidebarMenuItemProps
  sx?: SxProps<Theme>
}) => {
  const navigate = useNavigate()
  const isMatch = useMatch(to)
  const handleClick = () => navigate(to)
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick} selected={!!isMatch}>
        <ListItemText primary={label} sx={sx} />
      </ListItemButton>
    </ListItem>
  )
}

const MultiMenu = ({ item }: { item: SidebarMenuItemProps }) => {
  const { subMenuList = [] } = item
  const [expend, setExpend] = useState(item.defaultExpend ?? false)
  const handleClick = () => {
    setExpend((prev) => !prev)
  }

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={item.label} />
        {expend ? (
          <ExpandLess color={'action'} />
        ) : (
          <ExpandMore color={'action'} />
        )}
      </ListItem>
      <Collapse in={expend} timeout="auto" unmountOnExit>
        <List disablePadding>
          {subMenuList.map((subMenu, key) => (
            <Fragment key={key}>
              <Divider />
              <SidebarMenuItem item={subMenu} sx={{ pl: 2 }} />
            </Fragment>
          ))}
        </List>
      </Collapse>
    </>
  )
}

export default SidebarMenuItem
