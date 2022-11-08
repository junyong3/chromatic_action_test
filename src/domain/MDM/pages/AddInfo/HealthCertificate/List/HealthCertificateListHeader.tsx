import { ListHeader } from '@compositions/Header'
import { To } from '@routes/To'

function HealthCertificateListHeader() {
  return (
    <ListHeader
      title="보건증 관리"
      navigation={{
        home: To.MDMAddInfoHealthCertificate,
        menuList: ['보건증 관리'],
      }}
      button={{
        text: '내역 추가',
        link: To.MDMAddInfoHealthCertificateCreate,
        sbkind: 'pages/MDM/addInfo/HealthCertificate/Create',
      }}
    />
  )
}

export default HealthCertificateListHeader
