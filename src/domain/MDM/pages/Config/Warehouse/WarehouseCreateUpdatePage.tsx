import { useParams } from 'react-router-dom'
import Page from '@components/Page'
import React from 'react'
import WarehouseFormData from '@domain/MDM/pages/Config/Warehouse/Detail/WarehouseFormData'
import { SubHeader } from '@compositions/Header'

function WarehouseCreateUpdatePage() {
  const { warehouseCode } = useParams()
  const isCreate = !warehouseCode

  return (
    <Page>
      <SubHeader
        title={'창고 정보 상세'}
        saveButton={{
          id: 'save',
          form: 'WarehouseUpdateForm',
          type: 'submit',
        }}
      />
      <WarehouseFormData pageType={isCreate ? 'create' : 'update'} />
    </Page>
  )
}

export default WarehouseCreateUpdatePage
