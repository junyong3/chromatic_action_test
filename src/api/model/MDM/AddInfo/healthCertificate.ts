export type healthCertificateDto = {
  healthCRETCreateDate: string
  healthCRETExpiryDate: string
  healthCertificateExpired: boolean
  healthCRETCode: string
  phoneNumber: number | string
  healthCertificateFile: FileList | null
  name: string
  department: string
}
type dataGridPageValue = {
  total: number
  page: number
  limit: number
}
export type healthCertificateListRes = {
  items: healthCertificateDto[]
} & dataGridPageValue
export type healthCertificateReq = {
  factoryName: string
  factoryCode: string
  healthCertificateFile: boolean
}
