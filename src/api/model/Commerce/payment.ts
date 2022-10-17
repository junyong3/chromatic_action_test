import { cancelTS } from '@stores/Commerce/Order/order.store'
import { InitCardAdd } from '@components/Dialog/CardAddDialog'
import { ListPagination } from './common'

export interface PaymentDto {
  readonly id: number
  createdAt: string
  userInfo: { userName: string; phone: string }
  orderNumber: number
  payStatus: string
  payMethod: string
  amount: number
  reason: {
    payId: string
    msg: string
  }
}
export type PaymentListRes = ListPagination & { items: Array<PaymentDto> }

export type UpdatePaymentReq = {
  cancelAccount: string
  cancelType: cancelTS
  cancelReason: {
    value: string
    etcMsg: string
  }
  refundsAccountInfo: {
    bankCode?: string
    accountNumber?: string
    accountUser?: string
  }
}

export type RefundAccountSaveDto = {
  /**
   * 은행명
   */
  bank: string
  /**
   * 계좌번호
   */
  accountNumber: string
  /**
   * 예금주명
   */
  customerName: string
}
export type AdminRemoveRefundAccountDto = {
  /**
   * UserID
   */
  userId: string
}

export type AdminSaveRefundAccountDto = {
  /**
   * 은행명
   */
  bank: string
  /**
   * 계좌번호
   */
  accountNumber: string
  /**
   * 예금주명
   */
  customerName: string
  /**
   * UserID
   */
  userId: string
}
/***
 * 환급 가능한 계좌 리스트
 */
export type AdminRefundAccountListDto = Array<string>

export type AdminCreateCardDto = {
  /**
   * 카드 번호
   */
  cardNumber: string
  /**
   * 카드 별명(최소 1자 ~ 20자)
   */
  cardName: string
  /**
   * 카드 유효연도(YY)
   */
  expirationYear: string
  /**
   * 카드 유효월(MM)
   */
  expirationMonth: string
  /**
   * 생년월일 6자리(YYMMDD) 혹은 사업자등록번호 10자리
   */
  customerIdentityNumber: string
  /**
   * 카드 비밀번호(앞2자리)
   */
  cardPassword: string
  /**
   * UserID
   */
  userId: string
}
export type AdminUpdateCardDto = {
  /**
   * 카드 별명(최소 1자 ~ 20자)
   */
  cardName: string
}
export type CardDto = {
  /**
   * 카드ID
   */
  id: string
  /**
   * 사용자ID
   */
  userId: string
  /**
   * 카드명
   */
  cardName: string
  /**
   * 카드사명
   */
  company: string
  /**
   * 카드 마지막 번호 4자리
   */
  last4Digits: string
  /**
   * 카드 타입
   */
  type?: CardDtoType
  /**
   * 유효기간 (YYYY-MM)
   */
  expirationDt: string
  /**
   * 카드 상태
   */
  status: CardDtoStatus
  /**
   * 생성일
   */
  createdAt: string
  /**
   * 수정일
   */
  updatedAt: string
  /**
   * 마지막 사용일
   */
  lastUsedAt: string
  /**
   * index 추가
   */
  [key: string]: any
}

/**
 * 카드 타입
 */
export enum CardDtoType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  GIFT = 'GIFT',
}

/**
 * 카드 상태
 */
export enum CardDtoStatus {
  AVAILABLE = 'AVAILABLE',
  DELETED = 'DELETED',
}

export type AddCardReq = typeof InitCardAdd
