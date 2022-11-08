import { SubHeader } from '@compositions/Header'
import React, { useEffect, useState } from 'react'
import Page from '@components/Page'
import { useNavigate } from 'react-router-dom'
import LoadingService from '@services/LoadingService'
import Instance from '@api/Instance'
import SnackbarService from '@services/SnackbarService'
import { MSG } from '@constants/MessageCode/msg'
import { To } from '@routes/To'
import { useMutationWrap } from '@queries/useMutation'
import { useParams } from 'react-router'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import { FormProvider, useForm } from 'react-hook-form'
import { useQueryWrap } from '@queries/useQuery'
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
import { ProductInfoTS, ProductQueryKey } from './Props'
import { MDM_GOODS_PRODUCT_API_PATH } from '@src/api/path/MDM/Goods/productPath'

function ProductDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { mutate } = useMutationWrap()

  const { isSuccess, isLoading, data } = useQueryWrap(
    ProductQueryKey.productDetail,
    () => Instance.get(MDM_GOODS_PRODUCT_API_PATH.PRODUCT_DETAIL(id as string)),
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

  const onClickDeleteProduct = () => {
    LoadingService.show()

    mutate(
      Instance.delete(MDM_GOODS_PRODUCT_API_PATH.PRODUCT_DETAIL(id as string)),
      {
        onSuccess: () => {
          SnackbarService.show(MSG.SUCCESS.MDM.GOODS.DELETE_PRODUCT)
          navigate(To.MDMGoodsProduct)
        },
        onSettled: () => {
          setIsDeleteDialog(false)
          LoadingService.close()
        },
      }
    )
  }

  const methods = useForm<ProductInfoTS>({
    mode: 'onBlur',
  })

  useEffect(() => {
    methods.reset(data)
  }, [data, methods])

  return (
    <Page>
      <SubHeader
        title={'제상품 상세'}
        deleteButton={{
          onClick: onClickDelete,
        }}
        updateButton={{
          onClick: () => navigate('update'),
          sbkind: 'pages/MDM/Goods/Product/Update',
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
        content={`정말로 제상품을 삭제하시겠습니까?`}
        actions={
          <>
            <Button onClick={() => setIsDeleteDialog(false)}>닫기</Button>
            <Button
              data-cy={'dialogDeleteButton'}
              onClick={onClickDeleteProduct}
            >
              제상품 삭제
            </Button>
          </>
        }
      />
    </Page>
  )
}

export default ProductDetailPage
