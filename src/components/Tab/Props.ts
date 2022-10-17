import { TabsProps } from '@mui/material'
import React from 'react'

export interface TabProp extends TabsProps {
  defaultIndex?: number
  tabList: {
    tabKey?: string
    label: string
    children: JSX.Element
  }[]
}
export interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
