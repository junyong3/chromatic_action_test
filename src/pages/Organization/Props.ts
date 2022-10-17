import { SearchInput } from '@stores/MDM/Organization/org.store'

export const OrgQueryKey = {
  list: ['OrgList'] as const,
  searchList: (opt: SearchInput) => ['OrgList', opt] as const,
  detail: (id: string) => ['OrgDetail', id] as const,
}

export type OrganizationDataLayerProps = {
  pageType: 'update' | 'detail' | 'create'
}
