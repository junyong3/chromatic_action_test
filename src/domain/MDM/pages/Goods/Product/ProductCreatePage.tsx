import { SubHeader } from '@compositions/Header'
import React from 'react'
import Page from '@components/Page'
import { useNavigate } from 'react-router-dom'
import { FormProvider, useForm, useFormState } from 'react-hook-form'
import { MaterialInfoTS } from '@domain/MDM/pages/Goods/Material/Props'
import Instance from '@api/Instance'
import SnackbarService from '@services/SnackbarService'
import { To } from '@routes/To'
import { useMutationWrap } from '@queries/useMutation'
import { Stack } from '@mui/material'
import MaterialCode from '@domain/MDM/pages/Goods/Material/InputData/MaterialCode'
import MaterialName from '@domain/MDM/pages/Goods/Material/InputData/MaterialName'
import Group from '@domain/MDM/pages/Goods/Material/InputData/Group'
import Ph1 from '@domain/MDM/pages/Goods/Material/InputData/Ph1'
import Ph2 from '@domain/MDM/pages/Goods/Material/InputData/Ph2'
import Ph3 from '@domain/MDM/pages/Goods/Material/InputData/Ph3'
import MaterialType from '@domain/MDM/pages/Goods/Material/InputData/MaterialType'
import ProcurementCategory from '@domain/MDM/pages/Goods/Material/InputData/ProcurementCategory'
import BrandType from '@domain/MDM/pages/Goods/Material/InputData/BrandType'
import ShelfLife from '@domain/MDM/pages/Goods/Material/InputData/ShelfLife'
import MinDeliveryAllowablePeriod from '@domain/MDM/pages/Goods/Material/InputData/MinDeliveryAllowablePeriod'
import MaxDeliveryAllowablePeriod from '@domain/MDM/pages/Goods/Material/InputData/MaxDeliveryAllowablePeriod'
import ConsumptionPeriod from '@domain/MDM/pages/Goods/Material/InputData/ConsumptionPeriod'
import SupplyStatus from '@domain/MDM/pages/Goods/Material/InputData/SupplyStatus'
import LeadTime from '@domain/MDM/pages/Goods/Material/InputData/LeadTime'
import OrderUnit from '@domain/MDM/pages/Goods/Material/InputData/OrderUnit'
import BasicUnit from '@domain/MDM/pages/Goods/Material/InputData/BasicUnit'
import WarehousingUnit from '@domain/MDM/pages/Goods/Material/InputData/WarehousingUnit'
import BoxQuantity from '@domain/MDM/pages/Goods/Material/InputData/BoxQuantity'
import LoadedQuantityPerPallet from '@domain/MDM/pages/Goods/Material/InputData/LoadedQuantityPerPallet'
import OrderUnitQuantity from '@domain/MDM/pages/Goods/Material/InputData/OrderUnitQuantity'
import MinOrderQuantity from '@domain/MDM/pages/Goods/Material/InputData/MinOrderQuantity'
import MaxOrderQuantity from '@domain/MDM/pages/Goods/Material/InputData/MaxOrderQuantity'
import AvailableDays from '@domain/MDM/pages/Goods/Material/InputData/AvailableDays'
import IsAutomaticOrdering from '@domain/MDM/pages/Goods/Material/InputData/IsAutomaticOrdering'
import IsUseSingleBarcode from '@domain/MDM/pages/Goods/Material/InputData/IsUseSingleBarcode'
import SingleBarcode from '@domain/MDM/pages/Goods/Material/InputData/SingleBarcode'
import IsUse from '@domain/MDM/pages/Goods/Material/InputData/IsUse'
import { MDM_GOODS_PRODUCT_API_PATH } from '@src/api/path/MDM/Goods/productPath'
import { useProductStore } from '@stores/MDM/Goods/product.store'
import { MSG } from '@src/constants/MessageCode/msg'

function ProductCreatePage() {
  const { mutate } = useMutationWrap<{ productId: string }>()
  const navigate = useNavigate()
  const [dataInput] = useProductStore((state) => [state.productDataSet])

  const methods = useForm<MaterialInfoTS>({
    mode: 'onBlur',
    defaultValues: dataInput,
  })
  const { isValid } = useFormState({ control: methods.control })
  const onSubmit = methods.handleSubmit((inputData) => {
    mutate(
      Instance.post(MDM_GOODS_PRODUCT_API_PATH.CREATE_PRODUCT, inputData),
      {
        onSuccess: ({ data }) => {
          SnackbarService.show(MSG.SUCCESS.MDM.GOODS.CREATE_PRODUCT)
          navigate(`${To.MDMGoodsMaterial}/${data.productId}`)
        },
      }
    )
  })

  return (
    <Page>
      <SubHeader
        title={'제상품 생성'}
        saveButton={{
          type: 'submit',
          form: 'productCreateForm',
          // disabled: !isValid,
        }}
      />
      <FormProvider {...methods}>
        <form id="productCreateForm" onSubmit={onSubmit}>
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

export default ProductCreatePage
