import { warehouseSearchInput } from '@stores/MDM/Config/warehouse.store'

export const WarehouseQueryKey = {
  list: ['WarehouseList'] as const,
  searchList: (opt: warehouseSearchInput) => ['WarehouseList', opt] as const,
  detail: (id: string) => ['WarehouseDetail', id] as const,
}

export type WarehouseDataLayerProps = {
  pageType: 'update' | 'detail' | 'create'
}

export type WarehouseCreateUpdatePageProps = {
  pageType: 'update' | 'detail' | 'create'
}
