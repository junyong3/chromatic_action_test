import { FieldValues } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import { useMutationWrap2 } from '@queries/useMutation'
import { To } from '@routes/To'
import SnackbarService from '@services/SnackbarService'
import { useProductSellingPriceStore } from '@stores/MDM/Goods/SellingPrice/product.store'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'
import SellingPriceDataLayer from '../InputData/SellingPriceDataLayer'
import { SellingPriceTS } from '../Props'
import { useSellingPriceCreateCall } from '../query/useSellingPriceCall'
import { MSG } from '@src/constants/MessageCode/msg'

function ProductSellingPriceCreatePage() {
  const { mutate: create } = useMutationWrap2<SellingPriceTS>(
    useSellingPriceCreateCall
  )
  const navigate = useNavigate()
  const [inputData] = useProductSellingPriceStore((state) => [
    state.productSellingPriceDateSet,
  ])
  const onSubmit = (inputData: FieldValues) => {
    create(inputData, {
      onSuccess: ({ id }: any) => {
        SnackbarService.show(MSG.SUCCESS.MDM.GOODS.ADD_SELLING_PRICE)
        navigate(`${To.MDMGoodsProductSellingPrice}/${id}`)
      },
    })
  }
  return (
    <Page>
      <SubHeader
        title={'제상품 판매 가격 등록'}
        saveButton={{
          type: 'submit',
          form: 'sellingPriceDataLayerForm',
          sbkind: 'pages/MDM/Goods/ProductSellingPrice/List',
        }}
      />
      <SellingPriceDataLayer
        pageType={'create'}
        type={GoodsType.Product}
        defaultValues={inputData}
        onSubmit={onSubmit}
      />
    </Page>
  )
}

export default ProductSellingPriceCreatePage
