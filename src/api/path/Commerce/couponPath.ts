export const COMMERCE_COUPON_API_PATH = {
  /**
   * * get: 적립금 목록
   */
  COUPON_LIST: '/coupon/list',
  /**
   * * get: 쿠폰 상세
   * @param id 쿠폰 아이디
   */
  COUPON_DETAIL: (id: string) => `/coupon/${id}`,
  /**
   * * patch: 쿠폰 활성상태 변경
   */
  SET_ACTIVE: (id: string) => `/coupon/${id}/active`,
  /**
   * * post: 쿠폰 이름 유효성 검사
   */
  VALIDATE_COUPON_CODE: '/verify/couponCode',
  /**
   * * post: 쿠폰 생성
   */
  CREATE_COUPON: '/coupon',
  /**
   * * post: 쿠폰 임시 생성
   */
  CREATE_COUPON_TEMP: '/coupon/temp',
  /**
   * * get: 제품 목록
   */
  PRODUCT_LIST: '/product/list',
  /**
   * * get: 카테고리 목록
   */
  CATEGORY_LIST: '/category/list',
  /**
   * * get: 고객 목록
   */
  CUSTOMER_LIST: '/customer/list',
}
