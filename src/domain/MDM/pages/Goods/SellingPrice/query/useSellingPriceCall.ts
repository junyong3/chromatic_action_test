import Instance from '@api/Instance'
import { useQueryWrap } from '@queries/useQuery'
import {
  SellingPriceHistoryListRes,
  SellingPriceListReq,
  SellingPriceListRes,
} from '@src/api/model/MDM/Goods/sellingPrice'
import { MDM_GOODS_SELLING_PRICE_API_PATH } from '@src/api/path/MDM/Goods/sellingPrice'
import { GoodsTS, SellingPriceQueryKey, SellingPriceTS } from '../Props'

export const useSellingPriceListCall = (params: SellingPriceListReq) => {
  const { isSuccess, isLoading, data, refetch } =
    useQueryWrap<SellingPriceListRes>(
      SellingPriceQueryKey.dataGridPagination('sellingPriceList', params),
      () =>
        Instance.get<SellingPriceListReq>(
          MDM_GOODS_SELLING_PRICE_API_PATH.SELLING_PRICE_LIST,
          params
        )
    )

  return { isSuccess, data, isLoading, refetch }
}

export const useSellingPriceCreateCall = async (inputData: SellingPriceTS) => {
  const { data } = await Instance.post(
    MDM_GOODS_SELLING_PRICE_API_PATH.CREATE_SELLING_PRICE,
    inputData
  )
  return data
}

export const useSellingPriceDetailCall = (id: string) => {
  const { isSuccess, isLoading, data } = useQueryWrap<SellingPriceTS>(
    SellingPriceQueryKey.productSellingPriceDetail(id),
    () =>
      Instance.get(MDM_GOODS_SELLING_PRICE_API_PATH.SELLING_PRICE_DETAIL(id)),
    { enabled: !!id }
  )
  return { isSuccess, data, isLoading }
}

export const useSellingPriceUpdateCall = async (inputData: SellingPriceTS) => {
  if (!inputData.id) return
  const { data } = await Instance.patch(
    MDM_GOODS_SELLING_PRICE_API_PATH.SELLING_PRICE_DETAIL(inputData.id),
    inputData
  )
  return data
}

export const useSellingPriceDeleteCall = async (id: string) => {
  const { data } = await Instance.delete(
    MDM_GOODS_SELLING_PRICE_API_PATH.SELLING_PRICE_DETAIL(id)
  )
  return data
}

export const useSellingPriceHistoryListCall = (sellingPriceId: string) => {
  const { isSuccess, isLoading, data, refetch } =
    useQueryWrap<SellingPriceHistoryListRes>(
      SellingPriceQueryKey.sellingPriceHistoryList(sellingPriceId),
      () =>
        Instance.get(
          MDM_GOODS_SELLING_PRICE_API_PATH.SELLING_PRICE_HISTORY(sellingPriceId)
        ),
      { enabled: !!sellingPriceId }
    )

  return { isSuccess, data, isLoading, refetch }
}

export const useGoodsListCall = (keyword: string) => {
  return useQueryWrap<GoodsTS[]>(SellingPriceQueryKey.goodsList(keyword), () =>
    Instance.get(
      MDM_GOODS_SELLING_PRICE_API_PATH.PRODUCT_LIST_FOR_SELLING_PRICE,
      keyword
    )
  )
}
