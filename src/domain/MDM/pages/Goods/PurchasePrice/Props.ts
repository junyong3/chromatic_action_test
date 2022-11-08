import { GoodsType } from '../Props'

export type GoodsTS = {
  code: string
  name: string
}

export type SupplierTS = {
  code: string
  name: string
}

export type PurchasePriceSearchConditionTS = {
  baseDate: string
  supplier: SupplierTS | string
  keyword: string
}

export const PurchasePriceQueryKey: {
  [key: string]: any
  purchasePriceList: readonly string[]
  materialPurchasePriceList: readonly string[]
  productPurchasePriceList: readonly string[]
  purchasePriceHistoryList: (id: string) => readonly string[]
  materialPurchasePriceDetail: (id: string) => readonly string[]
  productPurchasePriceDetail: (id: string) => readonly string[]
  goodsList: (type: GoodsType, keyword: string) => readonly string[]
} = {
  purchasePriceList: ['PurchasePriceList'] as const,
  materialPurchasePriceList: ['MaterialPurchasePriceList'] as const,
  productPurchasePriceList: ['ProductPurchasePriceList'] as const,
  purchasePriceHistoryList: (id: string) =>
    ['PurchasePriceHistoryList', id] as const,
  materialPurchasePriceDetail: (id: string) =>
    ['MaterialPurchasePriceDetail', id] as const,
  productPurchasePriceDetail: (id: string) =>
    ['ProductPurchasePriceDetail', id] as const,
  goodsList: (type: GoodsType, keyword: string) =>
    ['GoodsList', type, keyword] as const,
  dataGridPagination: (
    key: keyof typeof PurchasePriceQueryKey,
    { page, limit }: { page: number; limit: number }
  ) => {
    return [...PurchasePriceQueryKey[key], limit, page] as const
  },
}

/**
 * id 구매 가격 id
 * code 자재/제상품 코드
 * name 자재/제상품 명
 * supplier 거래처
 * * code 거래처 코드
 * * name 거래처 명
 * price 가격
 * availableStartDate 적용 시작일
 * register 등록자
 */
export interface PurchasePriceTS {
  id: string | undefined
  goods: GoodsTS
  supplier: SupplierTS | string
  price: number
  availableStartDate: string | undefined
  register: string
}

/**
 * price: 구매 가격
 * availableStartDate 적용 시작일
 * availableEndDate 적용 종료일
 * register 등록자
 */
export interface PriceHistoryTS {
  price: number
  availableStartDate: string | undefined
  availableEndDate: string | undefined
  register: string
}
