import { SubHeader } from '@compositions/Header'
import React, { useEffect, useState } from 'react'
import Page from '@components/Page'
import { useNavigate } from 'react-router-dom'
import LoadingService from '@services/LoadingService'
import NetworkService from '@api/NetworkService'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { To } from '@routes/To'
import { useMutationWrap } from '@queries/useMutation'
import { MDM_MATERIAL_API_PATH } from '@api/path/MDM/materialPath'
import { useParams } from 'react-router'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import { FormProvider, useForm } from 'react-hook-form'
import { MaterialInfoTS, MaterialQueryKey } from '@pages/Material/Props'
import { useQueryWrap } from '@queries/useQuery'
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

function MaterialDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { mutate } = useMutationWrap()

  const { isSuccess, isLoading, data } = useQueryWrap(
    MaterialQueryKey.materialDetail,
    () =>
      NetworkService.mdm.get(
        MDM_MATERIAL_API_PATH.MATERIAL_DETAIL(id as string)
      ),
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

  const [isDeleteDialog, setIsDeleteDialog] = useState(false)

  const onClickDelete = () => {
    setIsDeleteDialog(true)
  }

  const onClickDeleteMaterial = () => {
    LoadingService.show()

    mutate(
      NetworkService.mdm.delete(
        MDM_MATERIAL_API_PATH.MATERIAL_DETAIL(id as string)
      ),
      {
        onSuccess: () => {
          SnackbarService.show(MSG.SUCCESS.DELETE_MATERIAL)
          navigate(To.MDMGoodsMaterial)
        },
        onSettled: () => {
          setIsDeleteDialog(false)
          LoadingService.close()
        },
      }
    )
  }

  const methods = useForm<MaterialInfoTS>({
    mode: 'onBlur',
  })

  useEffect(() => {
    methods.reset(data)
  }, [data, methods])

  return (
    <Page>
      <SubHeader
        title={'원부자재 상세'}
        deleteButton={{
          disabled: false,
          onClick: onClickDelete,
        }}
        updateButton={{
          disabled: false,
          onClick: () => navigate('update'),
          sbKind: 'pages/MDM/Material/ProductUpdate',
        }}
      />

      <FormProvider {...methods}>
        <form>
          <Stack direction={'row'} spacing={3} style={{ marginTop: '32px' }}>
            <MaterialCode disabled={true} />
            <MaterialName disabled={true} />
            <Group disabled={true} />
          </Stack>

          <Stack direction={'row'} spacing={3} style={{ marginTop: '32px' }}>
            <Ph1 disabled={true} />
            <Ph2 disabled={true} />
            <Ph3 disabled={true} />
          </Stack>

          <Stack direction={'row'} spacing={3} style={{ marginTop: '32px' }}>
            <MaterialType disabled={true} />
            <ProcurementCategory disabled={true} />
            <BrandType disabled={true} />
          </Stack>

          <Stack direction={'row'} spacing={3} style={{ marginTop: '32px' }}>
            <ShelfLife disabled={true} />
            <MinDeliveryAllowablePeriod disabled={true} />
            <MaxDeliveryAllowablePeriod disabled={true} />
          </Stack>

          <Stack direction={'row'} spacing={3} style={{ marginTop: '32px' }}>
            <ConsumptionPeriod disabled={true} />
            <SupplyStatus disabled={true} />
            <LeadTime disabled={true} />
          </Stack>

          <Stack direction={'row'} spacing={3} style={{ marginTop: '32px' }}>
            <OrderUnit disabled={true} />
            <BasicUnit disabled={true} />
            <WarehousingUnit disabled={true} />
          </Stack>

          <Stack direction={'row'} spacing={3} style={{ marginTop: '32px' }}>
            <BoxQuantity disabled={true} />
            <LoadedQuantityPerPallet disabled={true} />
            <OrderUnitQuantity disabled={true} />
          </Stack>

          <Stack direction={'row'} spacing={3} style={{ marginTop: '32px' }}>
            <MinOrderQuantity disabled={true} />
            <MaxOrderQuantity disabled={true} />
          </Stack>

          <Stack direction={'row'} style={{ marginTop: '32px' }}>
            <AvailableDays disabled={true} />
          </Stack>

          <Stack direction={'row'} style={{ marginTop: '32px' }}>
            <IsAutomaticOrdering disabled={true} />
          </Stack>

          <Stack direction={'row'} style={{ marginTop: '32px' }}>
            <IsUseSingleBarcode disabled={true} />
          </Stack>

          <Stack direction={'row'} style={{ marginTop: '32px' }}>
            <SingleBarcode disabled={true} />
          </Stack>

          <Stack direction={'row'} style={{ marginTop: '32px' }}>
            <IsUse disabled={true} />
          </Stack>
        </form>
      </FormProvider>

      <Dialog
        size="sm"
        open={isDeleteDialog}
        title="경고"
        onClose={() => setIsDeleteDialog(false)}
        content={`정말로 원부자재를 삭제하시겠습니까?`}
        actions={
          <>
            <Button onClick={() => setIsDeleteDialog(false)}>닫기</Button>
            <Button
              data-cy={'dialogDeleteButton'}
              onClick={onClickDeleteMaterial}
            >
              원부자재 삭제
            </Button>
          </>
        }
      />
    </Page>
  )
}

export default MaterialDetail
