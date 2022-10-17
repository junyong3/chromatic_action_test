import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import { useMutationWrap } from '@queries/useMutation'
import { useQueryWrap } from '@queries/useQuery'
import { MaterialInfoTS, MaterialQueryKey } from '@pages/Material/Props'
import NetworkService from '@api/NetworkService'
import { MDM_MATERIAL_API_PATH } from '@api/path/MDM/materialPath'
import React, { useEffect, useState } from 'react'
import LoadingService from '@services/LoadingService'
import SnackbarService from '@services/SnackbarService'
import { To } from '@routes/To'
import { FormProvider, useForm } from 'react-hook-form'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import { Stack } from '@mui/material'
import MaterialCode from '@pages/Material/InputData/MaterialCode'
import MaterialName from '@pages/Material/InputData/MaterialName'
import Group from '@pages/Material/InputData/Group'
import Ph1 from '@pages/Material/InputData/Ph1'
import Ph2 from '@pages/Material/InputData/Ph2'
import Ph3 from '@pages/Material/InputData/Ph3'
import MaterialType from '@pages/Material/InputData/MaterialType'
import ProcurementCategory from '@pages/Material/InputData/ProcurementCategory'
import BrandType from '@pages/Material/InputData/BrandType'
import ShelfLife from '@pages/Material/InputData/ShelfLife'
import MinDeliveryAllowablePeriod from '@pages/Material/InputData/MinDeliveryAllowablePeriod'
import MaxDeliveryAllowablePeriod from '@pages/Material/InputData/MaxDeliveryAllowablePeriod'
import ConsumptionPeriod from '@pages/Material/InputData/ConsumptionPeriod'
import SupplyStatus from '@pages/Material/InputData/SupplyStatus'
import LeadTime from '@pages/Material/InputData/LeadTime'
import OrderUnit from '@pages/Material/InputData/OrderUnit'
import BasicUnit from '@pages/Material/InputData/BasicUnit'
import WarehousingUnit from '@pages/Material/InputData/WarehousingUnit'
import BoxQuantity from '@pages/Material/InputData/BoxQuantity'
import LoadedQuantityPerPallet from '@pages/Material/InputData/LoadedQuantityPerPallet'
import OrderUnitQuantity from '@pages/Material/InputData/OrderUnitQuantity'
import MinOrderQuantity from '@pages/Material/InputData/MinOrderQuantity'
import MaxOrderQuantity from '@pages/Material/InputData/MaxOrderQuantity'
import AvailableDays from '@pages/Material/InputData/AvailableDays'
import IsAutomaticOrdering from '@pages/Material/InputData/IsAutomaticOrdering'
import IsUseSingleBarcode from '@pages/Material/InputData/IsUseSingleBarcode'
import SingleBarcode from '@pages/Material/InputData/SingleBarcode'
import IsUse from '@pages/Material/InputData/IsUse'
import { ProductInfoTS, ProductQueryKey } from '@pages/Product/Props'
import { MDM_PRODUCT_API_PATH } from '@api/path/MDM/productPath'

function ProductUpdate() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { mutate } = useMutationWrap()

  const { isSuccess, isLoading, data } = useQueryWrap(
    ProductQueryKey.productDetail,
    () =>
      NetworkService.mdm.get(MDM_PRODUCT_API_PATH.PRODUCT_DETAIL(id as string)),
    { enabled: !!id }
  )

  // 로딩 처리
  useEffect(() => {
    if (isLoading) {
      LoadingService.show()
    } else {
      LoadingService.close()
    }
  }, [isLoading, isSuccess])

  const methods = useForm<ProductInfoTS>({
    mode: 'onBlur',
  })

  const onSubmit = methods.handleSubmit((inputData) => {
    mutate(
      NetworkService.mdm.post(
        MDM_PRODUCT_API_PATH.PRODUCT_DETAIL(id as string),
        inputData
      ),
      {
        onSuccess: () => {
          SnackbarService.show('제상품이 수정되었습니다.')
          navigate(`${To.MDMGoodsProduct}/${id}`)
        },
      }
    )
  })

  useEffect(() => {
    methods.reset(data)
  }, [data, methods])

  return (
    <Page>
      <SubHeader
        title={'제상품 수정'}
        saveButton={{
          type: 'submit',
          form: 'productUpdateForm',
          sbKind: 'pages/MDM/Product/ProductUpdate',
        }}
      />

      <FormProvider {...methods}>
        <form id={'productUpdateForm'} onSubmit={onSubmit}>
          <Stack direction={'row'} spacing={3} style={{ marginTop: '32px' }}>
            <MaterialCode />
            <MaterialName />
            <Group />
          </Stack>

          <Stack direction={'row'} spacing={3} style={{ marginTop: '32px' }}>
            <Ph1 />
            <Ph2 />
            <Ph3 />
          </Stack>

          <Stack direction={'row'} spacing={3} style={{ marginTop: '32px' }}>
            <MaterialType />
            <ProcurementCategory />
            <BrandType />
          </Stack>

          <Stack direction={'row'} spacing={3} style={{ marginTop: '32px' }}>
            <ShelfLife />
            <MinDeliveryAllowablePeriod />
            <MaxDeliveryAllowablePeriod />
          </Stack>

          <Stack direction={'row'} spacing={3} style={{ marginTop: '32px' }}>
            <ConsumptionPeriod />
            <SupplyStatus />
            <LeadTime />
          </Stack>

          <Stack direction={'row'} spacing={3} style={{ marginTop: '32px' }}>
            <OrderUnit />
            <BasicUnit />
            <WarehousingUnit />
          </Stack>

          <Stack direction={'row'} spacing={3} style={{ marginTop: '32px' }}>
            <BoxQuantity />
            <LoadedQuantityPerPallet />
            <OrderUnitQuantity />
          </Stack>

          <Stack direction={'row'} spacing={3} style={{ marginTop: '32px' }}>
            <MinOrderQuantity />
            <MaxOrderQuantity />
          </Stack>

          <Stack direction={'row'} style={{ marginTop: '32px' }}>
            <AvailableDays />
          </Stack>

          <Stack direction={'row'} style={{ marginTop: '32px' }}>
            <IsAutomaticOrdering />
          </Stack>

          <Stack direction={'row'} style={{ marginTop: '32px' }}>
            <IsUseSingleBarcode />
          </Stack>

          <Stack direction={'row'} style={{ marginTop: '32px' }}>
            <SingleBarcode />
          </Stack>

          <Stack direction={'row'} style={{ marginTop: '32px' }}>
            <IsUse />
          </Stack>
        </form>
      </FormProvider>
    </Page>
  )
}

export default ProductUpdate
