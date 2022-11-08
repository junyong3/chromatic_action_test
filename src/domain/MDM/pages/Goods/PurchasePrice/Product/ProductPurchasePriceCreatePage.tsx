import { FieldValues } from 'react-hook-form'
import { useNavigate } from 'react-router'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import { useMutationWrap2 } from '@queries/useMutation'
import { To } from '@routes/To'
import SnackbarService from '@services/SnackbarService'
import { useProductPurchasePriceStore } from '@stores/MDM/Goods/PurchasePrice/product.store'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'
import PurchasePriceDataLayer from '../InputData/PurchasePriceDataLayer'
import { PurchasePriceTS } from '../Props'
import { usePurchasePriceCreateCall } from '../query/usePurchasePriceCall'
import { MSG } from '@constants/MessageCode/msg'

function ProductPurchasePriceCreatePage() {
  const type = GoodsType.Product

  const { mutate: create } = useMutationWrap2<PurchasePriceTS>(
    usePurchasePriceCreateCall
  )
  const navigate = useNavigate()
  const [inputData] = useProductPurchasePriceStore((state) => [
    state.productPurchasePriceDateSet,
  ])
  const onSubmit = (inputData: FieldValues) => {
    create(
      { type, inputData },
      {
        onSuccess: ({ id }: any) => {
          SnackbarService.show(MSG.SUCCESS.MDM.GOODS.ADD_PURCHASE_PRICE)
          navigate(`${To.MDMGoodsProductPurchasePrice}/${id}`)
        },
      }
    )
  }
  return (
    <Page>
      <SubHeader
        title={'제상품 구매 가격 등록'}
        saveButton={{
          type: 'submit',
          form: 'purchasePriceDataLayerForm',
          sbkind: 'pages/MDM/Goods/ProductPurchasePrice/List',
        }}
      />
      <PurchasePriceDataLayer
        pageType={'create'}
        type={GoodsType.Product}
        defaultValues={inputData}
        onSubmit={onSubmit}
      />
    </Page>
  )
}

export default ProductPurchasePriceCreatePage
