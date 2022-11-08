import { healthCertificateSearchInput } from '@stores/MDM/AddInfo/healthCertificate.store'

export const HealthCertificateQueryKey = {
  list: ['HealthCertificateList'] as const,
  searchList: (opt: healthCertificateSearchInput) =>
    ['HealthCertificateList', opt] as const,
  detail: (id: string) => ['HealthCertificateDetail', id] as const,
}

export type HealthCertificateDataLayerProps = {
  pageType: 'update' | 'detail' | 'create'
}
export type HealthCertificateFormDataProps = {
  pageType: 'update' | 'detail' | 'create'
}
