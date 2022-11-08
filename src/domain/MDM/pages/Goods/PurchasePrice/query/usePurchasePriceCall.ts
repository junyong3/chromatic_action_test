import Instance from '@api/Instance'
import {
  PurchasePriceHistoryListRes,
  PurchasePriceListReq,
  PurchasePriceListRes,
} from '@src/api/model/MDM/Goods/purchasePrice'
import { MDM_GOODS_PURCHASE_PRICE_API_PATH } from '@src/api/path/MDM/Goods/purchasePrice'
import { useQueryWrap } from '@queries/useQuery'
import { GoodsType } from '@domain/MDM/pages/Goods/Props'
import { GoodsTS, PurchasePriceQueryKey, PurchasePriceTS } from '../Props'

type CallType = {
  type: GoodsType
}

export const usePurchasePriceListCall = ({
  type,
  params,
}: { params: PurchasePriceListReq } & CallType) => {
  const { isSuccess, isLoading, data, refetch } =
    useQueryWrap<PurchasePriceListRes>(
      PurchasePriceQueryKey.dataGridPagination('purchasePriceList', params),
      () =>
        Instance.get<PurchasePriceListReq>(
          MDM_GOODS_PURCHASE_PRICE_API_PATH.PURCHASE_PRICE_LIST(type),
          params
        )
    )

  return { isSuccess, data, isLoading, refetch }
}

export const usePurchasePriceCreateCall = async ({
  type,
  inputData,
}: {
  inputData: PurchasePriceTS
} & CallType) => {
  const { data } = await Instance.post(
    MDM_GOODS_PURCHASE_PRICE_API_PATH.CREATE_PURCHASE_PRICE(type),
    inputData
  )
  return data
}

export const usePurchasePriceDetailCall = ({
  type,
  id,
}: { id: string } & CallType) => {
  const { isSuccess, isLoading, data } = useQueryWrap<PurchasePriceTS>(
    PurchasePriceQueryKey.materialPurchasePriceDetail(id),
    () =>
      Instance.get(
        MDM_GOODS_PURCHASE_PRICE_API_PATH.PURCHASE_PRICE_DETAIL(type, id)
      ),
    { enabled: !!id }
  )
  return { isSuccess, data, isLoading }
}

export const usePurchasePriceUpdateCall = async ({
  type,
  inputData,
}: {
  inputData: PurchasePriceTS
} & CallType) => {
  if (!inputData.id) return
  const { data } = await Instance.patch(
    MDM_GOODS_PURCHASE_PRICE_API_PATH.PURCHASE_PRICE_DETAIL(type, inputData.id),
    inputData
  )
  return data
}

export const usePurchasePriceDeleteCall = async ({
  type,
  id,
}: { id: string } & CallType) => {
  const { data } = await Instance.delete(
    MDM_GOODS_PURCHASE_PRICE_API_PATH.PURCHASE_PRICE_DETAIL(type, id)
  )
  return data
}

export const usePurchasePriceHistoryListCall = ({
  type,
  purchasePriceId,
}: { purchasePriceId: string } & CallType) => {
  const { isSuccess, isLoading, data, refetch } =
    useQueryWrap<PurchasePriceHistoryListRes>(
      PurchasePriceQueryKey.purchasePriceHistoryList(purchasePriceId),
      () =>
        Instance.get(
          MDM_GOODS_PURCHASE_PRICE_API_PATH.PURCHASE_PRICE_HISTORY(
            type,
            purchasePriceId
          )
        ),
      { enabled: !!purchasePriceId }
    )

  return { isSuccess, data, isLoading, refetch }
}

export const useGoodsListCall = ({
  type,
  keyword,
}: {
  type: GoodsType
  keyword: string
}) => {
  const path =
    type === GoodsType.Material
      ? MDM_GOODS_PURCHASE_PRICE_API_PATH.MATERIAL_LIST_FOR_PURCHASE_PRICE
      : MDM_GOODS_PURCHASE_PRICE_API_PATH.PRODUCT_LIST_FOR_PURCHASE_PRICE
  return useQueryWrap<GoodsTS[]>(
    PurchasePriceQueryKey.goodsList(type, keyword),
    () => Instance.get(path, keyword)
  )
}
