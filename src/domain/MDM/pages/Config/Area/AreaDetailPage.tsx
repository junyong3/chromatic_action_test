import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import { To } from '@routes/To'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AreaFormData from '@domain/MDM/pages/Config/Area/Detail/AreaFormData'

function AreaDetailPage() {
  const { areaCode } = useParams()
  const navigate = useNavigate()
  return (
    <Page>
      <SubHeader
        title={'구역 정보 상세'}
        deleteButton={{
          id: 'delete',
          form: 'AreaUpdateForm',
          type: 'submit',
        }}
        updateButton={{
          disabled: false,
          sbkind: 'pages/MDM/config/Area/Update',
          onClick: () => navigate(`${To.MDMConfigArea}/${areaCode}/update`),
        }}
      />
      <AreaFormData pageType={'detail'} />
    </Page>
  )
}

export default AreaDetailPage
