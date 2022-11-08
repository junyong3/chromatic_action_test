import { useEffect } from 'react'
import { FieldValues } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import { useMutationWrap2 } from '@queries/useMutation'
import { To } from '@routes/To'
import LoadingService from '@services/LoadingService'
import SnackbarService from '@services/SnackbarService'
import { useProductSellingPriceStore } from '@stores/MDM/Goods/SellingPrice/product.store'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'
import SellingPriceDataLayer from '../InputData/SellingPriceDataLayer'
import { SellingPriceTS } from '../Props'
import {
  useSellingPriceDetailCall,
  useSellingPriceUpdateCall,
} from '../query/useSellingPriceCall'
import { MSG } from '@src/constants/MessageCode/msg'

function ProductSellingPriceUpdatePage() {
  const { id } = useParams()

  const { isSuccess, data, isLoading } = useSellingPriceDetailCall(id as string)
  const { mutate: update } = useMutationWrap2<SellingPriceTS>(
    useSellingPriceUpdateCall
  )
  const navigate = useNavigate()
  const [dataSet, setDataSet] = useProductSellingPriceStore((state) => [
    state.productSellingPriceDateSet,
    state.setProductSellingPriceDataSet,
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
    update(inputData, {
      onSuccess: () => {
        SnackbarService.show(MSG.SUCCESS.MDM.GOODS.UPDATE_SELLING_PRICE)
        navigate(`${To.MDMGoodsProductSellingPrice}/${id}`)
      },
    })
  }

  return (
    <Page>
      <SubHeader
        title={'제상품 판매 가격 수정'}
        saveButton={{
          type: 'submit',
          form: 'sellingPriceDataLayerForm',
          sbkind: 'pages/MDM/Goods/ProductSellingPrice/Detail',
        }}
      />
      <SellingPriceDataLayer
        pageType={'update'}
        type={GoodsType.Product}
        defaultValues={dataSet}
        onSubmit={onSubmit}
      />
    </Page>
  )
}

export default ProductSellingPriceUpdatePage
