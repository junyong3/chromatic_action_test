import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import { To } from '@routes/To'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LocationFormData from '@domain/MDM/pages/Config/Location/Detail/LocationFormData'

function LocationDetailPage() {
  const { locationCode } = useParams()
  const navigate = useNavigate()
  return (
    <Page>
      <SubHeader
        title={'로케이션 정보 상세'}
        deleteButton={{
          id: 'delete',
          form: 'LocationUpdateForm',
          type: 'submit',
        }}
        updateButton={{
          disabled: false,
          sbkind: 'pages/MDM/config/Location/Update',
          onClick: () =>
            navigate(`${To.MDMConfigLocation}/${locationCode}/update`),
        }}
      />
      <LocationFormData pageType={'detail'} />
    </Page>
  )
}

export default LocationDetailPage
