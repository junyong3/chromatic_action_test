import { ClientTS } from '@domain/MDM/pages/Partners/Props'

export type GoodsTS = {
  code: string
  name: string
}

export type CustomerTS = {
  code: string
  name: string
}

export interface SellingPriceSearchConditionTS {
  baseDate: string
  customer: ClientTS | string
  keyword: string
}

export const SellingPriceQueryKey: {
  [key: string]: any
  sellingPriceList: readonly string[]
  productSellingPriceList: readonly string[]
  sellingPriceHistoryList: (id: string) => readonly string[]
  productSellingPriceDetail: (id: string) => readonly string[]
  goodsList: (keyword: string) => readonly string[]
} = {
  sellingPriceList: ['SellingPriceList'] as const,
  productSellingPriceList: ['ProductSellingPriceList'] as const,
  sellingPriceHistoryList: (id: string) =>
    ['SellingPriceHistoryList', id] as const,
  productSellingPriceDetail: (id: string) =>
    ['ProductSellingPriceDetail', id] as const,
  goodsList: (keyword: string) => ['GoodsList', keyword] as const,
  dataGridPagination: (
    key: keyof typeof SellingPriceQueryKey,
    { page, limit }: { page: number; limit: number }
  ) => {
    return [...SellingPriceQueryKey[key], limit, page] as const
  },
}

/**
 * id 판매 가격 id
 * code 제상품 코드
 * name 제상품 명
 * customer 고객사
 * * code 고객사 코드
 * * name 고객사 명
 * price 가격
 * availableStartDate 적용 시작일
 * register 등록자
 */
export interface SellingPriceTS {
  id: string | undefined
  goods: GoodsTS
  customer: CustomerTS | string
  price: number
  availableStartDate: string | undefined
  register: string
}

/**
 * price: 판매 가격
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
