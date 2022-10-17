import { ListPagination } from './common'
import { PointSearchCondition } from '@stores/Commerce/Point/point.store'
import { GridRowId } from '@mui/x-data-grid'

export interface PointDto {
  id: number
  registrationDate: string
  registrationFileName: string
  paymentStartDate: string
  createdName: string
  status: string
  paymentResult: {
    success: number
    fail: number
  }
}
export type PointListReq = ListPagination & {
  searchCondition: PointSearchCondition
}
export type PointListRes = ListPagination & { items: Array<PointDto> }

export interface PointFailedDto {
  id: number
  customerPhone: number
}
export type PointFailedListReq = ListPagination & {
  id: GridRowId
}
export type PointFailedListRes = ListPagination & {
  items: Array<PointFailedDto>
}

export type CreatePointTargetReq = {
  paymentDate: string
  file: File | null
  fileName: string
}
