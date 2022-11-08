import { FieldValues } from 'react-hook-form'
import { useNavigate } from 'react-router'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import { useMutationWrap2 } from '@queries/useMutation'
import { To } from '@routes/To'
import SnackbarService from '@services/SnackbarService'
import { useMaterialPurchasePriceStore } from '@stores/MDM/Goods/PurchasePrice/material.store'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'
import PurchasePriceDataLayer from '../InputData/PurchasePriceDataLayer'
import { PurchasePriceTS } from '../Props'
import { usePurchasePriceCreateCall } from '../query/usePurchasePriceCall'
import { MSG } from '@src/constants/MessageCode/msg'

function MaterialPurchasePriceCreatePage() {
  const type = GoodsType.Material

  const { mutate: create } = useMutationWrap2<PurchasePriceTS>(
    usePurchasePriceCreateCall
  )
  const navigate = useNavigate()
  const [inputData] = useMaterialPurchasePriceStore((state) => [
    state.materialPurchasePriceDateSet,
  ])
  const onSubmit = (inputData: FieldValues) => {
    create(
      { type, inputData },
      {
        onSuccess: ({ id }: any) => {
          SnackbarService.show(MSG.SUCCESS.MDM.GOODS.ADD_PURCHASE_PRICE)
          navigate(`${To.MDMGoodsMaterialPurchasePrice}/${id}`)
        },
      }
    )
  }

  return (
    <Page>
      <SubHeader
        title={'원부자재 구매 가격 등록'}
        saveButton={{
          type: 'submit',
          form: 'purchasePriceDataLayerForm',
          sbkind: 'pages/MDM/Goods/MaterialPurchasePrice/List',
        }}
      />
      <PurchasePriceDataLayer
        pageType={'create'}
        type={GoodsType.Material}
        defaultValues={inputData}
        onSubmit={onSubmit}
      />
    </Page>
  )
}

export default MaterialPurchasePriceCreatePage
