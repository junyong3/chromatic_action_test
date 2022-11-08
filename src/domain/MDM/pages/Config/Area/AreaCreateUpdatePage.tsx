import { useParams } from 'react-router-dom'
import Page from '@components/Page'
import React from 'react'
import { SubHeader } from '@compositions/Header'
import AreaFormData from '@domain/MDM/pages/Config/Area/Detail/AreaFormData'

function AreaCreateUpdatePage() {
  const { areaCode } = useParams()
  const isCreate = !areaCode

  return (
    <Page>
      <SubHeader
        title={'구역 정보 상세'}
        saveButton={{
          id: 'save',
          form: 'AreaUpdateForm',
          type: 'submit',
        }}
      />
      <AreaFormData pageType={isCreate ? 'create' : 'update'} />
    </Page>
  )
}

export default AreaCreateUpdatePage
