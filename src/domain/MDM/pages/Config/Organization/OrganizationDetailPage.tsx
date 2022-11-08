import Page from '@components/Page'
import React from 'react'
import OrganizationFormData from '@domain/MDM/pages/Config/Organization/Detail/OrganizationFormData'
import { useNavigate, useParams } from 'react-router-dom'
import { SubHeader } from '@compositions/Header'
import { To } from '@routes/To'

function OrganizationDetailPage() {
  const { deptCode } = useParams()
  const navigate = useNavigate()

  return (
    <Page>
      <SubHeader
        title={'조직 정보 상세'}
        deleteButton={{
          id: 'delete',
          form: 'OrgUpdateForm',
          type: 'submit',
        }}
        updateButton={{
          sbkind: 'pages/MDM/config/Org/Update',
          onClick: () => navigate(`${To.MDMConfigOrg}/${deptCode}/update`),
        }}
      />
      <OrganizationFormData pageType={'detail'} />
    </Page>
  )
}

export default OrganizationDetailPage
