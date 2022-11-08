import Page from '@components/Page'
import React from 'react'
import FactoryCenterFormData from '@domain/MDM/pages/Config/Factory/Detail/FactoryCenterFormData'
import { SubHeader } from '@compositions/Header'
import { To } from '@routes/To'
import { useNavigate, useParams } from 'react-router-dom'

function FactoryDetailPage() {
  const { factoryCode } = useParams()
  const navigate = useNavigate()
  return (
    <Page>
      <SubHeader
        title={'공장/센터 정보 상세'}
        deleteButton={{
          id: 'delete',
          form: 'FactoryUpdateForm',
          type: 'submit',
        }}
        updateButton={{
          disabled: false,
          sbkind: 'pages/MDM/config/Factory/Update',
          onClick: () =>
            navigate(`${To.MDMConfigFactory}/${factoryCode}/update`),
        }}
      />

      <FactoryCenterFormData pageType={'detail'} />
    </Page>
  )
}

export default FactoryDetailPage
