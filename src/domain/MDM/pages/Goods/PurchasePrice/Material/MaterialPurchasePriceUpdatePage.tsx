import { useEffect } from 'react'
import { FieldValues } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import { useMutationWrap2 } from '@queries/useMutation'
import { To } from '@routes/To'
import LoadingService from '@services/LoadingService'
import SnackbarService from '@services/SnackbarService'
import { useMaterialPurchasePriceStore } from '@stores/MDM/Goods/PurchasePrice/material.store'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'
import PurchasePriceDataLayer from '../InputData/PurchasePriceDataLayer'
import { PurchasePriceTS } from '../Props'
import {
  usePurchasePriceDetailCall,
  usePurchasePriceUpdateCall,
} from '../query/usePurchasePriceCall'
import { MSG } from '@src/constants/MessageCode/msg'

function MaterialPurchasePriceUpdatePage() {
  const type = GoodsType.Material
  const { id } = useParams()

  const { isSuccess, data, isLoading } = usePurchasePriceDetailCall({
    type,
    id: id as string,
  })
  const { mutate: update } = useMutationWrap2<PurchasePriceTS>(
    usePurchasePriceUpdateCall
  )
  const navigate = useNavigate()
  const [dataSet, setDataSet] = useMaterialPurchasePriceStore((state) => [
    state.materialPurchasePriceDateSet,
    state.setMaterialPurchasePriceDataSet,
  ])

  // 로딩 처리
  useEffect(() => {
    if (isLoading) LoadingService.show()
    else LoadingService.close()
  }, [isLoading, isSuccess])

  useEffect(() => {
    if (data) setDataSet(data)
  }, [data, setDataSet])

  const onSubmit = (inputData: FieldValues) => {
    update(
      { type, inputData },
      {
        onSuccess: () => {
          SnackbarService.show(MSG.SUCCESS.MDM.GOODS.UPDATE_PURCHASE_PRICE)
          navigate(`${To.MDMGoodsMaterialPurchasePrice}/${id}`)
        },
      }
    )
  }

  return (
    <Page>
      <SubHeader
        title={'원부자재 구매 가격 수정'}
        saveButton={{
          type: 'submit',
          form: 'purchasePriceDataLayerForm',
          sbkind: 'pages/MDM/Goods/MaterialPurchasePrice/Detail',
        }}
      />
      <PurchasePriceDataLayer
        pageType={'update'}
        type={GoodsType.Material}
        defaultValues={dataSet}
        onSubmit={onSubmit}
      />
    </Page>
  )
}

export default MaterialPurchasePriceUpdatePage
