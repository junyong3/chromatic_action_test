import { MemberStatusTS } from '@stores/Commerce/Member/member.store'
import { ListPagination } from './common'

export interface MemberDto {
  id: string
  name: string
  email: string
  phone: string
  memberStatus: MemberStatusTS
  registerDate: string
}
export type MemberListReq = ListPagination & {
  memberStatus: string
  orderCheck: string
  keyword: string
}
export type MemberListRes = ListPagination & { user: Array<MemberDto> }

/**
 * * couponId 사용자 쿠폰 아이디
 * * couponName 고객용 쿠폰명
 * * couponType 쿠폰 종류
 * * benefitType 혜택 유형
 * * paymentMethod 지급 방식
 * * couponDuration
 * * * startDate 시작 일시
 * * * endDate 종료 일시
 * * issuedDate 발급 일시
 * * used
 * * * usedDate 사용 일시
 * * * orderNumber 주문 번호
 * * manager
 * * * team 담당자 팀명
 * * * name 담당자 이름
 * * isExposed 노출 여부
 */
export interface MemberCouponDto {
  couponId: string
  couponName: string
  couponType: string
  benefitType: string
  paymentMethod: string
  couponDuration: {
    startDate: string
    endDate: string
  }
  issuedDate: string
  used: null | {
    usedDate: string
    orderNumber: number
  }
  manager: null | { team: string; name: string }
  isExposed: boolean
}
export type MemberCouponListRes = ListPagination & {
  coupon: Array<MemberCouponDto>
}

export type CSCouponDto = {
  id: number
  couponCode: string
  couponName: string
}
export type CSCouponListRes = CSCouponDto[]

export interface MemberPointHistoryDto {
  pointId: string
  registerDate: string // 지급 일시
  reason: string // 사유
  amount: number // 금액
  endDate: string // 소멸 일시
  manager: { team: string; name: string } // 담당자: 팀명, 이름
  isExposed: boolean // 노출 여부
}
export type MemberPointHistoryListRes = ListPagination & {
  usablePoint: number
  expiringPoint: number
  point: Array<MemberPointHistoryDto>
}
