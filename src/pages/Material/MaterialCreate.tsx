import { SubHeader } from '@compositions/Header'
import React from 'react'
import Page from '@components/Page'
import { useNavigate } from 'react-router-dom'
import { FormProvider, useForm, useFormState } from 'react-hook-form'
import { MaterialInfoTS } from '@pages/Material/Props'
import { useMaterialStore } from '@stores/MDM/Material/material.store'
import NetworkService from '@api/NetworkService'
import SnackbarService from '@services/SnackbarService'
import { To } from '@routes/To'
import { useMutationWrap } from '@queries/useMutation'
import { MDM_MATERIAL_API_PATH } from '@api/path/MDM/materialPath'
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

function MaterialCreate() {
  const { mutate } = useMutationWrap<{ materialId: string }>()
  const navigate = useNavigate()
  const [dataInput] = useMaterialStore((state) => [state.materialDataSet])

  const methods = useForm<MaterialInfoTS>({
    mode: 'onBlur',
    defaultValues: dataInput,
  })
  const { isValid } = useFormState({ control: methods.control })
  const onSubmit = methods.handleSubmit((inputData) => {
    mutate(
      NetworkService.mdm.post(MDM_MATERIAL_API_PATH.CREATE_MATERIAL, inputData),
      {
        onSuccess: ({ data }) => {
          SnackbarService.show('원부자재가 생성되었습니다.')
          navigate(`${To.MDMGoodsMaterial}/${data.materialId}`)
        },
      }
    )
  })

  return (
    <Page>
      <SubHeader
        title={'원부자재 생성'}
        saveButton={{
          type: 'submit',
          form: 'materialCreateForm',
          // disabled: !isValid,
        }}
      />
      <FormProvider {...methods}>
        <form id="materialCreateForm" onSubmit={onSubmit}>
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

export default MaterialCreate
