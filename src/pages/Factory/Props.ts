import { FactorySearchInput } from '@stores/MDM/Factory/factory.store'

export const factoryQueryKey = {
  list: ['factoryList'] as const,
  searchList: (opt: FactorySearchInput) => ['factoryList', opt] as const,
  detail: (id: string) => ['factoryDetail', id] as const,
}

export type factoryDataLayerProps = {
  pageType: 'update' | 'detail' | 'create'
}
