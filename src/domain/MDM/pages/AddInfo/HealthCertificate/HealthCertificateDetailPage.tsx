import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import { To } from '@routes/To'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HealthCertificateFormData from '@domain/MDM/pages/AddInfo/HealthCertificate/Detail/HealthCertificateFormData'

function HealthCertificateDetailPage() {
  const { healthCertificateId } = useParams()
  const navigate = useNavigate()
  return (
    <Page>
      <SubHeader
        title={'보건증 정보 상세'}
        deleteButton={{
          id: 'delete',
          form: 'HealthCertificateUpdateForm',
          type: 'submit',
        }}
        updateButton={{
          disabled: false,
          sbkind: 'pages/MDM/AddInfo/HealthCertificate/Update',
          onClick: () =>
            navigate(
              `${To.MDMAddInfoHealthCertificate}/${healthCertificateId}/update`
            ),
        }}
      />
      <HealthCertificateFormData pageType={'detail'} />
    </Page>
  )
}

export default HealthCertificateDetailPage
