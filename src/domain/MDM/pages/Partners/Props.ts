import { SxProps, Theme } from '@mui/material'

export enum PartnersType {
  VENDER = '매입처',
  CLIENT = '매출처',
}

export const PartnersQueryKey: {
  [key: string]: any
  venderList: readonly string[]
  clientList: readonly string[]
  venderDetail: (venderId: string) => readonly string[]
  clientDetail: (clientId: string) => readonly string[]
  accountBankList: readonly string[]
  categoryList: readonly string[]
  keyGoodsList: (keyword: string) => readonly string[]
} = {
  venderList: ['VenderList'] as const,
  clientList: ['ClientList'] as const,
  venderDetail: (venderId: string) => ['VenderDetail', venderId] as const,
  clientDetail: (clientId: string) => ['ClientDetail', clientId] as const,
  accountBankList: ['AccountBankList'] as const,
  categoryList: ['CategoryList'] as const,
  keyGoodsList: (keyword: string) => ['KeyGoodsList', keyword] as const,
  dataGridPagination: (
    key: keyof typeof PartnersQueryKey,
    { page, limit }: { page: number; limit: number }
  ) => {
    return [...PartnersQueryKey[key], limit, page] as const
  },
}

export const TransactionStatus = {
  YES: 'Y',
  NO: 'N',
} as const

type Union<T> = T[keyof T]
export type TransactionStatusTS = Union<typeof TransactionStatus>

export type PartnersSearchConditionTS = {
  keyGoods: KeyGoodsTS | undefined
  transactionStatus: TransactionStatusTS
  keyword: string
}

export interface InputDataProps<T = string> {
  label?: T
  name?: T
  disabled?: boolean
  sx?: SxProps<Theme> | undefined
}

export interface PartnersTS {
  address: {
    postcode: string
    address1: string
    address2: string
  }
  businessNumber: string
  manager: string
  phone: string
  account?: {
    bank: string
    accountNumber: number | undefined
  }
  handlingCategory: string[]
  productList?: string[]
  contractFile?: string
}

export interface VenderTS extends PartnersTS {
  venderCode: string
  venderName: string
}
export interface ClientTS extends PartnersTS {
  clientCode: string
  clientName: string
  clientType?: '초샵 오프라인' | '초록마을' | 'B2B'
  receivingAddress?: {
    postcode: string
    address1: string
    address2: string
  }
}

export interface KeyGoodsTS {
  materialCode: string
  materialName: string
}
