export type factoryTypeUnion = 'logistics' | 'manufacturing'
export type FactoryDto = {
  factoryCode: string
  factoryName: string
  zipcode: string
  address1: string
  address2: string
  companyNumber: number | string
  phoneNumber: string
  centerType: factoryTypeUnion
  manager: string
  memo: string
  useYN: boolean
}
type dataGridPageValue = {
  total: number
  page: number
  limit: number
}

export type FactoryListRes = {
  items: FactoryDto[]
} & dataGridPageValue

export type FactoryReq = {
  factoryCode: string
  factoryName: string
}
