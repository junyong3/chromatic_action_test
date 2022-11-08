import { locationSearchInput } from '@stores/MDM/Config/location.store'

export const LocationQueryKey = {
  list: ['LocationList'] as const,
  searchList: (opt: locationSearchInput) => ['LocationList', opt] as const,
  detail: (id: string) => ['LocationDetail', id] as const,
}

export type LocationDataLayerProps = {
  pageType: 'update' | 'detail' | 'create'
}
export type LocationCreateUpdatePageProps = {
  pageType: 'update' | 'detail' | 'create'
}
