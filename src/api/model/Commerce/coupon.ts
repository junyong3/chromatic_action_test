import { ListPagination } from './common'
import { CouponSearchConditionTS } from '@stores/Commerce/Coupon/coupon.store'

/**
 * * id 쿠폰 아이디
 * * couponCode 쿠폰 코드
 * * couponName 쿠폰명
 * * * internal 관리자용 쿠폰명
 * * * customer 고객용 쿠폰명
 * * couponDuration
 * * * startDate 시작 일시
 * * * endDate 종료 일시
 * * couponType 쿠폰 종류
 * * benefitType 혜택 유형
 * * paymentMethod 지급 방식
 * * status 쿠폰 상태
 * * createdDate 등록일
 */
export interface CouponDto {
  id: number
  couponCode: string
  couponName: {
    internal: string
    customer: string
  }
  couponDuration: {
    startDate: string
    endDate: string
  }
  couponType: string
  benefitType: string
  paymentMethod: string
  status: string
  createdDate: string
}
export type CouponListReq = ListPagination & CouponSearchConditionTS
export type CouponListRes = ListPagination & { items: Array<CouponDto> }
