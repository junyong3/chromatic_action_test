import { useParams } from 'react-router-dom'
import Page from '@components/Page'
import React from 'react'
import { SubHeader } from '@compositions/Header'
import LocationFormData from '@domain/MDM/pages/Config/Location/Detail/LocationFormData'

function LocationCreateUpdatePage() {
  const { locationCode } = useParams()
  const isCreate = !locationCode

  return (
    <Page>
      <SubHeader
        title={'로케이션 정보 상세'}
        saveButton={{
          id: 'save',
          form: 'LocationUpdateForm',
          type: 'submit',
        }}
      />
      <LocationFormData pageType={isCreate ? 'create' : 'update'} />
    </Page>
  )
}

export default LocationCreateUpdatePage
