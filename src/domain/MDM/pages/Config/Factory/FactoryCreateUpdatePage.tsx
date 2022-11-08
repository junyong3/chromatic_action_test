import { useParams } from 'react-router-dom'
import Page from '@components/Page'
import React from 'react'
import FactoryCenterFormData from '@domain/MDM/pages/Config/Factory/Detail/FactoryCenterFormData'
import { SubHeader } from '@compositions/Header'

function FactoryCreateUpdatePage() {
  const { factoryCode } = useParams()
  const isCreate = !factoryCode

  return (
    <Page>
      <SubHeader
        title={'공장/센터 정보 상세'}
        saveButton={{
          id: 'save',
          form: 'FactoryUpdateForm',
          type: 'submit',
        }}
      />

      <FactoryCenterFormData pageType={isCreate ? 'create' : 'update'} />
    </Page>
  )
}

export default FactoryCreateUpdatePage
