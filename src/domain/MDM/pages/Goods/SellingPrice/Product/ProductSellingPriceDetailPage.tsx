import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import { useMutationWrap2 } from '@queries/useMutation'
import { To } from '@routes/To'
import LoadingService from '@services/LoadingService'
import SnackbarService from '@services/SnackbarService'
import { useProductSellingPriceStore } from '@stores/MDM/Goods/SellingPrice/product.store'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'
import SellingPriceDataLayer from '../InputData/SellingPriceDataLayer'
import { SellingPriceTS } from '../Props'
import {
  useSellingPriceDeleteCall,
  useSellingPriceDetailCall,
} from '../query/useSellingPriceCall'
import { MSG } from '@src/constants/MessageCode/msg'

function ProductSellingPriceDetailPage() {
  const { id } = useParams()

  const { isSuccess, data, isLoading } = useSellingPriceDetailCall(id as string)
  const { mutate: deleteSellingPrice } = useMutationWrap2<SellingPriceTS>(
    useSellingPriceDeleteCall
  )
  const navigate = useNavigate()
  const [isDeleteDialog, setIsDeleteDialog] = useState(false)
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

  const onClickDelete = () => {
    LoadingService.show()

    deleteSellingPrice(id as string, {
      onSuccess: () => {
        SnackbarService.show(MSG.SUCCESS.MDM.GOODS.DELETE_SELLING_PRICE)
        navigate(`${To.MDMGoodsProductSellingPrice}`)
      },
      onSettled: () => {
        LoadingService.close()
      },
    })
  }

  return (
    <Page>
      <SubHeader
        title={'제상품 판매 가격 상세'}
        deleteButton={{
          onClick: () => setIsDeleteDialog(true),
        }}
        updateButton={{
          sbkind: 'pages/MDM/Goods/ProductSellingPrice/Update',
          disabled: false,
          onClick: () => navigate('update'),
        }}
      />
      <SellingPriceDataLayer
        pageType={'detail'}
        type={GoodsType.Product}
        defaultValues={dataSet}
      />
      <Dialog
        size="sm"
        open={isDeleteDialog}
        title="경고"
        onClose={() => setIsDeleteDialog(false)}
        content={'정말로 삭제하시겠습니까?'}
        actions={
          <>
            <Button onClick={() => setIsDeleteDialog(false)}>닫기</Button>
            <Button data-cy={'dialogDeleteButton'} onClick={onClickDelete}>
              삭제
            </Button>
          </>
        }
      />
    </Page>
  )
}

export default ProductSellingPriceDetailPage
