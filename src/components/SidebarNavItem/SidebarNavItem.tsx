import { ListItem, ListItemButton, ListItemText } from '@mui/material'
import React from 'react'
import { useMatch, useNavigate } from 'react-router-dom'

interface SidebarNavItemProps {
  label: string
  to: string
}

function SidebarNavItem({ label, to }: SidebarNavItemProps) {
  const navigate = useNavigate()
  const isMatch = useMatch(to)
  const handleClick = () => navigate(to)

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={handleClick} selected={!!isMatch}>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  )
}

export default SidebarNavItem
