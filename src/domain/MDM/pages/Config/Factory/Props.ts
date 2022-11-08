import { FactorySearchInput } from '@stores/MDM/Config/factory.store'

export const factoryQueryKey = {
  list: ['factoryList'] as const,
  searchList: (opt: FactorySearchInput) => ['factoryList', opt] as const,
  detail: (id: string) => ['factoryDetail', id] as const,
}

export type factoryDataLayerProps = {
  pageType: 'update' | 'detail' | 'create'
}

export type FactoryFormDataProps = {
  pageType: 'update' | 'detail' | 'create'
}
