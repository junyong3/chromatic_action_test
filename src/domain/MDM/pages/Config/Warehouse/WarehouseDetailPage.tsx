import Page from '@components/Page'
import WarehouseFormData from '@domain/MDM/pages/Config/Warehouse/Detail/WarehouseFormData'
import { SubHeader } from '@compositions/Header'
import { To } from '@routes/To'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function WarehouseDetailPage() {
  const { warehouseCode } = useParams()
  const navigate = useNavigate()
  return (
    <Page>
      <SubHeader
        title={'창고 정보 상세'}
        deleteButton={{
          id: 'delete',
          form: 'WarehouseUpdateForm',
          type: 'submit',
        }}
        updateButton={{
          disabled: false,
          sbkind: 'pages/MDM/config/Warehouse/Update',
          onClick: () =>
            navigate(`${To.MDMConfigWarehouse}/${warehouseCode}/update`),
        }}
      />
      <WarehouseFormData pageType={'detail'} />
    </Page>
  )
}

export default WarehouseDetailPage
