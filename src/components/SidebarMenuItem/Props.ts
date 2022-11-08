export type SidebarMenuItemProps = {
  label: string
  to?: string
  target?: string
  defaultExpend?: boolean
  subMenuList?: SidebarMenuItemProps[]
}
