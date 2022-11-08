export type OrganizationDto = {
  departmentCode: string
  departmentName: string
  zipcode: string
  address1: string
  address2: string
  manager: string
  memo: string
  useYN: boolean
}
type dataGridPageValue = {
  total: number
  page: number
  limit: number
}
export type orgListRes = {
  items: OrganizationDto[]
} & dataGridPageValue
export type orgReq = {
  departmentCode: string
  departmentName: string
}
