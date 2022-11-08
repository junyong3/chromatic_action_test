import { useParams } from 'react-router-dom'
import Page from '@components/Page'
import React from 'react'
import { SubHeader } from '@compositions/Header'
import HealthCertificateFormData from '@domain/MDM/pages/AddInfo/HealthCertificate/Detail/HealthCertificateFormData'

function HealthCertificateCreateUpdatePage() {
  const { healthCertificateId } = useParams()
  const isCreate = !healthCertificateId
  return (
    <Page>
      <SubHeader
        title={'보건증 정보 상세'}
        saveButton={{
          id: 'save',
          form: 'HealthCertificateUpdateForm',
          type: 'submit',
        }}
      />
      <HealthCertificateFormData pageType={isCreate ? 'create' : 'update'} />
    </Page>
  )
}

export default HealthCertificateCreateUpdatePage
