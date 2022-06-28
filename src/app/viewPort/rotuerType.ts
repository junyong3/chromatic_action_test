export type routerBase = {
  name: string
  path: string
  type?: string
  component: JSX.Element
}

export type IAMRouterList =
  | 'Base'
  | 'Home'
  | 'UsersList'
  | 'UsersDetail'
  | 'RolesList'
  | 'RolesCreate'
  | 'RolesDetail'
  | 'RolesUpdate'
  | 'PermissionsList'
  | 'PermissionsCreate'
  | 'PermissionsDetail'
  | 'PermissionsUpdate'
  | 'Empty'

export type rootRouterList = 'Home' | 'Login' | 'ChangePassword' | 'IAM'

export type viewIdType = Exclude<rootRouterList, 'IAM'>
export type domainViewIdType = IAMRouterList
export type domainType = 'IAM' | 'ROOT'

export type RouteConfig = {
  [P in domainType]: routerBase[]
}
