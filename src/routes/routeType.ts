export type domainType = 'ROOT' | 'IAM' | 'Commerce' | 'MDM'

export interface RouteType {
  title: string
  path?: string
  element?: JSX.Element
  children?: RouteType[]
}

export type RouteListType = {
  [key in domainType]: RouteType[]
}
