import {
  SellingPriceTS,
  SellingPriceSearchConditionTS,
  PriceHistoryTS,
} from '@domain/MDM/pages/Goods/SellingPrice/Props'

export type SellingPriceListReq = SellingPriceSearchConditionTS
export type SellingPriceListRes = SellingPriceTS[]

export type SellingPriceHistoryListRes = PriceHistoryTS[]
