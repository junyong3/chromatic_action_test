export type ManagementTypeUnion = 'logistics' | 'manufacturing'
export type saveTypeUnion = 'storage' | 'warehouse' | 'release' | 'etc'
export type keepTypeUnion = 'temperature' | 'frozen' | 'refrigerated' | 'etc'
export type warehouseDto = {
  warehouseCode: string
  warehouseName: string
  factoryCode: string
  factoryName: string
  keepType: keepTypeUnion
  saveType: saveTypeUnion
  ManagementType: ManagementTypeUnion
  memo: string
  useYN: boolean
}
type dataGridPageValue = {
  total: number
  page: number
  limit: number
}
export type warehouseListRes = {
  items: warehouseDto[]
} & dataGridPageValue
