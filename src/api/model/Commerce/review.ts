import { reviewSearchInput } from '@stores/Commerce/Reviwe/review.store'

export type reviewDto = {
  id: string
  createDate: string
  updateDate: string
  productName: string
  productOption: string
  isExposure: string
  reviewType: string
  reviewContent: string
  userName: string
  imageList: Array<string> | null
  uid: string
}
type dataGridPageValue = {
  total: number
  page: number
  limit: number
}
export type reviewListRes = {
  items: reviewDto[]
} & dataGridPageValue

export type reviewReq = Omit<reviewSearchInput, 'isRange'> & {
  page: number
  limit: number
}

export type reportListDto = {
  id: string
  reportDate: string
  reportUID: string
  reportReason: string
}
export type reportListRes = {
  items: reportListDto[]
} & dataGridPageValue
