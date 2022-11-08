import { keepTypeUnion } from './warehouse'

export type locationType =
  | 'heavyRack'
  | 'flatRack'
  | 'slidingRack'
  | 'shelfRack'
  | 'return'
  | 'warehouse'
  | 'etc'
export type locationCellAlign = 'left' | 'center' | 'right'

export type locationDto = {
  locationCode: string
  locationName: string
  cellCol: string
  cellStage: string
  cellAlign: locationCellAlign
  locationType: locationType
  areaCode: string
  areaName: string
  warehouseCode: string
  warehouseName: string
  factoryCode: string
  factoryName: string
  keepType: keepTypeUnion
  useYN: boolean
}
type dataGridPageValue = {
  total: number
  page: number
  limit: number
}
export type locationListRes = {
  items: locationDto[]
} & dataGridPageValue
export type locationReq = {
  warehouseCode: string
  factoryCode: string
  areaCode: string
}
