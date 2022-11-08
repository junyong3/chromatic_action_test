import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router'
import { useMutationWrap } from '@queries/useMutation'
import { useQueryWrap } from '@queries/useQuery'
import {
  MaterialInfoTS,
  MaterialQueryKey,
} from '@domain/MDM/pages/Goods/Material/Props'
import Instance from '@api/Instance'
import { MDM_GOODS_MATERIAL_API_PATH } from '@src/api/path/MDM/Goods/materialPath'
import React, { useEffect, useState } from 'react'
import LoadingService from '@services/LoadingService'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { To } from '@routes/To'
import { FormProvider, useForm } from 'react-hook-form'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
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

function MaterialUpdatePage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { mutate } = useMutationWrap()

  const { isSuccess, isLoading, data } = useQueryWrap(
    MaterialQueryKey.materialDetail,
    () =>
      Instance.get(MDM_GOODS_MATERIAL_API_PATH.MATERIAL_DETAIL(id as string)),
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

  const methods = useForm<MaterialInfoTS>({
    mode: 'onBlur',
  })

  const onSubmit = methods.handleSubmit((inputData) => {
    mutate(
      Instance.post(
        MDM_GOODS_MATERIAL_API_PATH.MATERIAL_DETAIL(id as string),
        inputData
      ),
      {
        onSuccess: () => {
          SnackbarService.show(MSG.SUCCESS.MDM.GOODS.UPDATE_MATERIAL)
          navigate(`${To.MDMGoodsMaterial}/${id}`)
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
        title={'원부자재 수정'}
        saveButton={{
          type: 'submit',
          form: 'materialUpdateForm',
          sbkind: 'pages/MDM/Goods/Material/Update',
        }}
      />

      <FormProvider {...methods}>
        <form id={'materialUpdateForm'} onSubmit={onSubmit}>
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

export default MaterialUpdatePage
