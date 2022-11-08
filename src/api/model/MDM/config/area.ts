import { keepTypeUnion } from './warehouse'

export type areaDto = {
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
export type areaListRes = {
  items: areaDto[]
} & dataGridPageValue
export type areaReq = {
  areaCode: string
}
