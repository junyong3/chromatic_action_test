import { areaSearchInput } from '@stores/MDM/Config/area.store'

export const AreaQueryKey = {
  list: ['AreaList'] as const,
  searchList: (opt: areaSearchInput) => ['AreaList', opt] as const,
  detail: (id: string) => ['AreaDetail', id] as const,
}

export type AreaDataLayerProps = {
  pageType: 'update' | 'detail' | 'create'
}
export type AreaCreateUpdatePageProps = {
  pageType: 'update' | 'detail' | 'create'
}
