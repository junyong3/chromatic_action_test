import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Page from '@components/Page'
import { SubHeader } from '@compositions/Header'
import Button from '@components/Button'
import { Dialog } from '@components/Dialog'
import { useMutationWrap2 } from '@queries/useMutation'
import { To } from '@routes/To'
import LoadingService from '@services/LoadingService'
import SnackbarService from '@services/SnackbarService'
import { useProductPurchasePriceStore } from '@stores/MDM/Goods/PurchasePrice/product.store'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'
import PurchasePriceDataLayer from '../InputData/PurchasePriceDataLayer'
import { PurchasePriceTS } from '../Props'
import {
  usePurchasePriceDeleteCall,
  usePurchasePriceDetailCall,
} from '../query/usePurchasePriceCall'
import { MSG } from '@src/constants/MessageCode/msg'

function ProductPurchasePriceDetailPage() {
  const type = GoodsType.Product
  const { id } = useParams()

  const { isSuccess, data, isLoading } = usePurchasePriceDetailCall({
    type,
    id: id as string,
  })
  const { mutate: deletePurchasePrice } = useMutationWrap2<PurchasePriceTS>(
    usePurchasePriceDeleteCall
  )
  const navigate = useNavigate()
  const [isDeleteDialog, setIsDeleteDialog] = useState(false)
  const [dataSet, setDataSet] = useProductPurchasePriceStore((state) => [
    state.productPurchasePriceDateSet,
    state.setProductPurchasePriceDataSet,
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

    deletePurchasePrice(
      { type, id: id as string },
      {
        onSuccess: () => {
          SnackbarService.show(MSG.SUCCESS.MDM.GOODS.DELETE_PURCHASE_PRICE)
          navigate(`${To.MDMGoodsProductPurchasePrice}`)
        },
        onSettled: () => {
          LoadingService.close()
        },
      }
    )
  }

  return (
    <Page>
      <SubHeader
        title={'제상품 구매 가격 상세'}
        deleteButton={{
          onClick: () => setIsDeleteDialog(true),
        }}
        updateButton={{
          sbkind: 'pages/MDM/Goods/ProductPurchasePrice/Update',
          disabled: false,
          onClick: () => navigate('update'),
        }}
      />
      <PurchasePriceDataLayer
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

export default ProductPurchasePriceDetailPage
