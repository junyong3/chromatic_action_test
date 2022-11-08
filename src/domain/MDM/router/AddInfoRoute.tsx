import { RouteType } from '@src/routes/routeType'
import DocTitle from '@components/Page/DocTitle'
import {
  HealthCertificateCreateUpdatePage,
  HealthCertificateDetailPage,
  HealthCertificateListPage,
} from '@domain/MDM/pages/AddInfo/HealthCertificate'
export const addInfo: RouteType = {
  title: '부가정보',
  path: 'add-info',
  children: [
    {
      path: 'health-certificate',
      title: '보건증 관리',
      element: (
        <DocTitle title={'보건증 관리'}>
          <HealthCertificateListPage />
        </DocTitle>
      ),
    },
  ],
}
// Certificate --> 약어 CERT
export const addInfoChildren: RouteType[] = [
  {
    path: 'add-info/health-certificate/create',
    title: '보건증 등록',
    element: (
      <DocTitle title={'보건증 등록'}>
        <HealthCertificateCreateUpdatePage />
      </DocTitle>
    ),
  },
  {
    path: 'add-info/health-certificate/:healthCertificateId',
    title: '보건증 상세',
    element: (
      <DocTitle title={'보건증 정보 상세'}>
        <HealthCertificateDetailPage />
      </DocTitle>
    ),
  },
  {
    path: 'add-info/health-certificate/:healthCertificateId/update',
    title: '보건증 수정',
    element: (
      <DocTitle title={'보건증 수정'}>
        <HealthCertificateCreateUpdatePage />
      </DocTitle>
    ),
  },
]
