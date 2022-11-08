import {
  PurchasePriceTS,
  PurchasePriceSearchConditionTS,
  PriceHistoryTS,
} from '@domain/MDM/pages/Goods/PurchasePrice/Props'

export type PurchasePriceListReq = PurchasePriceSearchConditionTS
export type PurchasePriceListRes = PurchasePriceTS[]

export type PurchasePriceHistoryListRes = PriceHistoryTS[]
