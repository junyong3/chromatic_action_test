export const COMMERCE_MEMBER_API_PATH = {
  /**
   * * get: 회원 목록
   */
  MEMBER_LIST: '/list',
  /**
   * * get: 회원 상세
   * @param id 회원 아이디
   */
  MEMBER_DETAIL: (id: string) => `/detail/${id}`,
  /**
   * * patch: 회원 수정
   * @param id 회원 아이디
   */
  UPDATE_MEMBER: (id: string) => `/${id}`,
  /**
   * * post: 휴대폰번호 중복 조회
   */
  VALIDATE_PHONE: '/verify/phone',
  /**
   * * post: 이메일 중복 조회
   */
  VALIDATE_EMAIL: '/verify/email',
  /**
   * * get: CS용 쿠폰 목록
   */
  CS_COUPON_LIST: '/cs-coupon',
  /**
   * * get: 회원 쿠폰 목록
   * * post: 회원 쿠폰 지급
   * * patch: 회원 쿠폰 노출 여부 수정
   * @param id 회원 아이디
   */
  MEMBER_COUPON: (id: string) => `/detail/${id}/coupon`,
  /**
   * * post: 회원 적립금 지급
   * * patch: 회원 적립금 사용
   * * @param id 회원 아이디
   */
  MEMBER_POINT: (id: string) => `/detail/${id}/point`,
  /**
   * * get: 회원 적립금 내역
   * * patch: 회원 적립금 내역 노출 여부 수정
   * @param id 회원 아이디
   */
  MEMBER_POINT_HISTORY: (id: string) => `/detail/${id}/point/history`,
  /**
   * * get: 회원 카드 목록
   * @param id 회원 아이디
   */
  MEMBER_CREDITCARD_LIST: (id: string) => `/detail/${id}/card`, // get: 카드 목록
}
