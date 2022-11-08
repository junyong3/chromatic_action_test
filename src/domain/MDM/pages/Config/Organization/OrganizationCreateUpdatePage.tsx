import Page from '@components/Page'
import React from 'react'
import OrganizationFormData from '@domain/MDM/pages/Config/Organization/Detail/OrganizationFormData'
import { useParams } from 'react-router-dom'
import { SubHeader } from '@compositions/Header'

function OrganizationCreateUpdatePage() {
  const { deptCode } = useParams()
  const isCreate = !deptCode

  return (
    <Page>
      <SubHeader
        title={'조직 정보 상세'}
        saveButton={{
          id: 'save',
          form: 'OrgUpdateForm',
          type: 'submit',
        }}
      />
      <OrganizationFormData pageType={isCreate ? 'create' : 'update'} />
    </Page>
  )
}

export default OrganizationCreateUpdatePage
